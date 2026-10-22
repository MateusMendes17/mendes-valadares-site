/* ==========================================================================
   PÁGINA DA EQUIPA (equipa.html)
   Cartões dos advogados, perfis em <dialog> acessível, apoiado em
   js/data.js (TEAM e TEAM_SUPPORT). Abre o perfil correspondente quando o
   endereço traz um identificador, por exemplo equipa.html#helena-valadares.
   ========================================================================== */
import { $, escapeHtml, icon, teamCard, teamModal, getAreaById, refreshPageEffects } from "./main.js";
import { TEAM, TEAM_SUPPORT } from "./data.js";

/* --------------------------------------------------------------------------
   Cartões da equipa
   -------------------------------------------------------------------------- */

/** Cartão destacado (sócios fundadores): retrato 4:5 com biografia curta. */
function leadCard(member) {
  const areas = member.areas.map((id) => (getAreaById(id) || {}).title).filter(Boolean);
  return `<div class="card card--team card--team--lead reveal" id="${member.id}">
    <button class="team-card__trigger" type="button" data-modal-open="modal-${member.id}">
      <div class="portrait">
        <img src="${member.photo}" alt="Retrato de ${escapeHtml(member.name)}" width="800" height="1000" loading="lazy" decoding="async">
      </div>
      <div class="card--team__body">
        <p class="card--team__role">${escapeHtml(member.role)}</p>
        <p class="card--team__name">${escapeHtml(member.name)}</p>
        <p class="card--team__bio">${escapeHtml(member.bio)}</p>
        <p class="card--team__meta">${areas.map(escapeHtml).join(" · ")}<br>${member.languages.map(escapeHtml).join(", ")}</p>
        <span class="card--team__button">Ver perfil ${icon("arrow-right", 15)}</span>
      </div>
    </button>
  </div>`;
}

/** Cartão compacto (restantes advogados). */
function memberCard(member, options = {}) {
  if (options.lead) return leadCard(member);
  return `<div class="card card--team reveal" id="${member.id}">
    <button class="team-card__trigger" type="button" data-modal-open="modal-${member.id}">
      <div class="portrait">
        <img src="${member.photo}" alt="Retrato de ${escapeHtml(member.name)}" width="800" height="1000" loading="lazy" decoding="async">
      </div>
      <div class="card--team__body">
        <p class="card--team__role">${escapeHtml(member.role)}</p>
        <p class="card--team__name">${escapeHtml(member.name)}</p>
        <p class="card--team__meta">${member.areas
          .map((id) => (getAreaById(id) || {}).title)
          .filter(Boolean)
          .map(escapeHtml)
          .join(" · ")}<br>${member.languages.map(escapeHtml).join(", ")}</p>
        <span class="card--team__button">Ver perfil ${icon("arrow-right", 15)}</span>
      </div>
    </button>
  </div>`;
}

/* --------------------------------------------------------------------------
   Renderização da página
   -------------------------------------------------------------------------- */
function renderTeamPage() {
  const mount = $("[data-team-page]");
  if (!mount) return;

  const founders = TEAM.filter((member) => (member.role || "").includes("fundador"));
  const others = TEAM.filter((member) => !founders.includes(member));

  const leadsMount = $("[data-team-leads]");
  const gridMount = $("[data-team-grid]");
  const supportMount = $("[data-team-support]");
  const modalsMount = $("[data-team-modals]");

  if (leadsMount) leadsMount.innerHTML = founders.map((member) => memberCard(member, { lead: true })).join("");
  if (gridMount) gridMount.innerHTML = others.map((member) => memberCard(member)).join("");
  if (supportMount) {
    supportMount.innerHTML = TEAM_SUPPORT.map(
      (item, index) => `<div class="card reveal">
        <div class="card__body">
          <span class="num">${String(index + 1).padStart(2, "0")}</span>
          <h3 class="title-s">${escapeHtml(item.title)}</h3>
          <p class="card--area__text">${escapeHtml(item.text)}</p>
        </div>
      </div>`
    ).join("");
  }
  if (modalsMount) modalsMount.innerHTML = TEAM.map(teamModal).join("");

  // Dados estruturados: cada advogado como Attorney
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Equipa — Mendes Valadares & Associados",
    itemListElement: TEAM.map((member, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Attorney",
        name: member.name,
        alternateName: member.shortName,
        jobTitle: member.role,
        description: member.bio,
        image: `https://mendes-valadares.vercel.app/${member.photo}`,
        knowsLanguage: member.languages,
        knowsAbout: member.areas.map((id) => (getAreaById(id) || {}).title).filter(Boolean),
        worksFor: { "@id": "https://mendes-valadares.vercel.app/#escritorio" },
        url: `https://mendes-valadares.vercel.app/equipa.html#${member.id}`,
      },
    })),
  });
  document.head.appendChild(ld);

  refreshPageEffects();
}

/* --------------------------------------------------------------------------
   Perfil aberto a partir do endereço (equipa.html#id)
   -------------------------------------------------------------------------- */
function openProfileFromHash() {
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!id) return;
  const member = TEAM.find((item) => item.id === id);
  if (!member) return;
  const dialog = document.getElementById(`modal-${member.id}`);
  if (!dialog || typeof dialog.showModal !== "function") return;

  dialog.showModal();
  document.documentElement.style.overflow = "hidden";
  dialog.addEventListener(
    "close",
    () => {
      window.history.replaceState(null, "", window.location.pathname);
    },
    { once: true }
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    renderTeamPage();
    openProfileFromHash();
  });
} else {
  renderTeamPage();
  openProfileFromHash();
}
