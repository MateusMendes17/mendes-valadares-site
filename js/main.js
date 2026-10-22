/* ==========================================================================
   MENDES VALADARES & ASSOCIADOS — main.js
   Componentes partilhados e microinterações:
   cabeçalho, menu mobile, rodapé, banner de cookies, estado de atendimento,
   revelações ao scroll, contadores, acordeão, separadores, modais,
   botões flutuantes, mapa com consentimento e eventos de analytics.
   ========================================================================== */

import { SITE, NAV, CLIENT_TYPES, FAQ, AREAS, TEAM, ARTICLES } from "./data.js";

/* --------------------------------------------------------------------------
   Utilitários
   -------------------------------------------------------------------------- */
export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getParam(name) {
  return new URLSearchParams(window.location.search).get(name) || "";
}

export function debounce(fn, wait = 180) {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  };
}

const MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

/** Converte "2026-09-18" em "18 de setembro de 2026". */
export function formatDate(iso) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} de ${MONTHS[month - 1]} de ${year}`;
}

/** Converte "2026-09-18" em "18.09.2026". */
export function formatDateShort(iso) {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/* --------------------------------------------------------------------------
   Ícones de linha (SVG inline)
   -------------------------------------------------------------------------- */
const LINE_ICONS = {
  "arrow-right": '<path d="M4 12h15"/><path d="M13 6l6 6-6 6"/>',
  "arrow-up": '<path d="M12 20V5"/><path d="M6 11l6-6 6 6"/>',
  "arrow-left": '<path d="M20 12H5"/><path d="M11 6l-6 6 6 6"/>',
  phone:
    '<path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6L16.5 13l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="m3.8 6.8 8.2 6 8.2-6"/>',
  pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 9.5h17"/><path d="M8 3.5v3M16 3.5v3"/>',
  video: '<rect x="3" y="6.5" width="12" height="11" rx="2"/><path d="m15 11 6-3.5v9L15 13"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 4.5 4.5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  alert: '<path d="M12 4.5 21 20H3z"/><path d="M12 10v4.5M12 17.2v.3"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.3"/>',
  chevron: '<path d="m6 9.5 6 6 6-6"/>',
  users:
    '<circle cx="9" cy="9" r="3.2"/><path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/><path d="M16 7.4a3 3 0 0 1 0 5.9"/><path d="M17.5 19.5c0-1.6-.5-2.9-1.4-3.9"/>',
  building:
    '<path d="M4 20.5h16"/><path d="M6 20.5V6.5l6-3 6 3v14"/><path d="M9.5 10h1.5M13 10h1.5M9.5 13.5H11M13 13.5h1.5M10.5 20.5v-3.5h3v3.5"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.4 2.4 3.6 5.3 3.6 8.5S14.4 18.1 12 20.5c-2.4-2.4-3.6-5.3-3.6-8.5S9.6 5.9 12 3.5Z"/>',
  file: '<path d="M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V7.5z"/><path d="M14 3.5V7.5H18"/><path d="M9 12h6M9 15.5h6"/>',
  linkedin:
    '<path d="M4.5 9.5V19M4.5 5.2v.3"/><path d="M9.5 19v-5.4c0-1.6 1-2.6 2.5-2.6s2.5 1 2.5 2.6V19"/><path d="M9.5 9.5V19"/>',
  external: '<path d="M14 4.5h5.5V10"/><path d="M19.5 4.5 11 13"/><path d="M18 14.5v4a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18.5V8A1.5 1.5 0 0 1 6 6.5h4"/>',
  whatsapp:
    '<path fill="currentColor" stroke="none" d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.95.56 3.77 1.53 5.31L2 22l4.98-1.3a9.9 9.9 0 0 0 5.06 1.4h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.33 8.2 8.2 0 0 1 14-5.8 8.15 8.15 0 0 1 2.42 5.81c0 4.52-3.68 8.19-8.2 8.19Zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.12.29-.29.43-.44.14-.14.19-.25.29-.41.09-.16.05-.31-.03-.44-.07-.12-.55-1.32-.75-1.81-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.25-.86.85-.86 2.07 0 1.21.88 2.38 1 2.54.13.16 1.74 2.66 4.21 3.63.59.25 1.05.4 1.4.52.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.57.2-1.06.14-1.18-.05-.11-.2-.18-.44-.31Z"/>',
};

export function icon(name, size = 20, extraClass = "") {
  const body = LINE_ICONS[name] || "";
  const cls = extraClass ? ` class="${extraClass}"` : "";
  return `<svg${cls} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

/* --------------------------------------------------------------------------
   Ornamentos geométricos (arcadas e grelha de desenho)
   -------------------------------------------------------------------------- */
export function ornamentSvg(kind) {
  if (kind === "arches") {
    let bays = "";
    const bay = 96;
    const spring = 150;
    const radius = 34;
    for (let i = 0; i < 8; i += 1) {
      const x = 12 + i * bay;
      bays += `<path d="M${x} 260V${spring}"/><path d="M${x} ${spring} A ${radius} ${radius} 0 0 1 ${x + 68} ${spring}"/>`;
      bays += `<path d="M${x + 68} ${spring}V260"/>`;
    }
    return `<svg viewBox="0 0 760 260" preserveAspectRatio="xMaxYMax meet" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true" focusable="false">
      <path d="M0 ${spring}H760"/><path d="M0 ${spring - 12}H760"/><path d="M0 260H760"/>
      ${bays}
      <path d="M0 ${spring - 34}H760" opacity="0.5"/>
    </svg>`;
  }
  if (kind === "grid") {
    let lines = "";
    for (let x = 0; x <= 840; x += 84) {
      lines += `<path d="M${x} 0V420" opacity="${x % 168 === 0 ? 0.5 : 0.22}"/>`;
    }
    for (let y = 0; y <= 420; y += 84) {
      lines += `<path d="M0 ${y}H840" opacity="${y % 168 === 0 ? 0.5 : 0.22}"/>`;
    }
    return `<svg viewBox="0 0 840 420" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true" focusable="false">${lines}</svg>`;
  }
  return "";
}

function initOrnaments() {
  $$("[data-ornament]").forEach((node) => {
    node.innerHTML = ornamentSvg(node.dataset.ornament);
  });
}

/* --------------------------------------------------------------------------
   Analytics — preparado para Plausible ou Google Analytics
   --------------------------------------------------------------------------
   Os eventos só são enviados depois de o visitante aceitar cookies (analytics
   ativado em initCookieBanner). Para ligar um serviço real:
   1) acrescente no <head> o script do serviço escolhido, por exemplo
      Plausible: <script defer data-domain="mendes-valadares.vercel.app" src="https://plausible.io/js/script.js"></script>
      gtag:      <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXX"></script>
   2) mantenha estes eventos: telefone, email, WhatsApp, envio de formulário,
      visualização de área e de artigo, carregamento do mapa.
   -------------------------------------------------------------------------- */
export function track(name, props = {}) {
  if (!window.mvAnalyticsEnabled) {
    if (window.mvDebug) console.debug("[analytics desativado]", name, props);
    return;
  }
  if (typeof window.plausible === "function") {
    window.plausible(name, { props });
  } else if (typeof window.gtag === "function") {
    window.gtag("event", name, props);
  } else if (window.mvDebug) {
    console.debug("[analytics]", name, props);
  }
}

function initAnalyticsHooks() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (href.startsWith("tel:")) track("clique_telefone", { destino: href.replace("tel:", "") });
    else if (href.startsWith("mailto:")) track("clique_email", {});
    else if (href.includes("wa.me")) track("clique_whatsapp", {});
    if (link.dataset.track) track(link.dataset.track, { label: link.dataset.trackLabel || link.textContent.trim().slice(0, 60) });
  });
}

/* --------------------------------------------------------------------------
   Estado de atendimento (calculado em JavaScript, hora de Lisboa)
   -------------------------------------------------------------------------- */
const WEEKDAYS_PT = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const WEEKDAY_INDEX = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function lisbonTime() {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Lisbon",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type) => (parts.find((p) => p.type === type) || {}).value || "";
  const weekdayIndex = WEEKDAY_INDEX[get("weekday")] ?? new Date().getDay();
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  return { weekdayIndex, minutes };
}

export function getOpenStatus() {
  const { weekdayIndex, minutes } = lisbonTime();
  const isWorkday = SITE.hours.weekdays.includes(weekdayIndex);
  const open = isWorkday && minutes >= SITE.hours.openMinutes && minutes < SITE.hours.closeMinutes;

  if (open) {
    return {
      open: true,
      label: "Atendimento aberto",
      detail: `Fecha às ${Math.floor(SITE.hours.closeMinutes / 60)}h${String(SITE.hours.closeMinutes % 60).padStart(2, "0")}`,
    };
  }

  let nextDay;
  if (isWorkday && minutes < SITE.hours.openMinutes) {
    nextDay = "hoje";
  } else if (weekdayIndex === 5 && minutes >= SITE.hours.closeMinutes) {
    nextDay = "segunda-feira";
  } else if (weekdayIndex === 6) {
    nextDay = "segunda-feira";
  } else if (weekdayIndex === 0) {
    nextDay = "segunda-feira";
  } else if (weekdayIndex === 4 && minutes >= SITE.hours.closeMinutes) {
    nextDay = "sexta-feira";
  } else {
    nextDay = "amanhã";
  }

  return {
    open: false,
    label: "Atendimento fechado",
    detail: `Abre ${nextDay} às 9h00`,
  };
}

function initOpenStatus() {
  const render = () => {
    const status = getOpenStatus();
    $$("[data-open-status]").forEach((node) => {
      node.dataset.open = status.open ? "true" : "false";
      node.setAttribute("title", `${status.label} · ${status.detail}`);
      const text = $(".status__text", node);
      const detail = $(".status__detail", node);
      if (text) text.textContent = status.label;
      if (detail) detail.textContent = status.detail;
      const hidden = $(".status__full", node);
      if (hidden) hidden.textContent = `${status.label}. ${status.detail}.`;
    });
  };
  render();
  window.setInterval(render, 60 * 1000);
}

/* --------------------------------------------------------------------------
   Cabeçalho
   -------------------------------------------------------------------------- */
const NAV_PAGE_MAP = {
  "index.html": "home",
  "areas-de-atuacao.html": "areas",
  "area.html": "areas",
  "equipa.html": "equipa",
  "sobre.html": "sobre",
  "artigos.html": "artigos",
  "artigo.html": "artigos",
  "contactos.html": "contactos",
};

function statusMarkup() {
  return `<span class="status" data-open-status data-open="false">
      <span class="status__dot" aria-hidden="true"></span>
      <span class="status__text">Atendimento</span>
      <span class="visually-hidden status__full"></span>
    </span>`;
}

function headerTemplate() {
  const current = document.body.dataset.page || "";
  const links = NAV.map(
    (item) => `<li><a class="site-nav__link" href="${item.href}"${
      NAV_PAGE_MAP[item.href] === current ? ' aria-current="page"' : ""
    }>${item.label}</a></li>`
  ).join("");
  const mobileLinks = NAV.map(
    (item, index) => `<li><a class="mobile-menu__link" href="${item.href}"${
      NAV_PAGE_MAP[item.href] === current ? ' aria-current="page"' : ""
    }><span>${item.label}</span><span class="num">${String(index + 1).padStart(2, "0")}</span></a></li>`
  ).join("");

  return `
  <a class="skip-link" href="#conteudo">Saltar para o conteúdo</a>
  <header class="site-header" data-site-header>
    <div class="container site-header__inner">
      <a class="brand" href="index.html">
        <span class="brand__mark" aria-hidden="true">MV</span>
        <span class="brand__text">
          <span class="brand__name">Mendes Valadares</span>
          <span class="brand__sub">&amp; Associados · Advogados</span>
        </span>
      </a>
      <nav class="site-nav" aria-label="Navegação principal">
        <ul class="site-nav__list">${links}</ul>
        <a class="btn btn--primary site-nav__cta" href="contactos.html">Pedir contacto</a>
      </nav>
      <div class="site-header__actions">
        <span class="site-header__status">${statusMarkup()}</span>
        <a class="site-header__phone" href="tel:${SITE.phone.tel}" aria-label="Telefonar para ${SITE.phone.display}">${icon(
    "phone",
    18
  )}</a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu-mobile" data-menu-toggle>
          <span class="nav-toggle__bars" aria-hidden="true"></span>
          <span class="visually-hidden">Abrir menu</span>
        </button>
      </div>
    </div>
  </header>
  <div class="mobile-menu" id="menu-mobile" data-mobile-menu hidden>
    <div class="container container--narrow">
      <a class="mobile-menu__brand" href="index.html" aria-label="Mendes Valadares &amp; Associados — Início">
        <span class="brand__mark" aria-hidden="true">MV</span>
        <span class="mobile-menu__brand-name">Mendes Valadares</span>
      </a>
      <button class="btn btn--ghost btn--sm mobile-menu__close" type="button" data-menu-close>
        ${icon("close", 18)}<span>Fechar</span>
      </button>
      <nav aria-label="Navegação principal (mobile)">
        <ul class="mobile-menu__list">${mobileLinks}</ul>
      </nav>
      <div class="mobile-menu__foot">
        ${statusMarkup()}
        <div class="mobile-menu__contact">
          <a class="btn btn--primary btn--block" href="contactos.html">Pedir contacto</a>
          <a class="btn btn--ghost btn--block" href="tel:${SITE.mobile.tel}">${icon("phone", 18)} Ligar ${SITE.mobile.display}</a>
          <a class="btn btn--ghost btn--block" href="${SITE.whatsapp}" target="_blank" rel="noopener">${icon("whatsapp", 18)} WhatsApp</a>
          <p class="text-small" style="color: rgba(247,244,238,.7)">${SITE.address.full}<br>${SITE.hours.label}</p>
        </div>
      </div>
    </div>
  </div>`;
}

function renderHeader() {
  const mount = $("#site-header");
  if (!mount) return;
  mount.innerHTML = headerTemplate();
}

function initHeaderBehaviour() {
  const header = $("[data-site-header]");
  if (!header) return;
  const overHero = document.body.dataset.header === "transparent";
  const update = () => {
    const scrolled = window.scrollY > 24;
    header.classList.toggle("is-scrolled", overHero && scrolled);
    header.classList.toggle("site-header--solid", !overHero || scrolled);
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initMobileMenu() {
  const toggle = $("[data-menu-toggle]");
  const menu = $("[data-mobile-menu]");
  const closeBtn = $("[data-menu-close]");
  if (!toggle || !menu) return;
  let lastFocus = null;

  const focusables = () =>
    $$('a[href], button:not([disabled])', menu).filter((node) => node.offsetParent !== null);

  const open = () => {
    lastFocus = document.activeElement;
    menu.hidden = false;
    document.body.classList.add("is-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.querySelector(".visually-hidden").textContent = "Fechar menu";
    document.documentElement.style.overflow = "hidden";
    window.requestAnimationFrame(() => {
      menu.classList.add("is-open");
      if (closeBtn) closeBtn.focus();
      else {
        const first = focusables()[0];
        if (first) first.focus();
      }
    });
  };

  const close = () => {
    menu.classList.remove("is-open");
    document.body.classList.remove("is-menu-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".visually-hidden").textContent = "Abrir menu";
    document.documentElement.style.overflow = "";
    window.setTimeout(() => {
      menu.hidden = true;
    }, 320);
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  };

  toggle.addEventListener("click", () => (menu.classList.contains("is-open") ? close() : open()));
  if (closeBtn) closeBtn.addEventListener("click", close);
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!menu.classList.contains("is-open")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab") return;
    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1060 && menu.classList.contains("is-open")) close();
  });
}

/* --------------------------------------------------------------------------
   Rodapé
   -------------------------------------------------------------------------- */
function footerTemplate() {
  const navLinks = NAV.map((item) => `<li><a href="${item.href}">${item.label}</a></li>`).join("");
  const areasLinks = AREAS.map(
    (area) => `<li><a href="area.html?id=${area.id}">${area.title}</a></li>`
  ).join("");

  return `
  <footer class="site-footer" id="rodape">
    <div class="ornament" data-ornament="arches" style="position:absolute;inset:auto 0 auto 0;height:12px;opacity:.35"></div>
    <div class="container">
      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <a class="brand" href="index.html">
            <span class="brand__mark" aria-hidden="true">MV</span>
            <span class="brand__text">
              <span class="brand__name">Mendes Valadares</span>
              <span class="brand__sub">&amp; Associados · Advogados</span>
            </span>
          </a>
          <p class="site-footer__tagline">${SITE.tagline}</p>
          <p class="text-small" style="color: rgba(247,244,238,.68)">
            Sociedade de advogados em Lisboa desde ${SITE.founded}. Atendimento em ${SITE.languages
    .map((l) => l.toLowerCase())
    .join(", ")}.
          </p>
          <a class="link-arrow" href="${SITE.linkedin}" target="_blank" rel="noopener">${icon(
    "linkedin",
    16
  )} LinkedIn</a>
        </div>

        <nav aria-label="Navegação de rodapé">
          <h2 class="site-footer__title">Navegação</h2>
          <ul class="site-footer__list">${navLinks}</ul>
        </nav>

        <nav aria-label="Áreas de atuação">
          <h2 class="site-footer__title">Áreas de atuação</h2>
          <ul class="site-footer__list site-footer__areas">${areasLinks}</ul>
        </nav>

        <div>
          <h2 class="site-footer__title">Contactos</h2>
          <ul class="site-footer__list">
            <li>${SITE.address.street}<br>${SITE.address.postal} ${SITE.address.city}</li>
            <li><a href="tel:${SITE.phone.tel}">${SITE.phone.display}</a> · <a href="tel:${SITE.mobile.tel}">${
    SITE.mobile.display
  }</a></li>
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li><a href="${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
            <li>${SITE.hours.label}</li>
            <li>${SITE.hours.note}</li>
            <li>${statusMarkup()}</li>
          </ul>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p>© ${new Date().getFullYear()} ${SITE.legalName}. Todos os direitos reservados.</p>
        <div class="site-footer__bottom-links">
          <a href="privacidade.html">Privacidade</a>
          <a href="cookies.html">Cookies</a>
          <a href="aviso-legal.html">Aviso legal</a>
          <a href="${SITE.legal.complaintsBook}" target="_blank" rel="noopener">Livro de reclamações</a>
          <button type="button" data-cookie-preferences>Preferências de cookies</button>
        </div>
      </div>
      <p class="text-small" style="color: rgba(247,244,238,.55); padding-bottom: 1.5rem; max-width: 72ch">
        Sociedade de Advogados registada na Ordem dos Advogados sob o ${SITE.legal.societyRegistration} | NIF ${SITE.legal.nif}.
        O escritório está sujeito ao Estatuto da Ordem dos Advogados e ao dever de sigilo profissional.
      </p>
    </div>
    <img class="monogram-watermark" src="images/monogram-watermark.svg" alt="" width="720" height="480" aria-hidden="true" loading="lazy" decoding="async">
  </footer>`;
}

function renderFooter() {
  const mount = $("#site-footer");
  if (!mount) return;
  mount.innerHTML = footerTemplate();
}

/* --------------------------------------------------------------------------
   Banner de cookies
   -------------------------------------------------------------------------- */
const CONSENT_KEY = "mv-cookie-consent-v1";

function readConsent() {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch (error) {
    return null;
  }
}

function writeConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch (error) {
    /* armazenamento indisponível — o banner volta a aparecer */
  }
}

function initCookieBanner() {
  let banner = $("[data-cookie-banner]");

  const applyConsent = (value) => {
    const choice = value || "";
    window.mvAnalyticsEnabled = choice === "all";
    window.mvCookieConsent = choice;
    document.dispatchEvent(new CustomEvent("mv:consent", { detail: { value: choice } }));
  };

  const show = () => {
    if (banner) return;
    document.body.classList.add("has-cookie-consent");
    banner = document.createElement("aside");
    banner.className = "cookie";
    banner.setAttribute("data-cookie-banner", "");
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Consentimento de cookies");
    banner.innerHTML = `
      <p class="cookie__title" tabindex="-1">Cookies e privacidade</p>
      <p class="cookie__text">
        Utilizamos apenas cookies e armazenamento local necessários ao funcionamento do site.
        Com o seu consentimento, podemos também medir a utilização das páginas de forma agregada e anónima.
        Pode alterar a sua escolha a qualquer momento. <a class="link-line" href="cookies.html">Saber mais</a>.
      </p>
      <div class="cookie__actions">
        <button class="btn btn--light btn--sm" type="button" data-cookie-accept>Aceitar todos</button>
        <button class="btn btn--ghost btn--sm" type="button" data-cookie-essential>Apenas essenciais</button>
      </div>`;
    document.body.appendChild(banner);
    const dismiss = () => {
      banner.remove();
      banner = null;
      document.body.classList.remove("has-cookie-consent");
    };
    banner.querySelector("[data-cookie-accept]").addEventListener("click", () => {
      writeConsent("all");
      applyConsent("all");
      dismiss();
      track("consentimento_cookies", { escolha: "todos" });
    });
    banner.querySelector("[data-cookie-essential]").addEventListener("click", () => {
      writeConsent("essential");
      applyConsent("essential");
      dismiss();
    });
  };

  const stored = readConsent();
  applyConsent(stored);
  if (!stored) show();

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-cookie-preferences]")) {
      try {
        window.localStorage.removeItem(CONSENT_KEY);
      } catch (error) {
        /* ignorar */
      }
      window.mvAnalyticsEnabled = false;
      window.mvCookieConsent = "";
      document.dispatchEvent(new CustomEvent("mv:consent", { detail: { value: "" } }));
      show();
      const title = $(".cookie__title", banner);
      if (title) title.focus?.();
    }
  });
}

/* Estado legível da preferência na página de cookies */
function initCookieStatus() {
  const status = $("[data-consent-status]");
  if (!status) return;

  const labels = {
    all: "Aceitou todos os cookies. Nesta versão, não existe ferramenta de análise ativa.",
    essential: "Apenas cookies essenciais. O site continua a funcionar normalmente.",
    "": "Preferência ainda não registada neste navegador.",
  };

  const update = (value) => {
    status.textContent = labels[value || ""] || labels[""];
  };

  update(window.mvCookieConsent || "");
  document.addEventListener("mv:consent", (event) => update(event.detail.value));
}

/* --------------------------------------------------------------------------
   Revelações ao scroll e contadores
   -------------------------------------------------------------------------- */
function initReveal() {
  const reduce = prefersReducedMotion();
  const forceAll = new URLSearchParams(window.location.search).has("noanim");
  $$("[data-stagger]").forEach((container) => {
    $$(":scope > .reveal, :scope > * > .reveal", container).forEach((node, index) => {
      node.style.setProperty("--reveal-delay", `${Math.min(index, 8) * 80}ms`);
    });
  });

  const targets = $$(".reveal, .rule-draw");
  if (!targets.length) return;

  if (reduce || forceAll || !("IntersectionObserver" in window)) {
    targets.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  targets.forEach((node) => observer.observe(node));
}

function initCounters() {
  const counters = $$("[data-count]");
  if (!counters.length) return;

  const finalValue = (node) => {
    const value = Number(node.dataset.count);
    const suffix = node.dataset.suffix || "";
    return `${node.dataset.prefix || ""}${value.toLocaleString("pt-PT")}${suffix}`;
  };

  const forceAll = new URLSearchParams(window.location.search).has("noanim");

  if (prefersReducedMotion() || forceAll || !("IntersectionObserver" in window)) {
    counters.forEach((node) => {
      node.textContent = finalValue(node);
      node.setAttribute("aria-label", finalValue(node));
    });
    return;
  }

  const animate = (node) => {
    const target = Number(node.dataset.count);
    const prefix = node.dataset.prefix || "";
    const suffix = node.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = `${prefix}${Math.round(target * eased).toLocaleString("pt-PT")}${suffix}`;
      if (progress < 1) window.requestAnimationFrame(step);
      else node.textContent = `${prefix}${target.toLocaleString("pt-PT")}${suffix}`;
    };
    window.requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((node) => {
    node.textContent = `${node.dataset.prefix || ""}0${node.dataset.suffix || ""}`;
    node.setAttribute("aria-label", finalValue(node));
    observer.observe(node);
  });
}

/* --------------------------------------------------------------------------
   Acordeão acessível
   -------------------------------------------------------------------------- */
export function initAccordions(scope = document) {
  $$("[data-accordion]", scope).forEach((accordion) => {
    if (accordion.dataset.accordionReady === "true") return;
    accordion.dataset.accordionReady = "true";
    const items = $$("[data-acc-item]", accordion);
    items.forEach((item, index) => {
      const trigger = $(".acc-item__trigger", item);
      const panel = $(".acc-item__panel", item);
      if (!trigger || !panel) return;
      const id = panel.id || `acc-${index}-${Math.random().toString(36).slice(2, 7)}`;
      panel.id = id;
      trigger.setAttribute("aria-controls", id);
      trigger.setAttribute("aria-expanded", panel.classList.contains("is-open") ? "true" : "false");
      trigger.addEventListener("click", () => {
        const open = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", open ? "false" : "true");
        panel.classList.toggle("is-open", !open);
      });
    });
  });
}

/** Marca o primeiro item de um acordeão como aberto. */
export function openFirstAccordionItem(scope = document) {
  const trigger = $("[data-accordion] [data-acc-item] .acc-item__trigger", scope);
  if (trigger) {
    trigger.setAttribute("aria-expanded", "true");
    const panel = $(".acc-item__panel", trigger.closest("[data-acc-item]"));
    if (panel) panel.classList.add("is-open");
  }
}

/* --------------------------------------------------------------------------
   Separadores acessíveis (contactos)
   -------------------------------------------------------------------------- */
export function initTabs(scope = document) {
  $$("[data-tabs]", scope).forEach((group) => {
    if (group.dataset.tabsReady === "true") return;
    group.dataset.tabsReady = "true";
    const tabs = $$('[role="tab"]', group);
    const panels = $$('[role="tabpanel"]', group);
    const activate = (tab, focus = true) => {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute("aria-selected", selected ? "true" : "false");
        item.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
      });
      if (focus) tab.focus();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab, false));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        activate(tabs[next]);
      });
    });

    if (tabs.length && tabs[0].getAttribute("aria-selected") !== "true") activate(tabs[0], false);
  });
}

/* --------------------------------------------------------------------------
   Modais (elemento <dialog> nativo)
   -------------------------------------------------------------------------- */
function initModals() {
  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-modal-open]");
    if (opener) {
      const dialog = document.getElementById(opener.dataset.modalOpen);
      if (dialog && typeof dialog.showModal === "function") {
        if (opener.tagName === "A") event.preventDefault();
        dialog.showModal();
        document.documentElement.style.overflow = "hidden";
      }
      return;
    }
    const closer = event.target.closest("[data-modal-close]");
    if (closer) {
      const dialog = closer.closest("dialog");
      if (dialog) dialog.close();
      return;
    }
    // Clique no fundo do diálogo (fora do conteúdo) fecha
    if (event.target instanceof HTMLDialogElement && event.target.classList.contains("modal")) {
      event.target.close();
    }
  });

  // O evento "close" não propaga: apanhamo-lo na fase de captura, para
  // funcionar também com diálogos injetados depois da inicialização.
  document.addEventListener(
    "close",
    (event) => {
      if (event.target instanceof HTMLDialogElement) {
        const anyOpen = document.querySelector("dialog.modal[open]");
        if (!anyOpen) document.documentElement.style.overflow = "";
      }
    },
    true
  );
}

/* --------------------------------------------------------------------------
   Botões flutuantes, barra fixa mobile e progresso de leitura
   -------------------------------------------------------------------------- */
function initFloating() {
  const tools = document.createElement("aside");
  tools.className = "floating-tools";
  tools.setAttribute("aria-label", "Ações rápidas");
  document.body.appendChild(tools);

  // Barra fixa de ações em mobile
  const bar = document.createElement("div");
  bar.className = "sticky-actions";
  bar.innerHTML = `
    <a class="sticky-actions__item" href="tel:${SITE.mobile.tel}">${icon("phone", 19)} Ligar</a>
    <a class="sticky-actions__item sticky-actions__item--primary" href="contactos.html">${icon("mail", 19)} Pedir contacto</a>`;
  tools.appendChild(bar);

  // WhatsApp discreto
  const whatsapp = document.createElement("a");
  whatsapp.className = "fab fab--whatsapp";
  whatsapp.href = SITE.whatsapp;
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener";
  whatsapp.setAttribute("aria-label", "Enviar mensagem por WhatsApp");
  whatsapp.innerHTML = icon("whatsapp", 22);
  tools.appendChild(whatsapp);

  // Voltar ao topo
  const top = document.createElement("button");
  top.type = "button";
  top.className = "fab fab--top";
  top.setAttribute("aria-label", "Voltar ao topo");
  top.innerHTML = icon("arrow-up", 20);
  tools.appendChild(top);

  top.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  });

  const onScroll = () => top.classList.toggle("is-visible", window.scrollY > 700);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initReadingProgress() {
  const bar = $("[data-progress]");
  if (!bar) return;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const value = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.width = `${value * 100}%`;
    bar.setAttribute("aria-valuenow", String(Math.round(value * 100)));
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", debounce(update, 150));
}

/* --------------------------------------------------------------------------
   Mapa do Google com carregamento após consentimento
   -------------------------------------------------------------------------- */
function initMap() {
  const container = $("[data-map]");
  if (!container) return;
  const button = $("[data-map-load]", container);
  if (!button) return;
  button.addEventListener("click", () => {
    const query = encodeURIComponent(container.dataset.mapQuery || SITE.address.full);
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.google.com/maps?q=${query}&hl=pt-PT&z=16&output=embed`;
    iframe.title = `Mapa da localização do escritório: ${SITE.address.full}`;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.setAttribute("allowfullscreen", "");
    container.querySelector(".map__placeholder").replaceWith(iframe);
    track("mapa_carregado", {});
  });
}

/* --------------------------------------------------------------------------
   Acordeão da FAQ na página inicial (a partir dos dados)
   -------------------------------------------------------------------------- */
export function faqAccordionMarkup(items, startOpen = false) {
  return `<div class="accordion" data-accordion>
    ${items
      .map(
        (item, index) => `
      <div class="acc-item" data-acc-item>
        <h3 class="acc-item__h">
          <button class="acc-item__trigger" type="button" id="faq-${escapeHtml(item.id)}-${index}" aria-expanded="false">
            <span>${escapeHtml(item.question)}</span>
            <span class="acc-item__icon" aria-hidden="true"></span>
          </button>
        </h3>
        <div class="acc-item__panel${startOpen && index === 0 ? " is-open" : ""}" role="region" aria-labelledby="faq-${escapeHtml(
          item.id
        )}-${index}">
          <div class="acc-item__inner">
            <div class="acc-item__content"><p>${escapeHtml(item.answer)}</p></div>
          </div>
        </div>
      </div>`
      )
      .join("")}
  </div>`;
}

/* --------------------------------------------------------------------------
   Acesso a dados e cartões reutilizáveis
   -------------------------------------------------------------------------- */
export const getAreaById = (id) => AREAS.find((area) => area.id === id) || null;
export const getTeamById = (id) => TEAM.find((member) => member.id === id) || null;
export const getArticleById = (id) => ARTICLES.find((article) => article.id === id) || null;

export function clientLabels(area) {
  return area.clients
    .map((id) => (CLIENT_TYPES.find((type) => type.id === id) || {}).label)
    .filter(Boolean);
}

export function clientTagsMarkup(area) {
  return `<span class="cluster cluster--tight">${clientLabels(area)
    .map((label) => `<span class="tag">${label}</span>`)
    .join("")}</span>`;
}

export function areaCard(area, options = {}) {
  const matches = (options.matches || []).slice(0, 2);
  return `
  <a class="card card--area reveal" href="area.html?id=${area.id}">
    <div class="card__body">
      <span class="num">${area.number}</span>
      <h3 class="title-m">${area.title}</h3>
      <p class="card--area__text">${area.short}</p>
      ${
        matches.length
          ? `<p class="card--area__match">Corresponde a: ${matches.map((item) => `<em>${item}</em>`).join(" · ")}</p>`
          : ""
      }
      <div class="card--area__foot">
        ${clientTagsMarkup(area)}
        <span class="card--area__more">Ver área ${icon("arrow-right", 15)}</span>
      </div>
      <span class="visually-hidden">${area.situations
        .slice(0, 3)
        .map((item) => item.title)
        .join("; ")}</span>
    </div>
  </a>`;
}

export function articleCard(article) {
  const area = getAreaById(article.area);
  return `
  <a class="card card--article reveal" href="artigo.html?id=${article.id}">
    <div class="card__body">
      <p class="card--article__meta">
        <span>${area ? area.title : "Artigos"}</span>
        <span>${formatDateShort(article.date)}</span>
      </p>
      <h3 class="title-m">${article.title}</h3>
      <p class="card--article__excerpt">${article.excerpt}</p>
      <div class="card--article__foot">
        <span class="card--area__more">Ler artigo ${icon("arrow-right", 15)}</span>
        <span class="text-small text-stone">${article.readingTime} min</span>
      </div>
    </div>
  </a>`;
}

export function teamCard(member, options = {}) {
  const areas = member.areas
    .map((id) => (getAreaById(id) || {}).title)
    .filter(Boolean)
    .join(" · ");
  const inner = `
    <div class="portrait">
      <img src="${member.photo}" alt="Retrato de ${member.name}" width="800" height="1000" loading="lazy" decoding="async">
    </div>
    <div class="card--team__body">
      <p class="card--team__name">${member.name}</p>
      <p class="card--team__role">${member.role}</p>
      <p class="card--team__meta">${areas}<br>${member.languages.join(", ")}</p>
      <span class="card--team__button">Ver perfil ${icon("arrow-right", 15)}</span>
    </div>`;

  if (options.link) {
    return `<div class="card card--team reveal">
      <a class="team-card__trigger" href="equipa.html#${member.id}">${inner}</a>
    </div>`;
  }

  return `<div class="card card--team reveal">
    <button class="team-card__trigger" type="button" data-modal-open="modal-${member.id}">${inner}</button>
  </div>`;
}

export function teamModal(member) {
  const areas = member.areas
    .map((id) => (getAreaById(id) || {}).title)
    .filter(Boolean);
  return `
  <dialog class="modal" id="modal-${member.id}" aria-labelledby="modal-${member.id}-title">
    <button class="modal__close" type="button" data-modal-close aria-label="Fechar perfil">${icon("close", 18)}</button>
    <div class="modal__inner modal__inner--split">
      <div class="modal__portrait">
        <img src="${member.photo}" alt="Retrato de ${member.name}" width="800" height="1000" loading="lazy" decoding="async">
      </div>
      <div class="stack-m">
        <p class="eyebrow">${member.role}</p>
        <h2 class="title-l" id="modal-${member.id}-title">${member.name}</h2>
        <div class="prose text-small" style="max-width: none">
          ${member.fullBio.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </div>
        <dl class="modal__meta">
          <div><dt>Áreas</dt><dd>${areas.join(" · ")}</dd></div>
          <div><dt>Línguas</dt><dd>${member.languages.join(", ")}</dd></div>
          <div><dt>Inscrição</dt><dd>${member.cedula}</dd></div>
        </dl>
        <div class="notice notice--neutral">
          ${icon("info", 18)}
          <p>Para falar com ${member.shortName}, utilize o formulário de contacto ou ligue para o escritório. Não envie documentos por este canal.</p>
        </div>
        <div class="cluster">
          <a class="btn btn--primary" href="contactos.html?advogado=${member.id}">Pedir contacto</a>
          <a class="btn btn--ghost" href="tel:${SITE.phone.tel}">Ligar ${SITE.phone.display}</a>
        </div>
      </div>
    </div>
  </dialog>`;
}

/* --------------------------------------------------------------------------
   Página inicial
   -------------------------------------------------------------------------- */
function initHomePage() {
  if (document.body.dataset.page !== "home") return;

  const areasMount = $("[data-home-areas]");
  if (areasMount) areasMount.innerHTML = AREAS.map(areaCard).join("");

  const teamMount = $("[data-home-team]");
  if (teamMount) teamMount.innerHTML = TEAM.map((member) => teamCard(member, { link: true })).join("");

  const articlesMount = $("[data-home-articles]");
  if (articlesMount) {
    articlesMount.innerHTML = [...ARTICLES]
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, 3)
      .map(articleCard)
      .join("");
  }

  const faqMount = $("[data-home-faq]");
  if (faqMount) {
    faqMount.innerHTML = faqAccordionMarkup(FAQ.slice(0, 4), true);
    initAccordions(faqMount);
  }

  // Dados estruturados da FAQ (a informação está em data.js)
  const faqLd = document.createElement("script");
  faqLd.type = "application/ld+json";
  faqLd.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.slice(0, 4).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  });
  document.head.appendChild(faqLd);
}

/* --------------------------------------------------------------------------
   Inicialização
   -------------------------------------------------------------------------- */
function init() {
  renderHeader();
  initHeaderBehaviour();
  initMobileMenu();
  renderFooter();
  initOrnaments();
  initOpenStatus();
  initCookieBanner();
  initCookieStatus();
  initHomePage();
  initReveal();
  initCounters();
  initAccordions();
  initTabs();
  initModals();
  initFloating();
  initReadingProgress();
  initMap();
  initAnalyticsHooks();
}

/** Volta a aplicar revelações e contadores depois de injetar conteúdo novo. */
export function refreshPageEffects() {
  initReveal();
  initCounters();
}

export { initReveal, initCounters };

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

export { SITE, NAV, CLIENT_TYPES, FAQ };
