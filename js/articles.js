/* ==========================================================================
   PÁGINAS DE ARTIGOS
   - artigos.html : destaque, pesquisa e filtro por área
   - artigo.html  : leitura do artigo (?id=...), índice, autor e relacionados
   Conteúdo definido em js/data.js (ARTICLES).
   ========================================================================== */
import {
  $,
  escapeHtml,
  getParam,
  debounce,
  track,
  icon,
  formatDate,
  formatDateShort,
  articleCard,
  getArticleById,
  getAreaById,
  getTeamById,
  refreshPageEffects,
} from "./main.js";
import { ARTICLES, AREAS } from "./data.js";

/* --------------------------------------------------------------------------
   Utilitários comuns
   -------------------------------------------------------------------------- */
function normalize(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function sortedArticles() {
  return [...ARTICLES].sort((a, b) => (a.date < b.date ? 1 : -1));
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

function articleSearchText(article) {
  const area = getAreaById(article.area);
  return normalize(
    [
      article.title,
      article.excerpt,
      article.intro,
      area ? area.title : "",
      ...article.sections.map((section) => `${section.title} ${(section.paragraphs || []).join(" ")} ${(section.list || []).join(" ")}`),
    ].join(" ")
  );
}

/* ==========================================================================
   PÁGINA: LISTA DE ARTIGOS
   ========================================================================== */
const listState = { area: "todos", query: "" };

/* Apenas as áreas com artigos publicados aparecem como filtro. Evita opções
   a zero e mantém a lista de temas útil à medida que o arquivo cresce. */
const PUBLISHED_AREAS = AREAS.filter((area) => ARTICLES.some((article) => article.area === area.id));

function areaCount(areaId) {
  const query = normalize(listState.query);
  return ARTICLES.filter((article) => {
    if (areaId !== "todos" && article.area !== areaId) return false;
    if (query && !articleSearchText(article).includes(query)) return false;
    return true;
  }).length;
}

function chipsMarkup() {
  const options = [
    { id: "todos", label: "Todos os temas" },
    ...PUBLISHED_AREAS.map((area) => ({ id: area.id, label: area.title })),
  ];
  return options
    .map(
      (option) => `<button class="chip" type="button" data-article-area="${option.id}" aria-pressed="${
        listState.area === option.id ? "true" : "false"
      }">${escapeHtml(option.label)} <span class="chip__count">${areaCount(option.id)}</span></button>`
    )
    .join("");
}

function articleRow(article) {
  const area = getAreaById(article.area);
  return `<article class="article-row reveal">
    <a class="article-row__link" href="artigo.html?id=${article.id}">
      <span class="article-row__area">${escapeHtml(area ? area.title : "Artigos")}</span>
      <span class="article-row__title">${escapeHtml(article.title)}</span>
      <span class="article-row__meta">
        <span>${formatDateShort(article.date)}</span>
        <span aria-hidden="true">·</span>
        <span>${article.readingTime} min</span>
        ${icon("arrow-right", 15)}
      </span>
    </a>
  </article>`;
}

function featureMarkup(article) {
  const area = getAreaById(article.area);
  const author = getTeamById(article.author);
  return `<article class="article-feature reveal">
    <div class="stack-m">
      <p class="article-row__area">Em destaque · ${escapeHtml(area ? area.title : "Artigos")}</p>
      <h2 class="article-feature__title">
        <a href="artigo.html?id=${article.id}">${escapeHtml(article.title)}</a>
      </h2>
      <p class="article-feature__excerpt">${escapeHtml(article.excerpt)}</p>
      <p class="article-row__meta">
        <span>${escapeHtml(author ? author.name : "Equipa do escritório")}</span>
        <span aria-hidden="true">·</span>
        <span>${formatDateShort(article.date)}</span>
        <span aria-hidden="true">·</span>
        <span>${article.readingTime} min de leitura</span>
      </p>
      <a class="link-arrow" href="artigo.html?id=${article.id}">Ler artigo completo ${icon("arrow-right", 16)}</a>
    </div>
    <figure class="article-feature__media">
      <!-- Substituir por imagem editorial própria (1600×1100), com direitos confirmados. -->
      <img src="images/lisbon-rooftops.webp" alt="Telhados de Lisboa ao final do dia" width="1200" height="800" loading="lazy" decoding="async">
    </figure>
  </article>`;
}

function resultsText(count) {
  const el = $("[data-articles-count]");
  if (!el) return;
  const parts = [`${count} ${count === 1 ? "artigo" : "artigos"}`];
  const area = AREAS.find((item) => item.id === listState.area);
  if (area) parts.push(area.title);
  if (listState.query.trim()) parts.push(`«${listState.query.trim()}»`);
  el.textContent = parts.join(" · ");
}

function syncUrl() {
  const params = new URLSearchParams();
  if (listState.area !== "todos") params.set("area", listState.area);
  if (listState.query.trim()) params.set("q", listState.query.trim());
  const search = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}${search ? `?${search}` : ""}`);
}

function renderArticleList() {
  const mount = $("[data-articles-list]");
  const featureMount = $("[data-articles-feature]");
  const chips = $("[data-article-chips]");
  if (!mount) return;

  const query = normalize(listState.query);
  const filtered = sortedArticles().filter((article) => {
    if (listState.area !== "todos" && article.area !== listState.area) return false;
    if (query && !articleSearchText(article).includes(query)) return false;
    return true;
  });

  const hasFilter = listState.area !== "todos" || Boolean(query);
  const featured = !hasFilter ? filtered[0] : null;
  const rest = featured ? filtered.slice(1) : filtered;

  if (featureMount) {
    featureMount.innerHTML = featured ? featureMarkup(featured) : "";
    featureMount.hidden = !featured;
  }

  if (rest.length) {
    mount.innerHTML = `<div class="article-rows">${rest.map(articleRow).join("")}</div>`;
  } else if (!featured) {
    const area = AREAS.find((item) => item.id === listState.area);
    const reasons = [
      listState.query.trim() ? `para «${escapeHtml(listState.query.trim())}»` : "",
      area ? `em ${escapeHtml(area.title)}` : "",
    ]
      .filter(Boolean)
      .join(" e ");
    mount.innerHTML = `<div class="empty-state" data-empty-state>
      <p class="title-s">Sem artigos ${reasons}</p>
      <p class="text-small">Experimente outro tema ou fale connosco: se a questão não estiver tratada, explicamos como a enquadrar.</p>
      <div class="cluster">
        <button class="btn btn--ghost btn--sm" type="button" data-articles-clear>Limpar filtros</button>
        <a class="btn btn--primary btn--sm" href="contactos.html">Pedir contacto</a>
      </div>
    </div>`;
  } else {
    mount.innerHTML = "";
  }

  if (chips) chips.innerHTML = chipsMarkup();
  resultsText(filtered.length);
  refreshPageEffects();
}

function initArticlesList() {
  const section = $("[data-articles-index]");
  if (!section) return;

  const params = new URLSearchParams(window.location.search);
  const areaParam = params.get("area");
  if (areaParam && PUBLISHED_AREAS.some((area) => area.id === areaParam)) listState.area = areaParam;
  if (params.get("q")) listState.query = params.get("q");

  const input = $("[data-articles-search]");
  if (input) {
    input.value = listState.query;
    const run = debounce(() => {
      listState.query = input.value;
      syncUrl();
      renderArticleList();
    }, 200);
    input.addEventListener("input", run);
    input.addEventListener("change", () => {
      if (input.value.trim()) track("pesquisa_artigos", { termo: input.value.trim() });
    });
    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && input.value) {
        input.value = "";
        listState.query = "";
        syncUrl();
        renderArticleList();
      }
    });
  }

  section.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-article-area]");
    if (chip) {
      listState.area = chip.dataset.articleArea;
      syncUrl();
      renderArticleList();
      if (listState.area !== "todos") track("filtro_artigos", { area: listState.area });
      return;
    }
    if (event.target.closest("[data-articles-clear]")) {
      listState.area = "todos";
      listState.query = "";
      if (input) input.value = "";
      syncUrl();
      renderArticleList();
      track("limpar_filtros_artigos", {});
    }
  });

  renderArticleList();
}

/* ==========================================================================
   PÁGINA: ARTIGO
   ========================================================================== */
function tocMarkup(article) {
  return `<div class="toc">
    ${article.sections
      .map(
        (section, index) => `<a href="#${section.id}" data-toc-link="${section.id}">
          <span class="toc__num">${String(index + 1).padStart(2, "0")}</span>
          <span>${escapeHtml(section.title)}</span>
        </a>`
      )
      .join("")}
  </div>`;
}

function articleBodyMarkup(article) {
  return `<div class="prose article-prose">
    <p class="prose-intro">${escapeHtml(article.intro)}</p>
    ${article.sections
      .map(
        (section) => `<section class="article-section" id="${section.id}" aria-labelledby="${section.id}-title">
        <h2 id="${section.id}-title">${escapeHtml(section.title)}</h2>
        ${(section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        ${
          section.list && section.list.length
            ? `<ul>${section.list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
            : ""
        }
      </section>`
      )
      .join("")}
  </div>`;
}

function articleAsideMarkup(article) {
  const area = getAreaById(article.area);
  return `<div class="card card--quiet">
    <div class="card__body">
      <p class="eyebrow">Neste artigo</p>
      <nav aria-label="Índice do artigo" data-toc>${tocMarkup(article)}</nav>
    </div>
  </div>
  <div class="card card--aside">
    <div class="card__body">
      <p class="eyebrow">Precisa de apoio?</p>
      <h2 class="title-m">O artigo é geral.<br>O seu caso é concreto.</h2>
      <p class="text-small">Se a situação se aplica a si, explicamos o enquadramento e os próximos passos, com honorários por escrito antes de avançar.</p>
      ${
        area
          ? `<a class="btn btn--primary btn--block" href="contactos.html?area=${area.id}">Pedir contacto ${icon("arrow-right", 16)}</a>`
          : `<a class="btn btn--primary btn--block" href="contactos.html">Pedir contacto ${icon("arrow-right", 16)}</a>`
      }
      <a class="btn btn--ghost btn--block" href="tel:+351215678901">${icon("phone", 16)} Ligar 21 567 89 01</a>
      <p class="content-note">Não envie documentos nem informação confidencial através do formulário.</p>
    </div>
  </div>`;
}

function authorBoxMarkup(article) {
  const author = getTeamById(article.author);
  if (!author) return "";
  return `<aside class="author-box" aria-label="Sobre o autor">
    <p class="eyebrow">Escrito por</p>
    <div class="author-box__inner">
      <div class="author-box__photo">
        <img src="${author.photo}" alt="" width="120" height="120" loading="lazy" decoding="async">
      </div>
      <div class="author-box__body">
        <p class="author-box__name"><a href="equipa.html#${author.id}">${escapeHtml(author.name)}</a></p>
        <p class="author-box__role">${escapeHtml(author.role)}</p>
        <p class="author-box__bio">${escapeHtml(author.bio)}</p>
        <a class="link-arrow" href="equipa.html#${author.id}">Ver perfil ${icon("arrow-right", 15)}</a>
      </div>
    </div>
  </aside>`;
}

function relatedMarkup(article) {
  const related = (article.related || []).map(getArticleById).filter(Boolean);
  if (!related.length) return "";
  return `<section class="section section--warm" aria-labelledby="relacionados-title">
    <div class="container">
      <div class="section-head section-head--split">
        <div class="stack-s">
          <p class="eyebrow">Leitura relacionada</p>
          <h2 class="title-l" id="relacionados-title">Outros artigos sobre temas próximos</h2>
        </div>
        <div class="section-head__aside">
          <a class="link-arrow" href="artigos.html">Todos os artigos ${icon("arrow-right", 16)}</a>
        </div>
      </div>
      <div class="related-grid mt-l">
        ${related.map(articleCard).join("")}
      </div>
    </div>
  </section>`;
}

function renderArticleNotFound() {
  const hero = $("[data-article-hero]");
  const body = $("[data-article-body]");
  const related = $("[data-article-related]");
  const cta = $("[data-article-cta]");
  const progress = $("[data-progress]");
  const title = "Artigo não encontrado — Mendes Valadares & Associados";
  const description =
    "O artigo pedido não existe ou foi movido. Consulte os artigos informativos do escritório Mendes Valadares & Associados, em Lisboa.";
  document.title = title;
  setMeta("robots", "noindex, follow");
  setMeta("description", description);
  setSocialMeta(title, description, "https://mendes-valadares.vercel.app/artigos.html", "website");
  if (progress) {
    const track = progress.closest(".progress-track");
    (track || progress).remove();
  }
  if (hero) {
    hero.innerHTML = `<div class="container">
      <div class="article-hero__inner">
        <nav class="crumbs" aria-label="Caminho">
          <a href="index.html">Início</a>
          <span class="crumbs__sep" aria-hidden="true">/</span>
          <a href="artigos.html">Artigos</a>
          <span class="crumbs__sep" aria-hidden="true">/</span>
          <span aria-current="page">Artigo não encontrado</span>
        </nav>
        <p class="eyebrow">Erro 404</p>
        <h1 class="article-hero__title">Não encontrámos este artigo.</h1>
        <p class="article-hero__excerpt">O endereço pode estar incompleto ou o artigo foi movido. Consulte a lista de artigos ou fale connosco — encaminhamos a sua questão para a área certa.</p>
        <div class="cluster mt-s">
          <a class="btn btn--primary" href="artigos.html">Ver todos os artigos</a>
          <a class="btn btn--ghost" href="contactos.html">Pedir contacto</a>
        </div>
      </div>
    </div>`;
  }
  if (body) body.remove();
  if (related) related.remove();
  if (cta) cta.remove();
}

function initArticleDetail() {
  const page = $("[data-article-page]");
  if (!page) return;

  const article = getArticleById(getParam("id"));
  if (!article) {
    renderArticleNotFound();
    return;
  }

  const area = getAreaById(article.area);
  const author = getTeamById(article.author);
  const hero = $("[data-article-hero]");
  const main = $("[data-article-main]");
  const aside = $("[data-article-aside]");
  const related = $("[data-article-related]");
  const cta = $("[data-article-cta]");

  const title = `${article.metaTitle || article.title} | Mendes Valadares`;
  const canonicalUrl = `https://mendes-valadares.vercel.app/artigo.html?id=${article.id}`;
  document.title = title;
  setMeta("description", article.excerpt);
  setSocialMeta(title, article.excerpt, canonicalUrl, "article");
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", canonicalUrl);

  if (hero) {
    hero.innerHTML = `<div class="container">
      <div class="article-hero__inner">
        <nav class="crumbs" aria-label="Caminho">
          <a href="index.html">Início</a>
          <span class="crumbs__sep" aria-hidden="true">/</span>
          <a href="artigos.html">Artigos</a>
          <span class="crumbs__sep" aria-hidden="true">/</span>
          <span aria-current="page">Artigo</span>
        </nav>
        <p class="eyebrow">${escapeHtml(area ? area.title : "Artigo")}</p>
        <h1 class="article-hero__title">${escapeHtml(article.title)}</h1>
        <p class="article-hero__excerpt">${escapeHtml(article.excerpt)}</p>
        <p class="article-hero__meta">
          ${author ? `<span>Por <a href="equipa.html#${author.id}">${escapeHtml(author.name)}</a></span>` : "<span>Equipa do escritório</span>"}
          <span aria-hidden="true">·</span>
          <span><time datetime="${article.date}">${formatDate(article.date)}</time></span>
          <span aria-hidden="true">·</span>
          <span>${article.readingTime} min de leitura</span>
        </p>
      </div>
    </div>`;
  }

  if (main) main.innerHTML = `${articleBodyMarkup(article)}${authorBoxMarkup(article)}`;
  if (aside) aside.innerHTML = articleAsideMarkup(article);
  if (related) related.outerHTML = relatedMarkup(article);
  if (cta && area) {
    cta.innerHTML = `<div class="ornament ornament--cta" data-ornament="arches" aria-hidden="true"></div>
      <div class="container cta-band__inner">
        <div class="stack-m">
          <p class="eyebrow">Próximo passo</p>
          <h2 class="cta-band__title">Tem uma questão sobre<br>${escapeHtml(area.title)}?</h2>
          <p class="lead">Descreva-nos a situação em poucas linhas. Entramos em contacto no prazo de 1 dia útil, em português, inglês, francês ou espanhol.</p>
        </div>
        <div class="cta-band__actions">
          <a class="btn btn--primary" href="contactos.html?area=${area.id}">Pedir contacto</a>
          <a class="btn btn--ghost" href="tel:+351215678901">Ligar 21 567 89 01</a>
        </div>
      </div>`;
  }

  // Dados estruturados do artigo
  injectStructuredData({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://mendes-valadares.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Artigos", item: "https://mendes-valadares.vercel.app/artigos.html" },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://mendes-valadares.vercel.app/artigo.html?id=${article.id}`,
      },
    ],
  });
  injectStructuredData({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "pt-PT",
    articleSection: area ? area.title : "Artigos",
    image: "https://mendes-valadares.vercel.app/images/og-image.jpg",
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          jobTitle: author.role,
          url: `https://mendes-valadares.vercel.app/equipa.html#${author.id}`,
          worksFor: { "@id": "https://mendes-valadares.vercel.app/#escritorio" },
        }
      : { "@type": "Organization", name: "Mendes Valadares & Associados" },
    publisher: {
      "@type": "Organization",
      "@id": "https://mendes-valadares.vercel.app/#escritorio",
      name: "Mendes Valadares & Associados, Sociedade de Advogados",
      logo: { "@type": "ImageObject", url: "https://mendes-valadares.vercel.app/images/og-image.jpg" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mendes-valadares.vercel.app/artigo.html?id=${article.id}`,
    },
    about: area ? { "@type": "Thing", name: area.title } : undefined,
    wordCount: article.sections.reduce(
      (total, section) => total + (section.paragraphs || []).join(" ").split(/\s+/).length,
      0
    ),
  });

  // Índice ativo durante a leitura
  const links = Array.from(document.querySelectorAll("[data-toc-link]"));
  const headings = Array.from(document.querySelectorAll(".article-section"));
  if (links.length && headings.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => link.classList.toggle("is-active", link.dataset.tocLink === entry.target.id));
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    headings.forEach((heading) => observer.observe(heading));
  }

  if (main) refreshPageEffects();
  track("vista_artigo", { artigo: article.id });
}

/* --------------------------------------------------------------------------
   Inicialização
   -------------------------------------------------------------------------- */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initArticlesList();
    initArticleDetail();
  });
} else {
  initArticlesList();
  initArticleDetail();
}
