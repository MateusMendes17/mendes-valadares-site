/* ==========================================================================
   PÁGINAS DE ÁREAS DE ATUAÇÃO
   - areas-de-atuacao.html : lista com filtros por tipo de cliente e pesquisa
   - area.html             : detalhe da área (?id=...)
   Conteúdo definido em js/data.js (AREAS).
   ========================================================================== */
import {
  $,
  escapeHtml,
  getParam,
  debounce,
  track,
  icon,
  areaCard,
  articleCard,
  faqAccordionMarkup,
  initAccordions,
  getAreaById,
  getTeamById,
  clientTagsMarkup,
  refreshPageEffects,
} from "./main.js";
import { AREAS, CLIENT_TYPES, SITE, ARTICLES } from "./data.js";

/* --------------------------------------------------------------------------
   Utilitários
   -------------------------------------------------------------------------- */

/** Texto normalizado para pesquisa (sem acentos nem maiúsculas). */
function normalize(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Devolve as situações/palavras que correspondem ao termo, ou null. */
function areaMatches(area, query) {
  const haystack = normalize(
    [
      area.title,
      area.short,
      (area.keywords || []).join(" "),
      area.situations.map((situation) => `${situation.title} ${situation.text}`).join(" "),
      area.faqs.map((faq) => `${faq.q} ${faq.a}`).join(" "),
    ].join(" ")
  );
  if (!haystack.includes(query)) return null;

  const hits = area.situations
    .filter((situation) => normalize(`${situation.title} ${situation.text}`).includes(query))
    .map((situation) => situation.title);

  const keyword = (area.keywords || []).find((item) => normalize(item).includes(query));
  if (!hits.length && keyword) hits.push(keyword);
  if (!hits.length && normalize(area.title).includes(query)) hits.push(area.title);
  return hits;
}

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaProperty(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setSocialMeta(title, description, url, type) {
  setMetaProperty("og:title", title);
  setMetaProperty("og:description", description);
  setMetaProperty("og:url", url);
  if (type) setMetaProperty("og:type", type);
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
}

function injectStructuredData(data) {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.dynamic = "true";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/* ==========================================================================
   PÁGINA: LISTA DE ÁREAS
   ========================================================================== */
const listState = {
  client: "todos",
  query: "",
};

function visibleAreas() {
  const query = normalize(listState.query);
  return AREAS.filter((area) => {
    if (listState.client !== "todos" && !area.clients.includes(listState.client)) return false;
    if (!query) return true;
    return areaMatches(area, query) !== null;
  });
}

function clientFilterCount(clientId) {
  const query = normalize(listState.query);
  return AREAS.filter((area) => {
    if (clientId !== "todos" && !area.clients.includes(clientId)) return false;
    if (!query) return true;
    return areaMatches(area, query) !== null;
  }).length;
}

function chipsMarkup() {
  const options = [{ id: "todos", label: "Todas as áreas" }, ...CLIENT_TYPES];
  return options
    .map(
      (option) => `<button class="chip" type="button" data-client-filter="${option.id}" aria-pressed="${
        listState.client === option.id ? "true" : "false"
      }">${escapeHtml(option.label)} <span class="chip__count">${clientFilterCount(option.id)}</span></button>`
    )
    .join("");
}

function emptyStateMarkup(total) {
  const term = listState.query.trim();
  const clientLabel = (CLIENT_TYPES.find((type) => type.id === listState.client) || {}).label;
  const reasons = [
    term ? `para «${escapeHtml(term)}»` : "",
    clientLabel ? `no grupo «${escapeHtml(clientLabel)}»` : "",
  ]
    .filter(Boolean)
    .join(" e ");

  return `<div class="empty-state" data-empty-state>
    <p class="title-s">Sem resultados ${reasons}</p>
    <p class="text-small">Experimente outra palavra — por exemplo «divórcio», «dívidas» ou «arrendamento» — ou fale connosco: dizemos-lhe com franqueza se podemos ajudar.</p>
    <div class="cluster">
      <button class="btn btn--ghost btn--sm" type="button" data-area-clear>Limpar filtros</button>
      <a class="btn btn--primary btn--sm" href="contactos.html">Pedir contacto</a>
    </div>
    <p class="text-small text-stone">${escapeHtml(SITE.name)} — ${total} áreas de atuação.</p>
  </div>`;
}

function resultsText(count) {
  const el = $("[data-area-count]");
  if (!el) return;
  const parts = [`${count} ${count === 1 ? "área" : "áreas"}`];
  const clientLabel = (CLIENT_TYPES.find((type) => type.id === listState.client) || {}).label;
  if (clientLabel) parts.push(clientLabel);
  if (listState.query.trim()) parts.push(`«${listState.query.trim()}»`);
  el.textContent = parts.join(" · ");
}

function syncUrl() {
  const params = new URLSearchParams();
  if (listState.client !== "todos") params.set("cliente", listState.client);
  if (listState.query.trim()) params.set("q", listState.query.trim());
  const search = params.toString();
  const url = `${window.location.pathname}${search ? `?${search}` : ""}`;
  window.history.replaceState(null, "", url);
}

function renderAreaList() {
  const grid = $("[data-area-grid]");
  const chips = $("[data-area-chips]");
  if (!grid) return;

  const query = normalize(listState.query);
  const areas = visibleAreas();

  grid.innerHTML = areas.length
    ? areas
        .map((area) => areaCard(area, { matches: query ? areaMatches(area, query) || [] : [] }))
        .join("")
    : emptyStateMarkup(AREAS.length);

  if (chips) {
    chips.innerHTML = chipsMarkup();
  }
  resultsText(areas.length);
  refreshPageEffects();
}

function readListStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const client = params.get("cliente");
  if (client && CLIENT_TYPES.some((type) => type.id === client)) listState.client = client;
  const query = params.get("q");
  if (query) listState.query = query;
}

function initAreasIndex() {
  const section = $("[data-areas-index]");
  if (!section) return;

  readListStateFromUrl();

  const input = $("[data-area-search]");
  if (input) {
    input.value = listState.query;
    const onSearch = debounce(() => {
      listState.query = input.value;
      syncUrl();
      renderAreaList();
    }, 200);
    input.addEventListener("input", onSearch);
    input.addEventListener("change", () => {
      if (input.value.trim()) track("pesquisa_areas", { termo: input.value.trim() });
    });
    // Limpar com Escape
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && input.value) {
        input.value = "";
        listState.query = "";
        syncUrl();
        renderAreaList();
      }
    });
  }

  section.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-client-filter]");
    if (chip) {
      listState.client = chip.dataset.clientFilter;
      syncUrl();
      renderAreaList();
      if (listState.client !== "todos") track("filtro_areas", { tipo: listState.client });
      return;
    }
    if (event.target.closest("[data-area-clear]")) {
      listState.client = "todos";
      listState.query = "";
      if (input) input.value = "";
      syncUrl();
      renderAreaList();
      track("limpar_filtros_areas", {});
    }
  });

  renderAreaList();
}

/* ==========================================================================
   PÁGINA: DETALHE DA ÁREA
   ========================================================================== */
function lawyerMini(member) {
  return `<a class="mini-person" href="equipa.html#${member.id}">
    <span class="mini-person__photo">
      <img src="${member.photo}" alt="Retrato de ${escapeHtml(member.name)}" width="96" height="96" loading="lazy" decoding="async">
    </span>
    <span class="mini-person__body">
      <span class="mini-person__name">${escapeHtml(member.name)}</span>
      <span class="mini-person__role">${escapeHtml(member.role)}</span>
      <span class="mini-person__more">Ver perfil ${icon("arrow-right", 14)}</span>
    </span>
  </a>`;
}

function areaHeroMarkup(area) {
  const lawyers = area.team.map((id) => (getTeamById(id) || {}).name).filter(Boolean);
  return `
  <div class="container">
    <div class="page-hero__inner">
      <nav class="crumbs" aria-label="Caminho">
        <a href="index.html">Início</a>
        <span class="crumbs__sep" aria-hidden="true">/</span>
        <a href="areas-de-atuacao.html">Áreas de atuação</a>
        <span class="crumbs__sep" aria-hidden="true">/</span>
        <span aria-current="page">${escapeHtml(area.title)}</span>
      </nav>
      <div class="page-hero__num" aria-hidden="true">${area.number}</div>
      <div class="stack-s">
        <p class="eyebrow">Área de atuação ${area.number}</p>
        <h1 class="page-hero__title">${escapeHtml(area.title)}</h1>
        <p class="lead">${escapeHtml(area.short)}</p>
        <div class="page-hero__meta">
          <span>${area.situations.length} situações frequentes</span>
          <span aria-hidden="true">·</span>
          <span>Advogados: ${lawyers.map(escapeHtml).join(" e ")}</span>
          <span aria-hidden="true">·</span>
          <span>Português, inglês, francês e espanhol</span>
        </div>
        ${clientTagsMarkup(area)}
      </div>
    </div>
  </div>`;
}

function areaMainMarkup(area) {
  const lawyers = area.team.map(getTeamById).filter(Boolean);
  const articles = (area.articles || [])
    .map((id) => ARTICLES.find((article) => article.id === id))
    .filter(Boolean);

  return `
  <div class="stack-l">
    <div class="prose">
      <h2 class="title-l">Como trabalhamos nesta área</h2>
      ${area.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
    </div>

    <section aria-labelledby="situacoes-title" class="stack-s">
      <p class="eyebrow">Em que situações podemos ajudar</p>
      <h2 class="title-l" id="situacoes-title">Assuntos que tratamos com frequência</h2>
      <div class="situations mt-m">
        ${area.situations
          .map(
            (situation) => `<div class="situation reveal">
              <p class="situation__title">${escapeHtml(situation.title)}</p>
              <p class="situation__text">${escapeHtml(situation.text)}</p>
            </div>`
          )
          .join("")}
      </div>
    </section>

    <section aria-labelledby="processo-title" class="stack-s">
      <p class="eyebrow">Como acompanhamos o processo</p>
      <h2 class="title-l" id="processo-title">Quatro passos, explicados desde o início</h2>
      <div class="steps steps--light mt-m">
        ${area.process
          .map(
            (step, index) => `<div class="step reveal">
              <p class="step__num">${index + 1}</p>
              <p class="step__title">${escapeHtml(step.title)}</p>
              <p class="step__text">${escapeHtml(step.text)}</p>
            </div>`
          )
          .join("")}
      </div>
    </section>

    ${
      lawyers.length
        ? `<section aria-labelledby="advogados-title" class="stack-s">
      <p class="eyebrow">Quem acompanha esta área</p>
      <h2 class="title-l" id="advogados-title">Advogados responsáveis</h2>
      <div class="grid grid--2 mt-m">
        ${lawyers.map(lawyerMini).join("")}
      </div>
      <p class="content-note">Conheça também a <a class="link-line" href="equipa.html">equipa completa do escritório</a>.</p>
    </section>`
        : ""
    }

    <section aria-labelledby="faq-area-title" class="stack-s">
      <p class="eyebrow">Perguntas frequentes</p>
      <h2 class="title-l" id="faq-area-title">Dúvidas sobre ${escapeHtml(area.title.toLowerCase())}</h2>
      ${faqAccordionMarkup(
        area.faqs.map((faq, index) => ({ id: `${area.id}-${index}`, question: faq.q, answer: faq.a })),
        true
      )}
    </section>

    ${
      articles.length
        ? `<section aria-labelledby="artigos-area-title" class="stack-s">
      <p class="eyebrow">Leitura relacionada</p>
      <h2 class="title-l" id="artigos-area-title">Artigos sobre o tema</h2>
      <div class="grid grid--2 mt-m">
        ${articles.map(articleCard).join("")}
      </div>
    </section>`
        : ""
    }

    <div class="callout">
      ${icon("info", 18)}
      <p>${escapeHtml(SITE.contentNote)} Para uma análise do seu caso concreto, fale com o escritório.</p>
    </div>
  </div>`;
}

function areaAsideMarkup(area) {
  const others = AREAS.filter((item) => item.id !== area.id);
  return `
  <div class="card card--aside">
    <div class="card__body">
      <p class="eyebrow">Falar sobre este assunto</p>
      <h2 class="title-m">Exponha-nos a sua situação</h2>
      <p class="text-small">Indique o assunto ao pedir contacto: chegamos à reunião com o enquadramento preparado e apresentamos honorários por escrito antes de avançar.</p>
      <a class="btn btn--primary btn--block" href="contactos.html?area=${area.id}" data-area-cta>Pedir contacto ${icon("arrow-right", 16)}</a>
      <a class="btn btn--ghost btn--block" href="tel:${SITE.phone.tel}">${icon("phone", 16)} Ligar ${SITE.phone.display}</a>
      <p class="text-small text-stone">Assunto pré-selecionado: ${escapeHtml(area.title)}.</p>
      <div class="contact-list">
        <p class="contact-list__item">
          ${icon("clock", 18)}
          <span><span class="contact-list__label">Atendimento</span>${SITE.hours.label}</span>
        </p>
        <p class="contact-list__item">
          ${icon("pin", 18)}
          <span><span class="contact-list__label">Escritório</span>${SITE.address.street}<br>${SITE.address.postal} ${SITE.address.city}</span>
        </p>
      </div>
    </div>
  </div>

  <nav class="card card--quiet" aria-labelledby="outras-areas-title">
    <div class="card__body">
      <h2 class="title-s" id="outras-areas-title">Outras áreas</h2>
      <ul class="aside-links">
        ${others
          .map(
            (item) => `<li><a href="area.html?id=${item.id}"><span class="num">${item.number}</span> ${escapeHtml(item.title)}</a></li>`
          )
          .join("")}
      </ul>
    </div>
  </nav>`;
}

function areaCtaMarkup(area) {
  return `
  <div class="ornament ornament--cta" data-ornament="arches" aria-hidden="true"></div>
  <div class="container cta-band__inner">
    <div class="stack-m">
      <p class="eyebrow">Próximo passo</p>
      <h2 class="cta-band__title">Precisa de apoio em<br>${escapeHtml(area.title)}?</h2>
      <p class="lead">Escreva-nos o essencial da situação. Entramos em contacto no prazo de 1 dia útil, em português, inglês, francês ou espanhol.</p>
    </div>
    <div class="cta-band__actions">
      <a class="btn btn--primary" href="contactos.html?area=${area.id}">Pedir contacto</a>
      <a class="btn btn--ghost" href="tel:${SITE.phone.tel}">Ligar ${SITE.phone.display}</a>
    </div>
  </div>`;
}

function renderAreaNotFound() {
  const hero = $("[data-area-hero]");
  const body = $("[data-area-body]");
  const title = "Área não encontrada — Mendes Valadares & Associados";
  const description =
    "A área de atuação pedida não existe ou foi movida. Consulte as oito áreas do escritório Mendes Valadares & Associados, em Lisboa.";
  document.title = title;
  setMeta("robots", "noindex, follow");
  setMeta("description", description);
  setSocialMeta(title, description, "https://mendes-valadares.vercel.app/areas-de-atuacao.html", "website");

  if (hero) {
    hero.innerHTML = `
    <div class="container">
      <div class="page-hero__inner">
        <nav class="crumbs" aria-label="Caminho">
          <a href="index.html">Início</a>
          <span class="crumbs__sep" aria-hidden="true">/</span>
          <a href="areas-de-atuacao.html">Áreas de atuação</a>
          <span class="crumbs__sep" aria-hidden="true">/</span>
          <span aria-current="page">Área não encontrada</span>
        </nav>
        <p class="eyebrow">Erro 404</p>
        <h1 class="page-hero__title">Não encontrámos esta área.</h1>
        <p class="lead">O endereço pode estar incompleto ou a área foi renomeada. Consulte as oito áreas de atuação do escritório ou fale connosco — encaminhamos o seu assunto para a área certa.</p>
        <div class="cluster mt-m">
          <a class="btn btn--primary" href="areas-de-atuacao.html">Ver todas as áreas</a>
          <a class="btn btn--ghost" href="contactos.html">Pedir contacto</a>
        </div>
      </div>
    </div>`;
  }
  if (body) body.remove();
  const cta = $("[data-area-cta-band]");
  if (cta) cta.remove();
}

function initAreaDetail() {
  const page = $("[data-area-page]");
  if (!page) return;

  const area = getAreaById(getParam("id"));
  if (!area) {
    renderAreaNotFound();
    return;
  }

  const hero = $("[data-area-hero]");
  const main = $("[data-area-main]");
  const aside = $("[data-area-aside]");
  const cta = $("[data-area-cta-band]");

  if (hero) {
    hero.classList.add("page-hero--with-num");
    hero.innerHTML = areaHeroMarkup(area);
  }
  if (main) main.innerHTML = areaMainMarkup(area);
  if (aside) aside.innerHTML = areaAsideMarkup(area);
  if (cta) cta.innerHTML = areaCtaMarkup(area);

  // Título, meta e canónica específicos da área
  const canonicalUrl = `https://mendes-valadares.vercel.app/area.html?id=${area.id}`;
  const title = `${area.title} | Mendes Valadares`;
  const description = `${area.short} Acompanhamento próximo em Lisboa e em todo o país.`;
  document.title = title;
  setMeta("description", description);
  setSocialMeta(title, description, canonicalUrl, "website");
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", canonicalUrl);

  // Dados estruturados desta área
  injectStructuredData({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://mendes-valadares.vercel.app/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Áreas de atuação",
        item: "https://mendes-valadares.vercel.app/areas-de-atuacao.html",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: area.title,
        item: `https://mendes-valadares.vercel.app/area.html?id=${area.id}`,
      },
    ],
  });
  injectStructuredData({
    "@context": "https://schema.org",
    "@type": "Service",
    name: area.title,
    serviceType: area.title,
    description: area.intro.join(" "),
    url: `https://mendes-valadares.vercel.app/area.html?id=${area.id}`,
    provider: { "@id": "https://mendes-valadares.vercel.app/#escritorio" },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Lisboa" },
      { "@type": "Country", name: "Portugal" },
    ],
    availableLanguage: ["pt", "en", "fr", "es"],
  });
  injectStructuredData({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  });

  if (main) initAccordions(main);
  refreshPageEffects();
}

/* --------------------------------------------------------------------------
   Inicialização
   -------------------------------------------------------------------------- */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initAreasIndex();
    initAreaDetail();
  });
} else {
  initAreasIndex();
  initAreaDetail();
}
