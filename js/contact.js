/* ==========================================================================
   PÁGINA DE CONTACTOS (contactos.html)
   - separadores acessíveis: pedir contacto / marcar reunião
   - validação de email, telefone português ou internacional, mensagem e RGPD
   - marcação apenas em dias úteis, com horários de 30 minutos
   - confirmação simulada; não existe envio para servidor
   Os dados de áreas, equipa e contactos vêm de js/data.js.
   ========================================================================== */
import { $, $$, escapeHtml, icon, track } from "./main.js";
import { AREAS, TEAM, SITE } from "./data.js";

const CONSENT_TEXT =
  "Entraremos em contacto no prazo de 1 dia útil.";
const MEETING_CONSENT_TEXT =
  "Entraremos em contacto no prazo de 1 dia útil para confirmar a disponibilidade.";
const SLOT_START = 9 * 60;
const LAST_SLOT_START = 18 * 60;
const WEEKEND = new Set([0, 6]);

/* --------------------------------------------------------------------------
   Dados do escritório e opções dos formulários
   -------------------------------------------------------------------------- */
function syncSiteDetails() {
  $$("[data-site-phone]").forEach((node) => {
    if (node.tagName === "A") node.href = `tel:${SITE.phone.tel}`;
    node.textContent = SITE.phone.display;
  });
  $$("[data-site-phone-link]").forEach((node) => {
    node.href = `tel:${SITE.phone.tel}`;
  });
  $$("[data-site-mobile]").forEach((node) => {
    if (node.tagName === "A") node.href = `tel:${SITE.mobile.tel}`;
    node.textContent = SITE.mobile.display;
  });
  $$("[data-site-mobile-link]").forEach((node) => {
    node.href = `tel:${SITE.mobile.tel}`;
  });
  $$("[data-site-email]").forEach((node) => {
    if (node.tagName === "A") node.href = `mailto:${SITE.email}`;
    node.textContent = SITE.email;
  });
}

function populateChoices() {
  const areaOptions = AREAS.map(
    (area) => `<option value="${escapeHtml(area.id)}">${escapeHtml(area.title)}</option>`
  ).join("");
  $$("[data-area-select]").forEach((select) => {
    select.insertAdjacentHTML("beforeend", `${areaOptions}<option value="nao-sei">Não sei / outro assunto</option>`);
  });

  const lawyerOptions = TEAM.map(
    (member) =>
      `<option value="${escapeHtml(member.id)}">${escapeHtml(member.name)} — ${escapeHtml(member.role)}</option>`
  ).join("");
  $$("[data-lawyer-select]").forEach((select) => {
    select.insertAdjacentHTML("beforeend", lawyerOptions);
  });
}

function readPrefill() {
  const params = new URLSearchParams(window.location.search);
  const areaParam = params.get("area");
  const lawyerParam = params.get("advogado");
  const area = AREAS.some((item) => item.id === areaParam) ? areaParam : "";
  const lawyer = TEAM.find((member) => member.id === lawyerParam) || null;
  return { area, lawyer };
}

function applyPrefill() {
  const { area, lawyer } = readPrefill();
  const fallbackArea = !area && lawyer && lawyer.areas.length ? lawyer.areas[0] : area;

  $$("[data-area-select]").forEach((select) => {
    select.value = fallbackArea || "";
  });
  $$("[data-lawyer-select]").forEach((select) => {
    select.value = lawyer ? lawyer.id : "";
  });

  if (area || lawyer) {
    track("formulario_origem", {
      area: fallbackArea || "",
      advogado: lawyer ? lawyer.id : "",
    });
  }
}

function areaLabel(value) {
  if (!value) return "";
  if (value === "nao-sei") return "Não sei / outro assunto";
  const area = AREAS.find((item) => item.id === value);
  return area ? area.title : value;
}

function lawyerLabel(value) {
  if (!value) return "Sem preferência";
  const lawyer = TEAM.find((member) => member.id === value);
  return lawyer ? lawyer.name : value;
}

function updatePrefillNotes() {
  $$("[data-prefill-note]").forEach((note) => {
    const form = note.closest("form");
    if (!form) return;
    const area = $("[data-area-select]", form);
    const lawyer = $("[data-lawyer-select]", form);
    const parts = [];
    if (area && area.value) parts.push(`área: ${area.options[area.selectedIndex].textContent}`);
    if (lawyer && lawyer.value) parts.push(`advogado: ${lawyer.options[lawyer.selectedIndex].textContent}`);
    note.hidden = parts.length === 0;
    note.textContent = parts.length
      ? `Pedido pré-selecionado — ${parts.join(" · ")}. Pode alterar se preferir.`
      : "";
  });
}

/* --------------------------------------------------------------------------
   Datas e horários (fuso de Lisboa)
   -------------------------------------------------------------------------- */
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Lisbon",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Lisbon",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function dateParts(date) {
  return dateFormatter
    .formatToParts(date)
    .reduce((result, part) => {
      if (part.type !== "literal") result[part.type] = part.value;
      return result;
    }, {});
}

function todayISO() {
  const parts = dateParts(new Date());
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function nowMinutes() {
  const parts = timeFormatter
    .formatToParts(new Date())
    .reduce((result, part) => {
      if (part.type !== "literal") result[part.type] = part.value;
      return result;
    }, {});
  return Number(parts.hour) * 60 + Number(parts.minute);
}

function parseISODate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value));
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) return null;
  return date;
}

function dateError(value) {
  if (!value) return "Escolha o dia pretendido.";
  const date = parseISODate(value);
  if (!date) return "Indique uma data válida.";
  if (value < todayISO()) return "Escolha uma data a partir de hoje.";
  if (WEEKEND.has(date.getDay())) return "Escolha um dia útil, entre segunda e sexta.";
  return "";
}

function formatLongDate(value) {
  const date = parseISODate(value);
  if (!date) return value;
  const formatted = new Intl.DateTimeFormat("pt-PT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function timeLabel(minutes) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hours}:${mins}`;
}

function renderSlots(form, date) {
  const mount = $("[data-time-slots]", form);
  if (!mount) return;
  mount.innerHTML = "";

  const invalidDate = dateError(date);
  if (invalidDate) {
    mount.innerHTML = `<p class="slots__placeholder">${escapeHtml(invalidDate)}</p>`;
    return;
  }

  const isToday = date === todayISO();
  const current = nowMinutes();
  const slots = [];
  for (let minutes = SLOT_START; minutes <= LAST_SLOT_START; minutes += 30) {
    const disabled = isToday && minutes <= current;
    slots.push({ minutes, disabled });
  }

  if (slots.every((slot) => slot.disabled)) {
    mount.innerHTML = `<p class="slots__placeholder">Já passou o horário de atendimento de hoje. Escolha outro dia ou <a class="link-line" href="tel:${SITE.phone.tel}">ligue ${escapeHtml(
      SITE.phone.display
    )}</a>.</p>`;
    return;
  }

  mount.innerHTML = slots
    .map(
      (slot) => `<label class="slot">
        <input type="radio" name="horario" value="${timeLabel(slot.minutes)}" ${
        slot.disabled ? "disabled" : ""
      }>
        <span>${timeLabel(slot.minutes)}</span>
      </label>`
    )
    .join("");
}

function resetSlots(form, message) {
  const mount = $("[data-time-slots]", form);
  if (!mount) return;
  mount.innerHTML = `<p class="slots__placeholder">${
    message || "Escolha primeiro um dia útil para ver os horários disponíveis."
  }</p>`;
}

function initMeetingDates() {
  const minimum = todayISO();
  $$('[data-contact-form="meeting"]').forEach((form) => {
    const date = $("[data-date-input]", form);
    if (!date) return;
    date.min = minimum;
    date.addEventListener("change", () => {
      const field = date.closest("[data-field]");
      const timeField = $('[data-field="horario"]', form);
      if (field) clearFieldError(field);
      if (timeField) clearFieldError(timeField);
      const error = dateError(date.value);
      if (error) {
        if (field && date.value) setFieldError(field, error);
        resetSlots(form, error);
        return;
      }
      renderSlots(form, date.value);
    });
    date.addEventListener("blur", () => {
      if (!date.value) return;
      const error = dateError(date.value);
      const field = date.closest("[data-field]");
      if (error && field) setFieldError(field, error);
    });
    resetSlots(form);
  });
}

/* --------------------------------------------------------------------------
   Mensagem: contador de caracteres
   -------------------------------------------------------------------------- */
function updateMessageCount(input) {
  const form = input.closest("form");
  const counter = form ? $("[data-message-count]", form) : null;
  if (counter) counter.textContent = `${input.value.length} / 1500`;
}

function initMessageCounters() {
  $$("[data-message-input]").forEach((input) => {
    updateMessageCount(input);
    input.addEventListener("input", () => updateMessageCount(input));
  });
}

/* --------------------------------------------------------------------------
   Erros de campo
   -------------------------------------------------------------------------- */
function getField(form, name) {
  return $(`[data-field="${name}"]`, form);
}

function setFieldError(field, message) {
  if (!field) return;
  field.classList.add("field--error");
  const error = $(".field__error", field);
  if (error) error.innerHTML = `${icon("alert", 15)}<span>${escapeHtml(message)}</span>`;
  $$("input, select, textarea", field).forEach((control) => control.setAttribute("aria-invalid", "true"));
}

function clearFieldError(field) {
  if (!field) return;
  field.classList.remove("field--error");
  const error = $(".field__error", field);
  if (error) error.textContent = "";
  $$("input, select, textarea", field).forEach((control) => control.removeAttribute("aria-invalid"));
}

function clearAllErrors(form) {
  $$("[data-field]", form).forEach(clearFieldError);
  const alert = $("[data-form-alert]", form);
  if (alert) {
    alert.hidden = true;
    alert.textContent = "";
  }
}

/* --------------------------------------------------------------------------
   Validação
   -------------------------------------------------------------------------- */
function normalizePhone(value) {
  return String(value).replace(/[\s().\-/]/g, "");
}

function phoneError(value) {
  const compact = normalizePhone(value);
  if (!compact) return "Indique o número de telefone.";
  if (/^[29]\d{8}$/.test(compact)) return "";
  if (/^(?:\+|00)[1-9]\d{7,14}$/.test(compact)) return "";
  return "Indique um número português de 9 dígitos (a começar por 2 ou 9) ou um número internacional com indicativo.";
}

function emailError(value) {
  const email = String(value).trim();
  if (!email) return "Indique o endereço de email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return "Indique um endereço de email válido.";
  return "";
}

function validateForm(form) {
  clearAllErrors(form);
  const kind = form.dataset.contactForm;
  const errors = [];
  let firstInvalid = null;

  const mark = (name, message, focusTarget) => {
    const field = getField(form, name);
    if (field) setFieldError(field, message);
    errors.push({ name, message });
    if (!firstInvalid) {
      firstInvalid =
        focusTarget ||
        (field ? $("input:not([type=hidden]):not(:disabled), select, textarea", field) : null) ||
        null;
    }
  };

  const nameInput = $('[name="nome"]', form);
  const emailInput = $('[name="email"]', form);
  const phoneInput = $('[name="telefone"]', form);
  const areaSelect = $('[data-area-select]', form);
  const lawyerSelect = $('[data-lawyer-select]', form);
  const privacy = $('input[name="privacidade"]', form);

  const name = nameInput ? nameInput.value.trim() : "";
  if (name.length < 2) mark("nome", "Indique o nome completo.", nameInput);

  const email = emailInput ? emailInput.value.trim() : "";
  const emailIssue = emailError(email);
  if (emailIssue) mark("email", emailIssue, emailInput);

  const phone = phoneInput ? phoneInput.value.trim() : "";
  const phoneIssue = phoneError(phone);
  if (phoneIssue) mark("telefone", phoneIssue, phoneInput);

  const area = areaSelect ? areaSelect.value : "";
  if (!area) mark("area", "Selecione a área de atuação.", areaSelect);

  const values = {
    kind,
    name,
    firstName: name.split(/\s+/)[0] || "",
    email: email.toLowerCase(),
    phone,
    area,
    areaLabel: areaLabel(area),
    lawyer: lawyerSelect ? lawyerSelect.value : "",
    lawyerLabel: lawyerLabel(lawyerSelect ? lawyerSelect.value : ""),
  };

  if (kind === "contact") {
    const messageInput = $("[data-message-input]", form);
    const message = messageInput ? messageInput.value.trim() : "";
    if (message.length < 20) {
      mark("mensagem", "Escreva pelo menos 20 caracteres sobre o assunto.", messageInput);
    }
    values.messageLength = message.length;
  }

  if (kind === "meeting") {
    const dateInput = $("[data-date-input]", form);
    const date = dateInput ? dateInput.value : "";
    const dateIssue = dateError(date);
    if (dateIssue) mark("data", dateIssue, dateInput);

    const formatInput = $('input[name="formato"]:checked', form);
    const format = formatInput ? formatInput.value : "";
    if (!format) mark("formato", "Escolha o formato da reunião.", formatInput);

    let time = "";
    if (!dateIssue) {
      const timeInput = $('input[name="horario"]:checked', form);
      if (!timeInput) {
        const available = $('input[name="horario"]:not(:disabled)', form) || dateInput;
        mark("horario", "Escolha um horário para a reunião.", available);
      } else {
        time = timeInput.value;
        const [hours, minutes] = time.split(":").map(Number);
        if (date === todayISO() && hours * 60 + minutes <= nowMinutes()) {
          mark("horario", "Escolha um horário futuro.", timeInput);
        }
      }
    }

    values.date = date;
    values.dateLabel = formatLongDate(date);
    values.time = time;
    values.format = format;
    values.formatLabel = format === "videochamada" ? "Videochamada" : "Presencial";
  }

  if (!privacy || !privacy.checked) {
    mark(
      "privacidade",
      "Confirme que leu a política de privacidade e autoriza o tratamento dos dados.",
      privacy
    );
  }

  return { valid: errors.length === 0, errors, firstInvalid, values };
}

/* --------------------------------------------------------------------------
   Envio simulado e confirmação
   -------------------------------------------------------------------------- */
function summaryRow(label, value) {
  return `<div class="confirm__row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
}

function confirmationMarkup(values) {
  const isMeeting = values.kind === "meeting";
  const title = isMeeting
    ? `Pedido de reunião recebido${values.firstName ? `, ${values.firstName}` : ""}.`
    : `Obrigado${values.firstName ? `, ${values.firstName}` : ""}.`;

  const rows = [
    summaryRow("Área", values.areaLabel || "Não indicada"),
    summaryRow("Advogado", values.lawyerLabel || "Sem preferência"),
  ];

  if (isMeeting) {
    rows.unshift(
      summaryRow("Dia", values.dateLabel),
      summaryRow("Hora", values.time),
      summaryRow("Formato", values.formatLabel)
    );
  } else {
    rows.push(summaryRow("Email", values.email));
    rows.push(summaryRow("Telefone", values.phone));
  }

  return `<p class="eyebrow">${isMeeting ? "Pedido registado" : "Mensagem recebida"}</p>
    <div class="confirm__icon">${icon("check", 26)}</div>
    <h3 class="confirm__title" tabindex="-1" data-confirm-title>${escapeHtml(title)}</h3>
    <p class="confirm__text">${
      isMeeting
        ? `Recebemos o seu pedido de reunião. ${MEETING_CONSENT_TEXT}`
        : `Recebemos o seu pedido de contacto. ${CONSENT_TEXT}`
    }</p>
    <dl class="confirm__summary">${rows.join("")}</dl>
    ${
      isMeeting
        ? '<p class="confirm__note">A reunião só fica confirmada depois da resposta da equipa. Se precisar de alterar algo, indique-o na resposta ao email de confirmação.</p>'
        : '<p class="confirm__note">Se o assunto for urgente, pode ligar para 21 567 89 01 durante o horário de atendimento.</p>'
    }
    <div class="confirm__actions">
      <button class="btn btn--primary" type="button" data-confirm-reset>Enviar novo pedido</button>
      <a class="btn btn--ghost" href="tel:${SITE.phone.tel}">${icon("phone", 16)} Ligar ${escapeHtml(
    SITE.phone.display
  )}</a>
    </div>`;
}

function showConfirmation(form, values) {
  const kind = form.dataset.contactForm;
  const panel = form.closest(".tabs__panel");
  const stage = form.closest("[data-form-stage]");
  const confirm = panel ? $(`[data-form-confirm="${kind}"]`, panel) : null;
  if (!stage || !confirm) return;

  confirm.innerHTML = confirmationMarkup(values);
  stage.hidden = true;
  confirm.hidden = false;

  const title = $("[data-confirm-title]", confirm);
  if (title) title.focus({ preventScroll: true });
  confirm.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "center",
  });

  track(kind === "meeting" ? "pedido_reuniao" : "pedido_contacto", {
    area: values.area,
    advogado: values.lawyer || "sem-preferencia",
  });
}

function restoreSubmit(button) {
  if (!button) return;
  button.disabled = false;
  button.removeAttribute("aria-busy");
  if (button.dataset.defaultHtml) button.innerHTML = button.dataset.defaultHtml;
}

function resetForm(kind) {
  const form = $(`[data-contact-form="${kind}"]`);
  const panel = form ? form.closest(".tabs__panel") : null;
  const stage = form ? form.closest("[data-form-stage]") : null;
  const confirm = panel ? $(`[data-form-confirm="${kind}"]`, panel) : null;
  if (!form || !stage || !confirm) return;

  confirm.hidden = true;
  confirm.innerHTML = "";
  stage.hidden = false;
  form.reset();
  clearAllErrors(form);
  applyPrefill();
  updatePrefillNotes();

  const submit = $("[data-submit]", form);
  restoreSubmit(submit);

  if (kind === "meeting") {
    const date = $("[data-date-input]", form);
    if (date) {
      date.min = todayISO();
      date.value = "";
    }
    resetSlots(form);
  } else {
    const message = $("[data-message-input]", form);
    if (message) updateMessageCount(message);
  }

  const first = $('input[name="nome"]', form);
  if (first) {
    first.focus({ preventScroll: true });
    first.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "center",
    });
  }
}

function initForms() {
  $$("[data-contact-form]").forEach((form) => {
    const submit = $("[data-submit]", form);
    if (submit) submit.dataset.defaultHtml = submit.innerHTML;

    form.addEventListener("input", (event) => {
      const field = event.target.closest("[data-field]");
      if (field && field.classList.contains("field--error")) clearFieldError(field);
    });

    form.addEventListener("change", (event) => {
      const field = event.target.closest("[data-field]");
      if (!field || !field.classList.contains("field--error")) return;
      // A data tem um tratamento próprio (o erro é reposto logo depois).
      if (event.target.matches("[data-date-input]")) return;
      clearFieldError(field);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const alert = $("[data-form-alert]", form);
      const result = validateForm(form);

      if (!result.valid) {
        if (alert) {
          alert.textContent =
            result.errors.length === 1
              ? "Há um campo por corrigir. Verifique a indicação abaixo."
              : `Há ${result.errors.length} campos por corrigir. Verifique as indicações abaixo.`;
          alert.hidden = false;
        }
        if (result.firstInvalid && typeof result.firstInvalid.focus === "function") {
          result.firstInvalid.focus({ preventScroll: true });
          const field = result.firstInvalid.closest("[data-field]");
          if (field) {
            field.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
              block: "center",
            });
          }
        }
        track("formulario_incompleto", { formulario: form.dataset.contactForm });
        return;
      }

      if (alert) {
        alert.hidden = true;
        alert.textContent = "";
      }
      if (submit) {
        submit.disabled = true;
        submit.setAttribute("aria-busy", "true");
        submit.textContent = "A enviar…";
      }

      // Simulação local: não existe pedido HTTP. Substituir por Formspree,
      // EmailJS ou endpoint próprio, com as cautelas indicadas no README.
      window.setTimeout(() => showConfirmation(form, result.values), 700);
    });
  });

  $$("[data-form-confirm]").forEach((confirm) => {
    confirm.addEventListener("click", (event) => {
      if (!event.target.closest("[data-confirm-reset]")) return;
      resetForm(confirm.dataset.formConfirm);
    });
  });
}

/* --------------------------------------------------------------------------
   Inicialização
   -------------------------------------------------------------------------- */
function init() {
  if (!$("[data-contact-form]")) return;
  syncSiteDetails();
  populateChoices();
  applyPrefill();
  initMeetingDates();
  initMessageCounters();
  initForms();

  $$("[data-area-select], [data-lawyer-select]").forEach((select) => {
    select.addEventListener("change", updatePrefillNotes);
  });
  updatePrefillNotes();
  track("vista_contactos", {});
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
