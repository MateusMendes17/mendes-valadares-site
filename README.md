# Mendes Valadares & Associados — site institucional

Site institucional estático para uma sociedade de advogados em Lisboa. O objetivo principal é apresentar a equipa e as áreas de atuação e facilitar pedidos de contacto ou marcações de reunião, sem prometer resultados e sem recolher informação confidencial através do site.

> **Pré-visualização publicada:** [mendes-valadares.vercel.app](https://mendes-valadares.vercel.app)
>
> **Repositório:** [github.com/MateusMendes17/mendes-valadares-site](https://github.com/MateusMendes17/mendes-valadares-site) (privado)
>
> Esta publicação é uma pré-visualização técnica. As imagens continuam provisórias e as páginas legais mantêm marcadores por preencher e notas de revisão. Não deve ser tratada como o lançamento público definitivo do escritório.

- HTML5 semântico, CSS3 e JavaScript modular (ES modules), sem frameworks nem processo de build.
- Conteúdo editorial centralizado em `js/data.js`.
- Imagens e tipografia alojadas localmente.
- Formulários, agenda e confirmações simulados no browser.
- Site integralmente em português de Portugal.

## 1. Abrir e testar localmente

Os módulos JavaScript não funcionam através de `file://`. É necessário servir a pasta com um servidor HTTP simples.

```powershell
cd "C:\caminho\para\Escritorios de Advogados"
python -m http.server 8123 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:8123/` no browser. Também pode ser usado `npx serve .` ou qualquer servidor estático.

Não é necessário instalar dependências, compilar Sass ou executar bundlers. Basta publicar os ficheiros finais num alojamento estático com HTTPS.

## 2. Estrutura

```text
.
├── index.html                 Página inicial
├── areas-de-atuacao.html      Índice das oito áreas
├── area.html                  Detalhe de área (?id=...)
├── equipa.html                Equipa e perfis
├── sobre.html                 O escritório, princípios e visita
├── artigos.html               Índice de artigos
├── artigo.html                Artigo (?id=...)
├── contactos.html             Contactos, formulários e mapa
├── privacidade.html           Política de privacidade (minuta)
├── cookies.html               Política de cookies (minuta)
├── aviso-legal.html           Aviso legal (minuta)
├── css/
│   ├── fonts.css              Declaração das fontes locais
│   └── style.css              Sistema de design e estilos das páginas
├── fonts/                     DM Sans (woff2) e licença SIL OFL
├── images/                    Retratos, fotografia urbana, ícones e OG image
├── js/
│   ├── data.js                TODO o conteúdo editável
│   ├── main.js                Header, footer, cookies, modais, cartões e efeitos
│   ├── areas.js               Página de área e estado 404
│   ├── articles.js            Lista e detalhe de artigos
│   ├── team.js                Cartões e perfis da equipa
│   └── contact.js             Validação, horários, prefill e confirmações
├── sitemap.xml
├── robots.txt
├── vercel.json                Cabeçalhos de segurança e cache para a Vercel
└── .gitignore
```

As páginas `area.html` e `artigo.html` são templates: o conteúdo é escolhido pelo parâmetro `?id=`. Os endereços canónicos e os metadados Open Graph/Twitter são atualizados por JavaScript consoante o conteúdo.

## 3. Onde editar o conteúdo

### 3.1. `js/data.js`

Este é o ficheiro principal de edição. Está dividido em seis blocos.

| Exportação | O que contém |
| --- | --- |
| `SITE` | Nome, sociedade, endereço, coordenadas, horário, telefones, email, WhatsApp, LinkedIn, línguas e dados legais. |
| `NAV` | Itens da navegação principal e do rodapé. |
| `CLIENT_TYPES` | Etiquetas de cliente usadas nas áreas: particulares, empresas, internacional. |
| `FAQ` | Perguntas frequentes da página inicial. |
| `AREAS` | As oito áreas de atuação, com situações, processo, equipa, FAQs e artigos relacionados. |
| `TEAM` | Os cinco advogados, com biografia curta e completa, áreas, línguas, fotografia e cédula. |
| `ARTICLES` | Os seis artigos, com excerpt, introdução, secções, listas e relações. |

Regras práticas:

- **Novo advogado:** acrescentar um objeto a `TEAM`, com `id` único, `photo` em `images/`, `areas` com IDs existentes de `AREAS`, `languages`, `bio` e `fullBio`. O cartão e o modal são gerados automaticamente; a página inicial passa a mostrar todos os membros.
- **Nova área:** acrescentar um objeto a `AREAS`, atualizar a numeração `01`–`08` se necessário e criar uma imagem própria se a área tiver destaque visual. Atualizar `sitemap.xml`.
- **Novo artigo:** acrescentar um objeto a `ARTICLES` com `id` único, `area`, `author` (ID de `TEAM`), `date` em formato `AAAA-MM-DD`, `readingTime`, `excerpt`, `intro`, `sections` e `related`. Usar `metaTitle` quando o título completo for demasiado longo para o `<title>` (o limite prático é cerca de 60–65 caracteres com o sufixo da marca). Atualizar `sitemap.xml`.
- **Mudança de contactos:** atualizar `SITE.phone`, `SITE.mobile`, `SITE.email`, `SITE.address` e `SITE.hours`. Verificar também os textos estáticos de `contactos.html`, `sobre.html` e das páginas legais, onde possam existir referências duplicadas.
- **Domínio:** substituir `https://mendes-valadares.vercel.app` em `SITE.domain`, nos canónicos e metadados das páginas HTML, no `sitemap.xml` e no `robots.txt`.

### 3.2. Páginas HTML

Os textos institucionais que não são repetidos em cartões — hero da página inicial, apresentação do escritório, princípios, contacto, notas legais — estão diretamente nos ficheiros HTML. Os blocos repetidos (header, footer, banner de cookies, botões flutuantes e barra móvel) são injetados por `js/main.js`.

Ao alterar uma página:

- manter um único `<h1>`;
- manter a hierarquia de headings (`h1` → `h2` → `h3`);
- atualizar `<title>`, `meta description`, `og:title`, `og:description`, `og:url` e `canonical`;
- atualizar o JSON-LD quando os dados estruturados mudarem;
- usar texto alternativo descritivo em imagens com conteúdo informativo e `alt=""` em imagens decorativas.

### 3.3. Imagens

As imagens atuais são provisórias e servem para validar composição e paleta. Antes da publicação definitiva:

1. Substituir as fotografias por imagens próprias ou com licença confirmada.
2. Manter o formato WebP ou AVIF, com fallback se necessário.
3. Manter as proporções indicadas nos comentários HTML (hero 4:5, retratos 4:5, artigo 3:2).
4. Comprimir os ficheiros e confirmar que os retratos têm tratamento monocromático coerente.
5. Atualizar `og-image.jpg` (1200×630) e o texto alternativo de `og:image:alt`.
6. Confirmar os direitos de utilização e arquivar as autorizações. As imagens de banco não devem ser apresentadas como fotografias reais do escritório ou da equipa.

A fotografia principal é carregada com `fetchpriority="high"`; as restantes usam `loading="lazy"` e `decoding="async"`.

### 3.4. Tipografia

DM Sans (títulos e texto, com pesos 300–700 e eixo óptico) está em `fonts/` e é declarada em `css/fonts.css`. Os ficheiros normais e itálicos cobrem latin e latin-ext. A licença SIL Open Font License está incluída em `fonts/OFL.txt`.

## 4. O que está simulado

Esta versão não tem backend, base de dados nem envio real de email.

- **Formulário de contacto:** valida no browser, mostra erros acessíveis e gera uma confirmação local com a frase «Entraremos em contacto no prazo de 1 dia útil». Nenhum dado é enviado para o servidor.
- **Marcação de reunião:** valida o dia (segunda a sexta, sem datas passadas), apresenta slots de 30 minutos entre as 09:00 e as 18:30 (último início às 18:00) e gera uma confirmação local. A reunião não fica reservada.
- **Cookies:** a escolha é guardada em `localStorage` com a chave `mv-cookie-consent-v1`. O banner pode ser reaberto em «Preferências de cookies».
- **Mapa:** o iframe do Google Maps só é inserido depois de o visitante clicar em «Carregar mapa Google». Esse clique carrega conteúdo de terceiros e pode permitir a recolha de dados pelo Google.
- **Analytics:** `track()` só emite eventos quando o visitante escolhe «Aceitar todos» e existe um serviço configurado (`plausible` ou `gtag`). Sem serviço, os eventos ficam inertes.
- **WhatsApp:** o botão flutuante aparece em desktop. Em mobile, o mesmo link está no menu, no rodapé e nos contactos diretos, para não tapar conteúdo.

As confirmações simuladas não devem ser apresentadas como confirmação de contratação, de mandato ou de disponibilidade. O texto atual já distingue pedido de reunião de reunião confirmada.

## 5. Ligar formulários e agenda a serviços reais

Antes de ativar qualquer serviço, decidir quem é o responsável pelo tratamento, qual a base jurídica, o prazo de conservação e quem tem acesso aos dados. O envio de informação através do site não constitui, por si só, um mandato e não deve ser usado para documentos ou factos confidenciais.

### 5.1. Formspree

O ponto de integração está em `js/contact.js`, no `submit` de cada formulário, onde atualmente existe `window.setTimeout(...)`.

1. Criar um formulário no Formspree e obter o endpoint `https://formspree.io/f/XXXXXXXX`.
2. Substituir a simulação por um `fetch` com `POST` JSON e `Accept: application/json`.
3. Em caso de erro HTTP, voltar a ativar o botão, mostrar uma mensagem de erro e não apresentar a confirmação.
4. Ativar proteção anti-spam, limite de pedidos e notificações para uma caixa monitorizada.
5. Não ativar uploads de ficheiros. Se forem necessários documentos, criar primeiro um canal seguro e uma política de conservação.
6. Celebrar o acordo de tratamento de dados (DPA) com o fornecedor e confirmar as transferências internacionais. O Formspree está sediado nos EUA; pode exigir cláusulas contratuais-tipo e uma avaliação de impacto.

Exemplo genérico (adaptar ao resultado da validação já existente):

```js
const response = await fetch("https://formspree.io/f/XXXXXXXX", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    ...result.values,
    _subject: "Novo pedido de contacto — site",
  }),
});

if (!response.ok) {
  throw new Error("Falha no envio");
}
```

A mensagem continua a ser texto livre: mantém o aviso visível «Não envie documentos nem informação confidencial através deste formulário» e não acrescentes campos de diagnóstico jurídico, números de processo ou dados de saúde.

### 5.2. EmailJS

O EmailJS funciona no browser e expõe a chave pública no código. Se for escolhido:

- restringir o domínio autorizado no painel do EmailJS;
- usar um template que envie apenas os campos estritamente necessários;
- não incluir documentos, anexos ou dados de menores;
- tratar o serviço como subcontratante e refleti-lo na política de privacidade;
- aceitar que a chave pública pode ser copiada e abusada, pelo que devem existir limites e monitorização.

Para um escritório de advogados, um endpoint próprio com autenticação, registo de acessos e retenção controlada é geralmente preferível a um serviço genérico no browser.

### 5.3. Calendly

A marcação atual é simulada. Para usar Calendly:

1. Criar um tipo de evento «Reunião inicial» com a duração de 30 minutos e disponibilidade dentro do horário do escritório.
2. Incorporar o widget ou disponibilizar o link, mantendo um fallback telefónico.
3. Não colocar no evento o motivo detalhado, o nome de terceiros ou informação de processos. Usar apenas nome, email e um campo neutro de área.
4. Atualizar a política de cookies e a política de privacidade: o Calendly instala cookies e trata dados como subcontratante.
5. Obter consentimento para o carregamento do widget, tal como acontece com o mapa, e permitir recusar.
6. Confirmar o DPA, as transferências internacionais e o prazo de conservação.

### 5.4. Checklist de RGPD e sigilo profissional

- [ ] Finalidade e base jurídica identificadas para cada formulário.
- [ ] Aviso de privacidade junto ao formulário, não apenas no rodapé.
- [ ] Consentimento separado para cookies não essenciais; nada carregado antes da escolha.
- [ ] Fornecedores e subcontratantes listados na política de privacidade.
- [ ] DPA, medidas de segurança e transferências internacionais revistos.
- [ ] Prazo de conservação definido e aplicado tecnicamente.
- [ ] Acesso aos pedidos limitado a quem precisa de os tratar.
- [ ] Nenhum documento ou informação confidencial é pedido pelo site.
- [ ] Pedidos de exercício de direitos têm um canal e um responsável.
- [ ] Revisão por jurista e, se necessário, avaliação de impacto.
- [ ] O dever de sigilo profissional é compatível com os fornecedores escolhidos.

## 6. Dados legais a preencher

As páginas legais são minutas de trabalho e não substituem revisão jurídica. Antes de publicar, procurar por parênteses retos em todo o projeto (por exemplo, `[NIF]` ou `[N.º]`) e preencher:

| Marcador | Onde aparece | O que confirmar |
| --- | --- | --- |
| `[N.º SOCIEDADE]` | `js/data.js`, `sobre.html`, `privacidade.html`, `aviso-legal.html` | Número de inscrição da sociedade na Ordem dos Advogados. |
| `[NIF]` | `js/data.js`, `privacidade.html`, `aviso-legal.html` | NIF da sociedade. |
| `[N.º]` (cinco ocorrências) | `js/data.js`, campo `cedula` de cada advogado | Cédula profissional de cada advogado. |
| `[FORNECEDOR DE ALOJAMENTO]` | `privacidade.html` | Alojamento web, localização dos servidores e DPA. |
| `[FORNECEDOR DE EMAIL]` | `privacidade.html` | Correio eletrónico profissional e DPA. |
| `[FORNECEDOR]` | nota de revisão da privacidade | Substituir pela designação concreta do fornecedor. |
| `[ANALYTICS_COOKIE]` | `cookies.html` | Nome, fornecedor, finalidade e duração do cookie de analítica, se for ativado. |
| `[A definir]` | `cookies.html` | Prazo de conservação a confirmar. |
| `[SEGURADORA]`, `[N.º APÓLICE]`, `[ÂMBITO TERRITORIAL]`, `[PERÍODO]` | `aviso-legal.html` | Seguro de responsabilidade civil profissional. |

Confirmar também:

- denominação social completa, forma jurídica, sede e capital social, se aplicável;
- inscrição na Ordem dos Advogados e referência ao Estatuto da Ordem dos Advogados;
- seguro de responsabilidade civil profissional e âmbito territorial;
- regras de publicidade, incluindo a proibição de promessas de resultado e de publicidade comparativa;
- política de conflitos de interesses e condições de aceitação de novos assuntos;
- tratamento de reclamações e ligação ao Livro de Reclamações;
- textos de privacidade, cookies e aviso legal revistos por jurista;
- inexistência de testemunhos, casos divulgados, valores de indemnização ou resultados prometidos.

As páginas legais já incluem uma nota de revisão visível. Essa nota deve ser removida apenas depois da validação final.

## 7. SEO, metadados e publicação

- Cada página tem `<title>`, `meta description`, `canonical`, Open Graph e Twitter Card próprios.
- As páginas de área e de artigo atualizam título, descrição, canónico, OG/Twitter e JSON-LD em função do `id`.
- Os estados 404 usam `noindex, follow` e apontam para o índice correto.
- `sitemap.xml` contém as páginas estáticas, as oito áreas e os seis artigos. Ao acrescentar conteúdo, atualizar as datas e os URLs.
- `robots.txt` aponta para o sitemap; confirmar o domínio final.
- Publicar com HTTPS, redirecionar HTTP para HTTPS e garantir que os URLs `.html` são servidos diretamente.
- Confirmar que `images/og-image.jpg` existe e que o domínio de `og:image` corresponde ao domínio publicado.
- Se for adicionada uma versão em inglês, criar URLs próprios, `hreflang` recíproco e metadados próprios. O seletor PT/EN não faz parte desta entrega.

### 7.1. Publicação atual

- **Produção:** `https://mendes-valadares.vercel.app`
- **Repositório:** `https://github.com/MateusMendes17/mendes-valadares-site` (privado)
- **Plataforma:** Vercel, projeto `mendes-valadares`, sem build. A Vercel serve os ficheiros estáticos diretamente.
- **Configuração:** `vercel.json` acrescenta cabeçalhos de segurança e cache para `fonts/` e `images/`; `.vercel/` e `.env*` estão excluídos do Git.
- **Proteção de deployment:** a autenticação Vercel foi desativada para o domínio de produção, para que o site seja público.
- **Domínio:** o canónico, o sitemap e o `robots.txt` apontam para o URL de pré-visualização da Vercel. Ao ligar o domínio definitivo, substituir `https://mendes-valadares.vercel.app` em `SITE.domain`, nos canónicos/OG das páginas, nos scripts de detalhe (`js/areas.js`, `js/articles.js`), no `sitemap.xml` e no `robots.txt`.

Para voltar a publicar depois de alterações locais:

```powershell
vercel --prod
```

O projeto está ligado ao repositório `mendes-valadares-site`; cada `push` para `main` cria um novo deployment de produção. Confirmar que o domínio de produção e as variáveis de ambiente estão configurados no painel da Vercel.

## 8. Acessibilidade e qualidade

O site inclui:

- skip link para `#conteudo`, foco visível e navegação por teclado;
- menu mobile com gestão de foco, `Escape` e foco devolvido ao botão;
- tabs de contacto com semântica ARIA e navegação por setas;
- acordeões com `aria-expanded` e regiões controladas;
- modais de perfil com foco contido, fecho por `Escape` e devolução de foco;
- mensagens de erro associadas aos campos e confirmações anunciadas;
- `prefers-reduced-motion` respeitado;
- contraste revisto e imagens decorativas marcadas corretamente;
- mapa carregado apenas por ação do visitante.

Antes de publicar, repetir testes manuais com teclado, leitor de ecrã (VoiceOver/NVDA), zoom a 200% e browsers atuais. Os testes automáticos não substituem a revisão de conteúdo jurídico nem a validação com utilizadores.

## 9. Checklist final

- [ ] Substituir fotografias provisórias e confirmar direitos.
- [ ] Preencher todos os dados legais e remover as notas de revisão.
- [ ] Revisão por jurista das três páginas legais.
- [ ] Confirmar morada, telefones, email, horário e LinkedIn.
- [ ] Decidir se os formulários ficam simulados ou ligados a um serviço real.
- [ ] Se houver serviço real, atualizar privacidade, cookies, DPA e prazos de conservação.
- [ ] Substituir o domínio de exemplo em todos os canónicos, sitemap e robots.
- [ ] Confirmar que nenhuma página promete resultados ou divulga casos.
- [ ] Testar formulários, agenda, menu, cookies e mapa em desktop e mobile.
- [ ] Confirmar HTTPS, cache, compressão e cópias de segurança no alojamento.
