/* ==========================================================================
   MENDES VALADARES & ASSOCIADOS — Dados do site
   --------------------------------------------------------------------------
   Todo o conteúdo editável está neste ficheiro: dados do escritório,
   navegação, áreas de atuação, equipa, artigos e perguntas frequentes.
   Não é necessário tocar no HTML para atualizar textos.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. DADOS GERAIS DO ESCRITÓRIO
   -------------------------------------------------------------------------- */
export const SITE = {
  name: "Mendes Valadares & Associados",
  legalName: "Mendes Valadares & Associados, Sociedade de Advogados",
  shortName: "MV & Associados",
  monogram: "MV",
  tagline: "Rigor jurídico, acompanhamento próximo.",
  founded: 2008,
  domain: "https://mendes-valadares.vercel.app",
  description:
    "Sociedade de advogados em Lisboa, desde 2008. Acompanhamento próximo em Direito Civil, Família e Sucessões, Imobiliário, Trabalho, Comercial, Penal, Administrativo e Fiscal, e Imigração.",
  address: {
    street: "Avenida da Liberdade, 202, 4.º Esq.",
    postal: "1250-147",
    city: "Lisboa",
    country: "Portugal",
    full: "Avenida da Liberdade, 202, 4.º Esq., 1250-147 Lisboa",
  },
  coords: { lat: "38.7223", lng: "-9.1457" },
  hours: {
    label: "Segunda a Sexta, 9h00–18h30",
    weekdays: [1, 2, 3, 4, 5],
    openMinutes: 9 * 60,
    closeMinutes: 18 * 60 + 30,
    note: "Reuniões presenciais e por videochamada, com marcação prévia.",
  },
  phone: { display: "21 567 89 01", tel: "+351215678901" },
  mobile: { display: "915 678 901", tel: "+351915678901" },
  email: "geral@mvadvogados.pt",
  whatsapp:
    "https://wa.me/351915678901?text=Ol%C3%A1%2C%20gostaria%20de%20pedir%20informa%C3%A7%C3%B5es%20sobre%20os%20vossos%20servi%C3%A7os.",
  linkedin: "https://www.linkedin.com/company/mendes-valadares-associados",
  languages: ["Português", "Inglês", "Francês", "Espanhol"],
  // Placeholders a preencher antes de publicar (ver README.md)
  legal: {
    societyRegistration: "n.º [N.º SOCIEDADE]",
    nif: "[NIF]",
    complaintsBook: "https://www.livroreclamacoes.pt/",
  },
  // Frase de enquadramento usada em todas as páginas de conteúdo
  contentNote:
    "A informação disponibilizada tem caráter geral e não substitui aconselhamento jurídico específico.",
};

/* --------------------------------------------------------------------------
   2. NAVEGAÇÃO PRINCIPAL
   -------------------------------------------------------------------------- */
export const NAV = [
  { label: "Início", href: "index.html" },
  { label: "Áreas de atuação", href: "areas-de-atuacao.html" },
  { label: "Equipa", href: "equipa.html" },
  { label: "Sobre", href: "sobre.html" },
  { label: "Artigos", href: "artigos.html" },
  { label: "Contactos", href: "contactos.html" },
];

export const CLIENT_TYPES = [
  { id: "particulares", label: "Particulares" },
  { id: "empresas", label: "Empresas" },
  { id: "internacional", label: "Internacional" },
];

/* --------------------------------------------------------------------------
   3. PERGUNTAS FREQUENTES GERAIS
   -------------------------------------------------------------------------- */
export const FAQ = [
  {
    id: "honorarios",
    question: "Como são calculados os honorários?",
    answer:
      "Os honorários dependem do tipo de assunto, da sua complexidade e do tempo estimado de acompanhamento. Depois de analisarmos o caso, apresentamos uma proposta escrita com os valores e a forma de pagamento, antes de iniciarmos qualquer trabalho. Sempre que o assunto o permita, trabalhamos com valor fixo por fase ou com avença mensal.",
  },
  {
    id: "duracao",
    question: "Quanto tempo demora um processo?",
    answer:
      "Não é possível indicar um prazo único. Assuntos de natureza contratual ou de sociedades resolvem-se, em regra, em semanas; processos judiciais e procedimentos administrativos seguem os prazos dos tribunais e das entidades competentes. Na primeira reunião explicamos as fases previsíveis e os fatores que podem alterar o calendário.",
  },
  {
    id: "primeira-reuniao",
    question: "O que devo levar à primeira reunião?",
    answer:
      "Leve os documentos que ajudem a compreender o assunto: contratos, correspondência relevante, decisões ou notificações recebidas e, quando exista, identificação das partes envolvidas. Se não tiver tudo reunido, não é impedimento: começamos pelo relato dos factos e indicamos depois o que falta.",
  },
  {
    id: "confidencialidade",
    question: "O que digo é confidencial?",
    answer:
      "Sim. A relação com o advogado está protegida pelo dever de sigilo profissional, mesmo antes de existir contrato ou qualquer pagamento. Só partilhamos informação com terceiros com o seu acordo expresso ou quando a lei o impõe, e a equipa interna está igualmente vinculada a esse dever.",
  },
  {
    id: "linguagens",
    question: "Atendem clientes que não falam português?",
    answer:
      "Sim. O escritório atende em português, inglês, francês e espanhol. Podemos reunir por videochamada e preparar documentação em língua inglesa quando é necessário partilhá-la com entidades ou profissionais no estrangeiro.",
  },
  {
    id: "videochamada",
    question: "É possível reunir por videochamada?",
    answer:
      "Sim. As reuniões podem ser presenciais, na Avenida da Liberdade, ou por videochamada, na plataforma que preferir. Marcamos por telefone, por email ou através do formulário de marcação de reunião, e enviamos confirmação com as indicações de acesso.",
  },
  {
    id: "custo-inicial",
    question: "A primeira reunião tem custo?",
    answer:
      "A primeira conversa de enquadramento é sem custos e serve para perceber se podemos ajudar. Caso o assunto exija um estudo mais aprofundado ou parecer escrito antes de qualquer proposta, informamos previamente do valor desse trabalho.",
  },
];

/* --------------------------------------------------------------------------
   4. ÁREAS DE ATUAÇÃO
   -------------------------------------------------------------------------- */
export const AREAS = [
  {
    id: "direito-civil-contratos",
    number: "01",
    title: "Direito Civil e Contratos",
    short: "Contratos, responsabilidade civil e cobrança de dívidas.",
    keywords: ["contratos", "responsabilidade civil", "cobrança de dívidas", "incumprimento", "danos"],
    clients: ["particulares", "empresas"],
    intro: [
      "Acompanhamos a celebração, a revisão e o incumprimento de contratos, assim como os pedidos de indemnização por danos. É uma área do dia a dia: compras e vendas, prestação de serviços, empréstimos entre particulares, arrendamentos e negócios entre empresas.",
      "Quando o acordo já não é cumprido, analisamos as alternativas — negociação, mediação ou ação judicial — e explicamos os custos, os prazos e os riscos de cada caminho antes de avançar.",
    ],
    situations: [
      {
        title: "Revisão e celebração de contratos",
        text: "Elaboração ou revisão de contratos de compra e venda, prestação de serviços, empreitada, comodato, mútuo ou contratos atípicos, com identificação prévia dos riscos relevantes para cada parte.",
      },
      {
        title: "Incumprimento contratual",
        text: "Análise de responsabilidade, interpelação da contraparte, resolução do contrato e pedidos de indemnização por danos emergentes e lucros cessantes.",
      },
      {
        title: "Responsabilidade civil",
        text: "Apoio a quem sofreu danos e defesa de quem é responsabilizado, em acidentes, defeitos de obra, danos em imóveis e responsabilidade profissional.",
      },
      {
        title: "Cobrança de dívidas",
        text: "Interpelação formal, negociação de planos de pagamento, injunção e ação declarativa ou executiva, com avaliação prévia da viabilidade e dos custos.",
      },
      {
        title: "Contratos entre particulares",
        text: "Empréstimos, acordos de pagamento, contratos de comodato e negócios relacionados com bens de família.",
      },
      {
        title: "Litígios em tribunal",
        text: "Representação em ações cíveis, procedimentos cautelares e execuções, com comunicação regular sobre o andamento do processo.",
      },
    ],
    process: [
      { title: "Primeiro contacto", text: "Reunimos os factos, os documentos disponíveis e os prazos relevantes." },
      { title: "Análise e proposta", text: "Explicamos as opções, com estimativa de custos e de duração, e apresentamos honorários por escrito." },
      { title: "Acompanhamento", text: "Conduzimos as diligências acordadas e informamos regularmente sobre cada passo." },
      { title: "Encerramento", text: "Concluído o assunto, entregamos um resumo final e os documentos relevantes." },
    ],
    team: ["antonio-mendes", "pedro-carvalhosa"],
    faqs: [
      {
        q: "Vale a pena ir a tribunal por uma dívida de valor reduzido?",
        a: "Depende do valor, das provas disponíveis e da capacidade de pagamento do devedor. Numa primeira análise verificamos se existem títulos que permitam um procedimento mais simples e se os custos previsíveis são proporcionais ao que se pretende recuperar.",
      },
      {
        q: "É possível resolver um litígio sem tribunal?",
        a: "Sim. Em muitos casos a negociação direta, a mediação ou a intervenção de um terceiro neutral permitem chegar a acordo com menos tempo e menos custos. Avaliamos essa via antes de propor uma ação judicial.",
      },
      {
        q: "O contrato que assinei pode ser alterado?",
        a: "Só com acordo das partes, salvo nos casos previstos na lei — por exemplo, alteração das circunstâncias ou cláusulas contratuais gerais desequilibradas. Analisamos o contrato concreto e explicamos o que é possível pedir e com que fundamento.",
      },
    ],
    articles: ["constituir-empresa-quotas-ou-unipessoal"],
  },
  {
    id: "direito-familia-sucessoes",
    number: "02",
    title: "Direito da Família e Sucessões",
    short: "Divórcio, responsabilidades parentais, heranças e testamentos.",
    keywords: ["divórcio", "responsabilidades parentais", "herança", "testamento", "partilha", "pensão"],
    clients: ["particulares", "internacional"],
    intro: [
      "Acompanhamos decisões importantes da vida familiar com discrição e sem dramatizar o conflito. Divórcio, regulação das responsabilidades parentais, alteração de pensões, partilhas e heranças são tratados com o cuidado que a matéria exige.",
      "Sempre que existem filhos, o nosso trabalho orienta-se para que as decisões sejam estáveis e compreensíveis para todos. Explicamos o que a lei determina, o que pode ser negociado e o que fica sujeito a decisão judicial.",
    ],
    situations: [
      {
        title: "Divórcio e separação",
        text: "Divórcio por mútuo acordo, incluindo acordo de partilha e de regulação parental, e divórcio sem consentimento do outro cônjuge.",
      },
      {
        title: "Responsabilidades parentais",
        text: "Regulação do exercício das responsabilidades parentais, residência habitual da criança, pensão de alimentos e regime de convívios.",
      },
      {
        title: "Alteração de decisões",
        text: "Pedidos de alteração de pensões e de regimes de convívio quando os factos que os sustentaram se modificaram.",
      },
      {
        title: "Partilhas e heranças",
        text: "Habilitação de herdeiros, inventário, partilha de bens, acordos de divisão e resolução de conflitos entre herdeiros.",
      },
      {
        title: "Testamentos e doações",
        text: "Preparação de testamentos, planeamento sucessório e análise dos limites da vontade do testador segundo a lei portuguesa.",
      },
      {
        title: "Casais internacionais",
        text: "Assuntos com elementos estrangeiros, designadamente escolha de lei aplicável, reconhecimento de decisões e bens situados fora de Portugal.",
      },
    ],
    process: [
      { title: "Primeiro contacto", text: "Ouvimos com calma e identificamos o que se pretende alcançar, sem compromisso." },
      { title: "Análise e proposta", text: "Explicamos o enquadramento legal, as opções e uma estimativa de honorários e de prazos." },
      { title: "Acompanhamento", text: "Conduzimos o procedimento, negociamos ou peticionamos em tribunal e mantemos informação regular." },
      { title: "Encerramento", text: "Fechado o processo, explicamos os efeitos práticos para as pessoas envolvidas." },
    ],
    team: ["helena-valadares", "antonio-mendes"],
    faqs: [
      {
        q: "Quanto tempo demora um divórcio por mútuo acordo?",
        a: "Quando existe acordo sobre os efeitos do divórcio, o processo decorre habitualmente em poucos meses. Varia com a carga do tribunal e com a necessidade de regular partilhas ou questões com filhos menores.",
      },
      {
        q: "Preciso de advogado para tratar de uma herança?",
        a: "Nem sempre é obrigatório, mas a intervenção de advogado é frequente quando há bens por partilhar, herdeiros que não estão de acordo ou credores envolvidos. Em inventário judicial, a representação por advogado é exigida.",
      },
      {
        q: "Um testamento português é válido no estrangeiro?",
        a: "Depende do país e da forma do testamento. Analisamos caso a caso, tendo em conta a lei aplicável à sucessão e o reconhecimento da decisão no país relevante.",
      },
    ],
    articles: ["como-funciona-heranca-portugal"],
  },
  {
    id: "direito-imobiliario",
    number: "03",
    title: "Direito Imobiliário",
    short: "Compra e venda, arrendamento, propriedade horizontal e due diligence.",
    keywords: ["arrendamento", "compra e venda", "propriedade horizontal", "due diligence", "condomínio"],
    clients: ["particulares", "empresas", "internacional"],
    intro: [
      "Compravenda de imóveis, arrendamento, contratos de empreitada, condomínios e todas as questões que envolvem a propriedade ou a sua utilização. Assesoramos particulares que compram a primeira casa, proprietários que arrendam, investidores e pequenas empresas.",
      "Antes de assinar, verificamos o que pode ser verificado: registos, licenças, ónus, encargos, contratos existentes e limites à utilização do imóvel. Depois de assinar, acompanhamos o cumprimento e resolvemos o que não estiver conforme.",
    ],
    situations: [
      {
        title: "Compra e venda de imóveis",
        text: "Análise jurídica do negócio, verificação documental, revisão ou elaboração do contrato-promessa e apoio no dia da escritura.",
      },
      {
        title: "Due diligence de imóveis",
        text: "Verificação de registo predial, licenças de utilização, hipotecas, ónus, servidões e situações de ocupação antes de um investimento.",
      },
      {
        title: "Arrendamento",
        text: "Contratos de arrendamento habitacional e não habitacional, cauções, atualização de rendas, obras e devolução do imóvel.",
      },
      {
        title: "Propriedade horizontal e condomínios",
        text: "Questões de condomínio, obras em partes comuns, alterações de título constitutivo e litígios entre condóminos.",
      },
      {
        title: "Empreitadas e construção",
        text: "Contratos de empreitada, prazos, vistoria de obra, defeitos de construção e garantias legais.",
      },
      {
        title: "Alojamento local e exploração",
        text: "Enquadramento da exploração turística, licenciamento, contestação de limites municipais e contratos com operadores.",
      },
    ],
    process: [
      { title: "Primeiro contacto", text: "Identificamos o imóvel, o objetivo do negócio e o prazo desejado." },
      { title: "Análise e proposta", text: "Apresentamos uma lista de verificações, os riscos encontrados e o valor dos honorários." },
      { title: "Acompanhamento", text: "Revimos documentos, negociamos condições e acompanhamos a escritura ou o processo." },
      { title: "Encerramento", text: "Entregamos o dossiê organizado e explicamos as obrigações que permanecem." },
    ],
    team: ["pedro-carvalhosa", "antonio-mendes"],
    faqs: [
      {
        q: "Vale a pena fazer due diligence num apartamento?",
        a: "Sim, sobretudo se houver obras recentes, alterações ao interior, arrendamentos em curso ou dúvidas sobre licenças. A verificação prévia evita litígios e custos que muitas vezes superam o valor do acompanhamento jurídico.",
      },
      {
        q: "O senhorio pode subir a renda todos os anos?",
        a: "As regras de atualização variam com o tipo de contrato e com os coeficientes legais em vigor para o ano. Verificamos o contrato e o regime aplicável antes de confirmar qualquer valor.",
      },
      {
        q: "Comprei casa com defeitos. O que posso reclamar?",
        a: "Depende de o defeito existir à data da venda, de ser ou não visível e de ter existido declaração do vendedor. Em compra de obra nova existem garantias legais que devem ser acionadas pelos canais próprios.",
      },
    ],
    articles: ["antes-assinar-contrato-arrendamento", "compra-de-casa-documentos-verificacoes"],
  },
  {
    id: "direito-trabalho",
    number: "04",
    title: "Direito do Trabalho",
    short: "Contratos de trabalho, despedimentos e processos disciplinares.",
    keywords: ["contrato de trabalho", "despedimento", "processo disciplinar", "horas extraordinárias", "trabalho"],
    clients: ["particulares", "empresas"],
    intro: [
      "Assessoramos trabalhadores e empresas. Do lado de quem trabalha, explicamos direitos e avaliamos a fundamentação de despedimentos, alterações de funções ou créditos salariais em falta. Do lado das entidades empregadoras, apoiamos a condução correta dos procedimentos internos.",
      "O objetivo é evitar litígios desnecessários e, quando existem, resolvê-los com informação clara sobre riscos, prazos e custos. Atuamos também em processos de contraordenação laboral e em negociação de acordos de cessação.",
    ],
    situations: [
      {
        title: "Contratos e vínculos",
        text: "Contratos de trabalho, contratos a termo, trabalho temporário, teletrabalho, acumulação de funções e revisão de cláusulas.",
      },
      {
        title: "Despedimento",
        text: "Análise da fundamentação e do procedimento, pedidos de indemnização e fundamentos de impugnação judicial.",
      },
      {
        title: "Processos disciplinares",
        text: "Apoio a trabalhadores notificados e a empregadores que conduzem processos disciplinares, com verificação de prazos e formalidades.",
      },
      {
        title: "Créditos salariais",
        text: "Salários em atraso, subsídios, horas extraordinárias, diuturnidades e compensações devidas por cessação de contrato.",
      },
      {
        title: "Acidentes de trabalho",
        text: "Acompanhamento do processo desde a participação, avaliação de incapaz e impugnação de alta, com articulação com as entidades competentes.",
      },
      {
        title: "Acordos de cessação",
        text: "Negociação e revisão de acordos de revogação, valores de compensação e cláusulas de confidencialidade e não concorrência.",
      },
    ],
    process: [
      { title: "Primeiro contacto", text: "Analisamos o contrato, as comunicações e os prazos que estão a correr." },
      { title: "Análise e proposta", text: "Indicamos as opções, os valores previsíveis e os riscos de cada via." },
      { title: "Acompanhamento", text: "Negociamos, apresentamos reclamação ou conduzimos o processo em tribunal." },
      { title: "Encerramento", text: "Confirmamos o cumprimento do acordo ou da decisão e encerramos o processo." },
    ],
    team: ["sofia-nogueira", "antonio-mendes"],
    faqs: [
      {
        q: "Fui despedido. Que prazos tenho para reagir?",
        a: "Os prazos são curtos e variam com o tipo de despedimento e com a via escolhida. É importante reunir a carta de despedimento e pedir uma análise nas primeiras semanas, para não perder a possibilidade de impugnar.",
      },
      {
        q: "A empresa pode alterar as minhas funções?",
        a: "A alteração depende do que foi acordado e do enquadramento legal aplicável. Alterações substanciais e sem acordo podem constituir violação do contrato e justificar reclamação.",
      },
      {
        q: "Os acordos de revogação são seguros?",
        a: "São válidos quando cumprem os requisitos legais e resultam de vontade livre. Analisamos o texto, o valor da compensação e o efeito da renúncia a créditos antes de assinar.",
      },
    ],
    articles: ["despedimento-direitos-trabalhador"],
  },
  {
    id: "direito-comercial-societario",
    number: "05",
    title: "Direito Comercial e Societário",
    short: "Constituição de sociedades, contratos comerciais e acordos parassociais.",
    keywords: ["sociedade", "unipessoal", "acordos parassociais", "contratos comerciais", "gerência"],
    clients: ["empresas", "internacional"],
    intro: [
      "Acompanhamos a vida das empresas: constituição, alterações de estatutos, entradas e saídas de sócios, contratos com clientes e fornecedores, acordos parassociais e questões de gerência.",
      "Trabalhamos com pequenas e médias empresas e com investidores estrangeiros que se estabelecem em Portugal. Explicamos as obrigações legais e registais em linguagem simples, para que as decisões sejam tomadas com informação completa.",
    ],
    situations: [
      {
        title: "Constituição de sociedades",
        text: "Sociedades por quotas, unipessoais por quotas e anónimas: escolha da forma, estatutos, capital e registo comercial.",
      },
      {
        title: "Alterações societárias",
        text: "Alteração de objeto, sede, capital, gerência, cisões, fusões e transmissões de quotas.",
      },
      {
        title: "Acordos parassociais",
        text: "Acordos entre sócios sobre voto, preferências, saída conjunta e regras de governação.",
      },
      {
        title: "Contratos comerciais",
        text: "Contratos de distribuição, fornecimento, agência, prestação de serviços e condições gerais de venda.",
      },
      {
        title: "Governação e conflitos",
        text: "Questões entre sócios e gerentes, destituição, prestação de contas e responsabilidade por atos de gestão.",
      },
      {
        title: "Cobrança e litígios comerciais",
        text: "Incumprimento entre empresas, injunções, execuções e apoio em negociações de restruturação de dívida.",
      },
    ],
    process: [
      { title: "Primeiro contacto", text: "Percebemos o negócio, os sócios envolvidos e o calendário pretendido." },
      { title: "Análise e proposta", text: "Apresentamos a solução jurídica, os documentos necessários e os honorários." },
      { title: "Acompanhamento", text: "Preparamos e submetemos os documentos e acompanhamos os registos aplicáveis." },
      { title: "Encerramento", text: "Entregamos o dossiê da sociedade e um resumo das obrigações periódicas." },
    ],
    team: ["antonio-mendes", "rui-albuquerque"],
    faqs: [
      {
        q: "Qual é a diferença entre sociedade por quotas e unipessoal?",
        a: "A sociedade unipessoal tem um único sócio e está sujeita a regras próprias de capital e de responsabilidade. A escolha depende do número de titulares, do tipo de atividade e da forma como se pretende organizar o capital.",
      },
      {
        q: "Um acordo parassocial é obrigatório?",
        a: "Não é obrigatório, mas é frequente em sociedades com mais de um sócio. Permite definir regras de voto, entrada e saída de sócios e resolução de bloqueios antes de os problemas aparecerem.",
      },
      {
        q: "Posso gerir a sociedade a partir do estrangeiro?",
        a: "Sim, desde que estejam cumpridas as obrigações de registo e de representação em Portugal. Explicamos o que pode ser feito à distância e o que exige presença ou procurador.",
      },
    ],
    articles: ["constituir-empresa-quotas-ou-unipessoal"],
  },
  {
    id: "direito-penal",
    number: "06",
    title: "Direito Penal",
    short: "Defesa em processo-crime, apoio a vítimas e contraordenações.",
    keywords: ["processo-crime", "defesa", "vítima", "contraordenação", "inquérito"],
    clients: ["particulares", "empresas"],
    intro: [
      "Intervimos em processos-crime, do primeiro contacto com as autoridades até à decisão final. Prestamos apoio a pessoas acusadas ou constituídas arguidas e a vítimas que pretendem apresentar queixa, constituir-se assistentes ou pedir indemnização.",
      "É uma área em que a informação correta e a rapidez fazem diferença. Explicamos o que está em causa em cada fase, o que pode ser dito e apresentado, e quais são as consequências possíveis.",
    ],
    situations: [
      {
        title: "Defesa em processo-crime",
        text: "Acompanhamento em inquérito, instrução e julgamento, incluindo interrogatórios, medidas de coação e recurso.",
      },
      {
        title: "Apoio a vítimas",
        text: "Apresentação de queixa ou denúncia, constituição de assistente, pedido de indemnização cível e apoio durante todas as diligências.",
      },
      {
        title: "Crimes económicos e fiscais",
        text: "Apoio a pessoas e empresas em processos por abuso de confiança, fraude fiscal, branqueamento e infrações conexas.",
      },
      {
        title: "Contraordenações",
        text: "Defesa em processos contraordenacionais, reclamações, impugnações judiciais e pedidos de suspensão de sanções.",
      },
      {
        title: "Violência doméstica e crimes contra as pessoas",
        text: "Acompanhamento reservado de vítimas e de pessoas acusadas, com atenção às medidas de proteção e aos prazos próprios.",
      },
      {
        title: "Execução e reabilitação",
        text: "Questões de cumprimento de pena, liberdade condicional e reabilitação judicial.",
      },
    ],
    process: [
      { title: "Primeiro contacto", text: "Ouvimos os factos com discrição e identificamos a fase do processo e os prazos." },
      { title: "Análise e proposta", text: "Explicamos o enquadramento, as consequências possíveis e os honorários previsíveis." },
      { title: "Acompanhamento", text: "Asseguramos a defesa, comparecemos nas diligências e mantemos informação regular." },
      { title: "Encerramento", text: "Explicamos a decisão, as possibilidades de recurso e o que se segue." },
    ],
    team: ["sofia-nogueira", "pedro-carvalhosa"],
    faqs: [
      {
        q: "Fui chamado para prestar declarações. Devo ir sozinho?",
        a: "Tem direito a fazer-se acompanhar por advogado, e é aconselhável fazê-lo. Antes da diligência explicamos o objeto das perguntas, os direitos do arguido e as consequências de cada opção.",
      },
      {
        q: "Posso desistir de uma queixa?",
        a: "Depende do tipo de crime. Nos crimes particulares a desistência é possível; nos crimes semipúblicos depende de consentimento do arguido; nos crimes públicos o procedimento segue os seus termos.",
      },
      {
        q: "Uma contraordenação fica registada?",
        a: "Em regra, as condenações em contraordenação constam dos registos da entidade autuante, com os limites e prazos previstos na lei. Avaliamos a possibilidade de impugnação e o efeito prático do registo.",
      },
    ],
    articles: [],
  },
  {
    id: "direito-administrativo-fiscal",
    number: "07",
    title: "Direito Administrativo e Fiscal",
    short: "Contencioso administrativo, procedimentos fiscais e impugnações.",
    keywords: ["fisco", "impugnação", "contencioso administrativo", "licenciamento", "contraordenação fiscal"],
    clients: ["particulares", "empresas"],
    intro: [
      "Apoiamos pessoas e empresas em procedimentos administrativos e fiscais: licenciamentos, reclamações, recursos hierárquicos, impugnações judiciais e execuções fiscais. Também acompanhamos pedidos de informação vinculativa e processos de contraordenação fiscal.",
      "A primeira tarefa é quase sempre organizar os prazos e os documentos. Depois avaliamos os riscos, os custos e as alternativas de regularização voluntária, quando existam.",
    ],
    situations: [
      {
        title: "Impugnação de atos fiscais",
        text: "Liquidações de IRS, IRC, IVA, IMI, IMT e demais tributos, com reclamação graciosa, recurso hierárquico ou impugnação judicial.",
      },
      {
        title: "Contencioso administrativo",
        text: "Impugnação de decisões de câmaras, institutos e serviços públicos, incluindo licenciamento urbanístico e ambiental.",
      },
      {
        title: "Execuções fiscais",
        text: "Oposição à execução, penhora de bens, garantias, planos prestacionais e revisão de dívidas à Autoridade Tributária e à Segurança Social.",
      },
      {
        title: "Procedimentos de regularização",
        text: "Regularização voluntária, pedidos de dispensa de coimas e apresentação de declarações em falta.",
      },
      {
        title: "Contraordenações fiscais e administrativas",
        text: "Defesa em processos da Autoridade Tributária, autarquias, IAPMEI, ASAE e demais entidades com competência sancionatória.",
      },
      {
        title: "Apoio a empresas em contratos públicos",
        text: "Procedimentos de contratação pública, impugnação de decisões de adjudicação e execução de contratos administrativos.",
      },
    ],
    process: [
      { title: "Primeiro contacto", text: "Identificamos a entidade, o ato em causa e o prazo aplicável." },
      { title: "Análise e proposta", text: "Estimamos riscos processuais, custos administrativos e honorários." },
      { title: "Acompanhamento", text: "Apresentamos reclamações, recursos ou impugnações e acompanhamos as notificações." },
      { title: "Encerramento", text: "Confirmamos a decisão, eventuais reembolsos e obrigações futuras." },
    ],
    team: ["pedro-carvalhosa", "sofia-nogueira"],
    faqs: [
      {
        q: "Recebi uma liquidação adicional. Posso contestar?",
        a: "Sim, dentro do prazo legal e com fundamentos concretos. Os prazos contam desde a notificação, por isso é útil pedir uma análise nos primeiros dias para preparar a reclamação ou a impugnação.",
      },
      {
        q: "É possível pagar a dívida fiscal em prestações?",
        a: "Em muitas situações é possível apresentar um pedido de plano prestacional, com prestação e garantias adequadas. A viabilidade depende do tipo de dívida e da situação do contribuinte.",
      },
      {
        q: "A impugnação suspende a execução?",
        a: "Depende do meio escolhido e da prestação de garantia. Explicamos as opções e as consequências de cada uma antes de apresentar o pedido.",
      },
    ],
    articles: [],
  },
  {
    id: "imigracao-nacionalidade",
    number: "08",
    title: "Imigração e Nacionalidade",
    short: "Autorizações de residência, reagrupamento familiar e nacionalidade.",
    keywords: ["autorização de residência", "nacionalidade", "AIMA", "reagrupamento familiar", "visto"],
    clients: ["particulares", "internacional"],
    intro: [
      "Acompanhamos quem chega ou se estabelece em Portugal: autorizações de residência, reagrupamento familiar, renovações, vistos e pedidos de nacionalidade. Todo o processo é conduzido em nome do cliente, com organização documental rigorosa.",
      "Atendemos em português, inglês, francês e espanhol, e mantemos comunicação regular sobre cada fase junto das entidades competentes. Explicamos o que depende do requerente, o que depende das entidades e o tempo previsível de cada etapa.",
    ],
    situations: [
      {
        title: "Autorizações de residência",
        text: "Pedidos, renovações e alterações de autorização de residência, incluindo processos em atraso e pedidos de documentação complementar.",
      },
      {
        title: "Reagrupamento familiar",
        text: "Pedidos para cônjuges, filhos e outros familiares, com organização de prova de vínculo e de condições de acolhimento.",
      },
      {
        title: "Nacionalidade portuguesa",
        text: "Pedidos por descendência, casamento, união de facto ou naturalização, com verificação prévia dos requisitos.",
      },
      {
        title: "Vistos e entrada em Portugal",
        text: "Apoio na preparação de processos de visto e no cumprimento das condições de entrada e permanência.",
      },
      {
        title: "Cartões de residência e documentação",
        text: "Pedidos de renovação, alteração de dados, segundas vias e regularização de situações documentais.",
      },
      {
        title: "Clientes internacionais",
        text: "Apoio a quem investe ou trabalha em Portugal, com articulação com contabilistas, bancos e consultores.",
      },
    ],
    process: [
      { title: "Primeiro contacto", text: "Verificamos o objetivo, o perfil do requerente e os documentos disponíveis." },
      { title: "Análise e proposta", text: "Apresentamos requisitos, prazos previsíveis e honorários por fase." },
      { title: "Acompanhamento", text: "Preparamos e submetemos o pedido e acompanhamos as notificações das entidades." },
      { title: "Encerramento", text: "Confirmamos a decisão, entregamos os documentos e explicamos os passos seguintes." },
    ],
    team: ["rui-albuquerque", "helena-valadares"],
    faqs: [
      {
        q: "Consigo tratar do processo sem ir a Portugal?",
        a: "Em muitos casos é possível preparar e acompanhar o processo à distância, com procuração e documentação autenticada. Explicamos o que exige comparecência pessoal e o que pode ser feito por representante.",
      },
      {
        q: "Quanto tempo demora uma nacionalidade?",
        a: "O prazo varia com o fundamento do pedido e com a carga dos serviços competentes. Não é possível garantir datas, mas indicamos em que fase está o processo e o que pode ser feito se houver atraso relevante.",
      },
      {
        q: "Posso trabalhar enquanto o pedido está a ser analisado?",
        a: "Depende do tipo de título e da situação concreta. Analisamos o regime aplicável e informamos sobre as condições de permanência e de atividade durante a análise.",
      },
    ],
    articles: ["autorizacao-residencia-passos-principais"],
  },
];

/* --------------------------------------------------------------------------
   5. EQUIPA
   As fotografias são provisórias (Unsplash) e devem ser substituídas por
   retratos profissionais do escritório, no mesmo formato 4:5.
   -------------------------------------------------------------------------- */
export const TEAM = [
  {
    id: "antonio-mendes",
    name: "Dr. António Mendes",
    shortName: "António Mendes",
    role: "Sócio fundador",
    photo: "images/team-antonio.webp",
    cedula: "Cédula OA n.º [N.º]",
    languages: ["Português", "Inglês", "Francês"],
    areas: ["direito-civil-contratos", "direito-comercial-societario"],
    bio: "Sócio fundador. Acompanha contratos, responsabilidade civil e a vida societária de pequenas e médias empresas desde 2001.",
    fullBio: [
      "António Mendes exerce advocacia desde 2001 e fundou a sociedade em 2008, em Lisboa, com Helena Valadares. O seu trabalho centra-se no Direito Civil e no Direito Comercial e Societário, com especial atenção aos contratos e às relações duradouras entre empresas, sócios e clientes.",
      "Acompanha habitualmente a constituição e a reorganização de sociedades, a negociação de contratos comerciais e a resolução de conflitos entre sócios. Colabora com contabilistas e consultores quando o assunto exige uma visão integrada do negócio.",
      "É o interlocutor frequente de clientes internacionais que se estabelecem em Portugal e trabalha em português, inglês e francês.",
    ],
  },
  {
    id: "helena-valadares",
    name: "Dra. Helena Valadares",
    shortName: "Helena Valadares",
    role: "Sócia fundadora",
    photo: "images/team-helena.webp",
    cedula: "Cédula OA n.º [N.º]",
    languages: ["Português", "Inglês", "Espanhol"],
    areas: ["direito-familia-sucessoes", "imigracao-nacionalidade"],
    bio: "Sócia fundadora. Dedica-se ao Direito da Família e das Sucessões, com atenção particular aos processos com filhos menores.",
    fullBio: [
      "Helena Valadares é sócia fundadora da sociedade e exerce advocacia desde 2003. Trabalha sobretudo em Direito da Família e das Sucessões: divórcio, responsabilidades parentais, partilhas e testamentos.",
      "Dirige os processos com uma preocupação constante de estabilidade familiar, procurando acordos sustentáveis e explicando, a cada passo, o que a lei determina e o que fica sujeito a decisão judicial. Acompanha igualmente processos de nacionalidade e de reagrupamento familiar, área em que a organização documental é decisiva.",
      "Atende em português, inglês e espanhol.",
    ],
  },
  {
    id: "pedro-carvalhosa",
    name: "Dr. Pedro Carvalhosa",
    shortName: "Pedro Carvalhosa",
    role: "Sócio",
    photo: "images/team-pedro.webp",
    cedula: "Cédula OA n.º [N.º]",
    languages: ["Português", "Inglês"],
    areas: ["direito-imobiliario", "direito-administrativo-fiscal"],
    bio: "Sócio. Acompanha operações imobiliárias, contratos de arrendamento e contencioso administrativo e fiscal.",
    fullBio: [
      "Pedro Carvalhosa é sócio da sociedade e trabalha em Direito Imobiliário e em Direito Administrativo e Fiscal. Acompanha compras e vendas de imóveis, arrendamentos, propriedade horizontal e litígios de condomínio.",
      "Na área administrativa e fiscal apoia empresas e particulares em licenciamentos, impugnações de atos tributários e execuções fiscais. Insiste numa análise prévia de custos e de prazos antes de avançar para qualquer procedimento contencioso.",
      "Atende em português e em inglês, e trabalha regularmente com investidores estrangeiros com imóveis em Portugal.",
    ],
  },
  {
    id: "sofia-nogueira",
    name: "Dra. Sofia Nogueira",
    shortName: "Sofia Nogueira",
    role: "Advogada",
    photo: "images/team-sofia.webp",
    cedula: "Cédula OA n.º [N.º]",
    languages: ["Português", "Inglês"],
    areas: ["direito-trabalho", "direito-penal"],
    bio: "Advogada. Trabalha em Direito do Trabalho e em Direito Penal, com experiência em processos disciplinares e contraordenações.",
    fullBio: [
      "Sofia Nogueira integra a equipa desde 2015 e exerce nas áreas de Direito do Trabalho e Direito Penal. Acompanha trabalhadores e empresas em processos disciplinares, despedimentos, créditos salariais e contraordenações.",
      "Em Direito Penal apoia pessoas acusadas e vítimas, desde o inquérito até à decisão final, com especial atenção aos prazos e à articulação com as autoridades.",
      "Atende em português e em inglês, e colabora com a equipa administrativa na organização e controlo dos processos.",
    ],
  },
  {
    id: "rui-albuquerque",
    name: "Dr. Rui Albuquerque",
    shortName: "Rui Albuquerque",
    role: "Advogado",
    photo: "images/team-rui.webp",
    cedula: "Cédula OA n.º [N.º]",
    languages: ["Português", "Inglês", "Francês", "Espanhol"],
    areas: ["imigracao-nacionalidade", "direito-comercial-societario"],
    bio: "Advogado. Acompanha processos de imigração, nacionalidade e apoio a clientes internacionais que investem em Portugal.",
    fullBio: [
      "Rui Albuquerque trabalha em Direito de Imigração e Nacionalidade e no apoio a clientes internacionais que se estabelecem ou investem em Portugal. Acompanha autorizações de residência, reagrupamento familiar, vistos e pedidos de nacionalidade.",
      "Prepara processos completos e organizados, articulando-se com contabilistas, bancos e outros profissionais quando o assunto envolve a constituição de sociedades ou a transferência de atividade para Portugal.",
      "Atende em português, inglês, francês e espanhol, e mantém os clientes informados sobre cada fase junto das entidades competentes.",
    ],
  },
];

/* Apoio administrativo e jurídico — descrição, sem identificação individual */
export const TEAM_SUPPORT = [
  {
    id: "secretariado",
    title: "Secretariado e atendimento",
    text: "Primeiro acolhimento de quem contacta o escritório, marcação de reuniões presenciais e por videochamada, organização de dossiês e apoio na comunicação com clientes e entidades.",
  },
  {
    id: "gestao-processual",
    title: "Gestão processual",
    text: "Controlo de prazos, submissão de peças processuais, registo de notificações e manutenção do arquivo documental de cada processo.",
  },
  {
    id: "apoio-juridico",
    title: "Apoio jurídico e pesquisa",
    text: "Pesquisa documental, preparação de minutas e verificação de registos, em articulação direta com os advogados responsáveis de cada assunto.",
  },
];

/* --------------------------------------------------------------------------
   6. ARTIGOS
   Conteúdos informativos e genéricos, a rever antes de publicar.
   Cada artigo tem: id (endereço), area, author, date, readingTime, excerpt,
   intro, sections (com parágrafos e listas opcionais) e related.
   -------------------------------------------------------------------------- */
export const ARTICLES = [
  {
    id: "antes-assinar-contrato-arrendamento",
    title: "O que deve saber antes de assinar um contrato de arrendamento",
    metaTitle: "Arrendamento: o que verificar antes de assinar",
    area: "direito-imobiliario",
    author: "pedro-carvalhosa",
    date: "2026-09-18",
    readingTime: 6,
    excerpt:
      "Prazo, renda, caução, obras e devolução do imóvel: os pontos que costumam gerar conflito e que vale a pena esclarecer por escrito antes da assinatura.",
    intro:
      "O contrato de arrendamento é um dos documentos que mais consequências tem na vida quotidiana. A maior parte dos litígios não nasce de má-fé, mas de cláusulas vagas ou de expectativas que nunca foram escritas. Estas são as perguntas que, na prática, ajudam a evitar problemas.",
    sections: [
      {
        id: "partes-e-fim",
        title: "Identifique as partes e o fim do contrato",
        paragraphs: [
          "Comece por confirmar quem são as partes e em que qualidade assinam: proprietário, comproprietários, usufrutuário, representante de uma sociedade ou titular de procuração. Se o senhorio não for o único titular do imóvel, o contrato deve ser assinado por todos ou por quem tenha poderes para o efeito.",
          "Verifique também a finalidade declarada — habitação, atividade profissional ou comércio — porque o regime aplicável e as obrigações das partes variam com o tipo de arrendamento. Um contrato habitacional usado para instalar um negócio pode ser motivo de resolução.",
        ],
      },
      {
        id: "prazo-renovacao",
        title: "Prazo, renovação e denúncia",
        paragraphs: [
          "O prazo e as regras de renovação automática são o ponto seguinte. É frequente o contrato prever renovações sucessivas e exigir uma antecedência mínima para a denúncia, muitas vezes de vários meses.",
          "Quem pretende sair dentro de um determinado período deve confirmar como e quando pode comunicar essa intenção. Um aviso enviado fora do prazo pode obrigar a pagar rendas adicionais, mesmo que o imóvel já não esteja a ser utilizado.",
        ],
      },
      {
        id: "renda-caucao",
        title: "Renda, caução e encargos",
        paragraphs: [
          "A renda deve estar escrita de forma clara: valor, dia de pagamento, forma de pagamento e regras de atualização. Confirme se existem encargos adicionais — condomínio, consumos, manutenções periódicas — e quem os suporta.",
          "A caução é habitual, mas não é ilimitada nem pode servir para finalidades diferentes das previstas. Fique com recibo de tudo o que entrega e com registo do estado do imóvel à entrada.",
        ],
        list: [
          "Valor da renda e dia de vencimento",
          "Encargos de condomínio e consumos: quem paga",
          "Caução: valor, forma de entrega e condições de devolução",
          "Regras de atualização da renda",
        ],
      },
      {
        id: "obras-conservacao",
        title: "Obras, conservação e alterações",
        paragraphs: [
          "O senhorio responde, em regra, pelas obras de conservação; o inquilino responde pela manutenção corrente e por danos causados. Vale a pena definir por escrito comunicações de avaria, prazos razoáveis e a quem compete suportar pequenas reparações.",
          "Qualquer alteração ao imóvel — pinturas, instalações, obras — deve ser autorizada. Sem essa autorização, o proprietário pode exigir a reposição do estado anterior no final do contrato.",
        ],
      },
      {
        id: "devolucao",
        title: "Devolução do imóvel e vistoria",
        paragraphs: [
          "No fim do contrato, a devolução deve ser acompanhada de uma vistoria e de um registo escrito, com data e assinaturas. Fotografias datadas do estado inicial e final evitam discussões sobre desgaste natural e sobre reparações.",
          "Se existirem valores em dívida ou danos, o documento de devolução deve identificar exatamente o que fica pendente e por quem. É também o momento de pedir a devolução da caução por escrito.",
        ],
      },
      {
        id: "lista-verificacao",
        title: "Lista de verificação antes de assinar",
        paragraphs: [
          "Reúna o contrato, o certificado energético, a ficha técnica quando aplicável e comprovativos do pagamento da caução. Confirme as assinaturas, os anexos e a data de início.",
          "Se alguma cláusula não estiver clara, peça explicação antes de assinar. Um contrato equilibrado protege as duas partes e reduz bastante a probabilidade de conflito futuro.",
        ],
        list: [
          "Titularidade do imóvel confirmada",
          "Prazo, renovação e condições de denúncia por escrito",
          "Renda, encargos e caução documentados",
          "Estado do imóvel registado em fotografias datadas",
          "Anexos e adendas assinados por ambas as partes",
        ],
      },
    ],
    related: ["compra-de-casa-documentos-verificacoes", "como-funciona-heranca-portugal"],
  },
  {
    id: "como-funciona-heranca-portugal",
    title: "Como funciona uma herança em Portugal",
    area: "direito-familia-sucessoes",
    author: "helena-valadares",
    date: "2026-07-02",
    readingTime: 7,
    excerpt:
      "Quem é chamado à herança, o que é a habilitação de herdeiros, quando é necessário inventário e como se faz a partilha dos bens.",
    intro:
      "Depois de um falecimento, a família depara-se com uma sucessão de decisões e de obrigações administrativas. Este artigo apresenta as fases habituais de uma herança em Portugal, sem substituir a análise do caso concreto, porque prazos e formalidades dependem dos bens e das pessoas envolvidas.",
    sections: [
      {
        id: "quem-e-chamado",
        title: "Quem é chamado à herança",
        paragraphs: [
          "A lei define uma ordem de sucessão: em primeiro lugar o cônjuge ou unido de facto e os descendentes; depois ascendentes e outros parentes. A vontade expressa em testamento é respeitada dentro dos limites que a lei reserva aos herdeiros legitimários.",
          "Havendo herdeiros legitimários, uma parte dos bens não pode ser livremente distribuída por testamento. Por isso, testamentos que ignoram esses limites podem ser objeto de redução.",
        ],
      },
      {
        id: "habilitacao",
        title: "Habilitação de herdeiros",
        paragraphs: [
          "A habilitação de herdeiros é o documento que identifica oficialmente quem sucede. Costuma ser pedida por escritura, por auto de notário ou pela via judicial, conforme a situação.",
          "Sem habilitação, muitos atos ficam bloqueados: venda de bens, movimentação de contas, atualização de registos prediais e acesso a alguns direitos junto de entidades públicas.",
        ],
      },
      {
        id: "inventario",
        title: "Inventário: quando é necessário",
        paragraphs: [
          "O inventário é o processo destinado a apurar os bens, os herdeiros e a partilha. Pode correr por acordo, em cartório, ou seguir a via judicial quando existem conflitos, herdeiros incapazes, cabeça de casal renitente ou bens difíceis de dividir.",
          "Existem prazos e obrigações fiscais associados à apresentação do inventário. Deixar a situação sem resolução durante anos costuma aumentar custos e dificultar provas.",
        ],
      },
      {
        id: "partilha",
        title: "Partilha por acordo ou em tribunal",
        paragraphs: [
          "Quando todos estão de acordo, a partilha pode ser feita de forma relativamente rápida, com uma composição equilibrada dos quinhões. Em regra, procura-se atribuir bens a quem já os utiliza e compensar os restantes em dinheiro, quando possível.",
          "Sem acordo, a partilha é decidida em processo, com avaliação dos bens e regras próprias para a adjudicação. É mais lenta e mais dispendiosa, mas garante uma solução quando a negociação se esgotou.",
        ],
      },
      {
        id: "impostos-bancos",
        title: "Impostos, bancos e registos",
        paragraphs: [
          "Além das formalidades da partilha, é necessário tratar de obrigações fiscais, contas bancárias, seguros, contratos de arrendamento e registos. O Imposto do Selo devido pela transmissão deve ser verificado com o apoio de contabilista ou jurista.",
          "As instituições financeiras exigem habitualmente a habilitação de herdeiros e o documento de partilha antes de proceder à transferência de valores.",
        ],
      },
      {
        id: "organizar",
        title: "Como organizar o processo",
        paragraphs: [
          "Comece por reunir certidões, documentos de identificação, títulos de bens, registos e contratos. Elabore uma lista simples de ativos e passivos e identifique quem tem documentos em sua posse.",
          "Com essa base é possível definir a estratégia: acordo, inventário por cartório ou tribunal, venda de bens e regularização fiscal. Uma reunião inicial costuma poupar bastante tempo nas semanas seguintes.",
        ],
        list: [
          "Certidão de óbito e certidão de casamento, se aplicável",
          "Certidões prediais e cadernetas dos imóveis",
          "Extratos bancários e identificação de contas",
          "Documentos de veículos, seguros e contratos relevantes",
          "Testamento, se existir, e identificação de todos os herdeiros",
        ],
      },
    ],
    related: ["antes-assinar-contrato-arrendamento", "constituir-empresa-quotas-ou-unipessoal"],
  },
  {
    id: "despedimento-direitos-trabalhador",
    title: "Despedimento: quais são os direitos do trabalhador",
    metaTitle: "Despedimento: direitos do trabalhador",
    area: "direito-trabalho",
    author: "sofia-nogueira",
    date: "2026-05-14",
    readingTime: 6,
    excerpt:
      "Tipos de despedimento, papel do processo disciplinar, créditos a receber e os prazos curtos que não convém deixar passar.",
    intro:
      "Receber uma comunicação de despedimento é um momento difícil, sobretudo quando existem dúvidas sobre a sua fundamentação. Importa separar o que é legalmente possível do que é apenas informalmente sugerido — e agir dentro dos prazos, que nesta área são curtos.",
    sections: [
      {
        id: "tipos",
        title: "Tipos de despedimento",
        paragraphs: [
          "O despedimento por facto imputável ao trabalhador exige um processo disciplinar com comunicação escrita de acusação, prazo de defesa e decisão fundamentada. Falhas formais relevantes podem comprometer a validade do despedimento.",
          "O despedimento por causas objetivas — extinção do posto de trabalho ou inadaptação — e o despedimento coletivo seguem requisitos próprios, com critérios de seleção, negociação e obrigações de informação. O despedimento por inadaptação tem condições específicas e não se confunde com desempenho insuficiente.",
        ],
      },
      {
        id: "processo-disciplinar",
        title: "O que observar no processo disciplinar",
        paragraphs: [
          "A acusação deve descrever os factos de forma concreta, com datas e circunstâncias. Factos genéricos ou desconhecidos do trabalhador dificultam a defesa e são, muitas vezes, fundamento de impugnação.",
          "O prazo para responder por escrito deve ser respeitado por ambas as partes. É possível juntar documentos, indicar testemunhas e solicitar diligências; a resposta deve ser preparada com o apoio de um advogado quando o despedimento está em causa.",
        ],
      },
      {
        id: "creditos",
        title: "Créditos que podem estar em falta",
        paragraphs: [
          "Além da compensação legalmente prevista para certos tipos de despedimento, podem existir valores em dívida: salários, subsídios de férias e de Natal, formação não ministrada, horas extraordinárias, comissões e diuturnidades.",
          "É útil reunir recibos de vencimento, contratos, regulamentos internos, registos de horário e comunicações escritas. Esses documentos determinam, com frequência, o valor final a reclamar.",
        ],
      },
      {
        id: "prazos",
        title: "Prazos e meios de reação",
        paragraphs: [
          "A impugnação judicial do despedimento está sujeita a prazos legais que variam com o tipo de despedimento e com a modalidade escolhida. Contam-se, em regra, a partir da receção da comunicação ou da decisão.",
          "Existe também a possibilidade de reclamar junto da Autoridade para as Condições do Trabalho em determinadas situações e de negociar um acordo de cessação. Cada via tem consequências distintas, que devem ser explicadas antes de assinar qualquer documento.",
        ],
      },
      {
        id: "primeiras-semanas",
        title: "O que fazer nas primeiras semanas",
        paragraphs: [
          "Guarde toda a documentação e faça cópias digitais. Anote datas, reuniões, mensagens e testemunhas. Evite assinar declarações de renúncia ou recibos genéricos sem orientação prévia.",
          "Solicite uma análise jurídica cedo: mesmo que a intenção seja negociar, conhecer os direitos e os riscos reforça a posição negocial e evita decisões precipitadas.",
        ],
        list: [
          "Guardar a carta de despedimento e todos os documentos de trabalho",
          "Registar datas, reuniões e comunicações relevantes",
          "Não assinar documentos sem leitura atenta",
          "Verificar prazos de impugnação com apoio jurídico",
        ],
      },
    ],
    related: ["constituir-empresa-quotas-ou-unipessoal", "antes-assinar-contrato-arrendamento"],
  },
  {
    id: "compra-de-casa-documentos-verificacoes",
    title: "Compra de casa: documentos e verificações essenciais",
    metaTitle: "Comprar casa: documentos a verificar",
    area: "direito-imobiliario",
    author: "pedro-carvalhosa",
    date: "2026-03-11",
    readingTime: 6,
    excerpt:
      "Antes de entregar o sinal, vale a pena confirmar registos, licenças, ónus e encargos. Uma lista organizada para compradores.",
    intro:
      "A compra de um imóvel envolve decisões emocionais e financeiras, mas também verificações técnicas e jurídicas. A maioria dos problemas que surgem depois da escritura podia ter sido identificada antes — desde hipotecas não canceladas a obras sem licença.",
    sections: [
      {
        id: "documentos",
        title: "Documentos de base",
        paragraphs: [
          "Comece pela certidão permanente do registo predial, que identifica titulares, ónus e encargos, e pela caderneta predial, que reúne os elementos fiscais. Peça a licença de utilização e, se necessário, o certificado energético.",
          "Em prédios em propriedade horizontal, junte o título constitutivo e as atas de condomínio mais recentes. Em imóveis antigos ou remodelados, verifique se existem alterações registadas ou obras relevadas.",
        ],
        list: [
          "Certidão permanente do registo predial",
          "Caderneta predial urbana atualizada",
          "Licença de utilização e certificado energético",
          "Título constitutivo e atas do condomínio",
          "Planta e documentos de obras, quando existam",
        ],
      },
      {
        id: "onus",
        title: "Ónus, encargos e ocupação",
        paragraphs: [
          "A certidão mostra hipotecas, penhoras, usufrutos e servidões. Uma hipoteca pode ser cancelada na escritura, mas o comprador deve confirmar o valor em dívida e assegurar que o pagamento é feito de forma controlada.",
          "Verifique igualmente se o imóvel está arrendado ou ocupado e em que condições. Um arrendamento em curso pode sobreviver à venda e limitar o uso do imóvel.",
        ],
      },
      {
        id: "condominio",
        title: "Condomínio, obras e despesas",
        paragraphs: [
          "Peça uma declaração de dívidas ao condomínio. As despesas aprovadas e não pagas podem ser exigidas ao novo proprietário, conforme a natureza da despesa e as deliberações em vigor.",
          "Confirme se existem obras aprovadas e ainda não executadas e qual a comparticipação prevista para cada fração. Em prédios com obras estruturais previstas, esse valor pode ser significativo.",
        ],
      },
      {
        id: "contrato-promessa",
        title: "Contrato-promessa e sinal",
        paragraphs: [
          "O contrato-promessa deve identificar as partes, o imóvel, o preço, a forma de pagamento e o prazo para a escritura. Deve ainda prever o que acontece em caso de incumprimento e de recusa de financiamento, quando essa condição for relevante.",
          "Antes de entregar o sinal, confirme a identificação do vendedor e a titularidade do imóvel. Entregas a pessoas sem poderes podem tornar-se difíceis de reaver.",
        ],
      },
      {
        id: "financiamento",
        title: "Financiamento, escritura e registo",
        paragraphs: [
          "Se houver crédito, o banco pede avaliação e documentação própria. A aprovação definitiva e as condições contratadas devem ser confirmadas antes da data da escritura.",
          "Na escritura, verifique o pagamento do preço, o cancelamento de encargos e a entrega das chaves. Depois, confirme a apresentação do registo e a atualização do IMI e do seguro.",
        ],
      },
      {
        id: "impostos",
        title: "Impostos e custos previsíveis",
        paragraphs: [
          "O IMT e o Imposto do Selo são calculados segundo as regras aplicáveis e podem variar com o tipo de aquisição, o valor e a finalidade — habitação própria e permanente ou investimento. Confirme sempre a base de cálculo antes de fechar o orçamento.",
          "Junte ainda honorários, registos, escritura e custos de condomínio. Este conjunto evita surpresas e permite negociar com margem.",
        ],
      },
    ],
    related: ["antes-assinar-contrato-arrendamento", "autorizacao-residencia-passos-principais"],
  },
  {
    id: "autorizacao-residencia-passos-principais",
    title: "Autorização de residência: passos principais",
    area: "imigracao-nacionalidade",
    author: "rui-albuquerque",
    date: "2026-01-22",
    readingTime: 5,
    excerpt:
      "Como se organiza um pedido de autorização de residência, o que é habitualmente pedido e onde costumam surgir atrasos.",
    intro:
      "Os processos de imigração exigem organização documental e paciência. Não há fórmulas que garantam decisões rápidas, mas há formas de preparar o pedido que reduzem pedidos adicionais e atrasos evitáveis.",
    sections: [
      {
        id: "enquadramento",
        title: "Definir o enquadramento do pedido",
        paragraphs: [
          "O primeiro passo é identificar o fundamento do pedido: trabalho, estudo, reagrupamento familiar, atividade independente, rendimentos próprios ou outro previsto na lei. Cada fundamento tem requisitos e prova distintos.",
          "Desse enquadramento dependem os documentos, os prazos e, muitas vezes, a ordem pela qual as diligências devem ser feitas. Alterar o fundamento a meio do processo costuma custar tempo.",
        ],
      },
      {
        id: "documentos",
        title: "Reunir documentos",
        paragraphs: [
          "Regra geral, são pedidos documentos de identificação válidos, prova do fundamento invocado, registo criminal, comprovativos de alojamento e de meios de subsistência, e documentação fiscal ou laboral.",
          "Alguns documentos exigem tradução ou legalização. Verifique a validade das certidões — algumas caducam rapidamente — antes de submeter o pedido.",
        ],
        list: [
          "Passaporte ou título de viagem válido",
          "Prova do fundamento: contrato de trabalho, matrícula, vínculo familiar",
          "Registo criminal do país de origem, quando exigido",
          "Comprovativo de alojamento e de meios de subsistência",
          "Número de identificação fiscal e de segurança social, se aplicável",
        ],
      },
      {
        id: "submissao",
        title: "Submissão e agendamento",
        paragraphs: [
          "A submissão é feita pelos canais das entidades competentes, com marcação de atendimento quando necessária. Guarde os comprovativos de submissão e os números de processo.",
          "É frequente a entidade pedir elementos adicionais. Responder dentro do prazo, de forma completa e organizada, evita reinícios de contagem e processos parados.",
        ],
      },
      {
        id: "acompanhamento",
        title: "Acompanhamento e respostas",
        paragraphs: [
          "Durante a análise, é útil manter um registo de todas as comunicações e um dossiê atualizado. Peça apoio jurídico quando as notificações forem confusas ou quando o processo estiver parado sem explicação.",
          "Em situações de atraso relevante, existem meios de reação administrativa e judicial que devem ser avaliados caso a caso, tendo em conta o custo e o tempo envolvidos.",
        ],
      },
      {
        id: "renovacao",
        title: "Renovação e manutenção do título",
        paragraphs: [
          "O título de residência tem prazo e condições de renovação. Anote a validade e prepare a renovação com antecedência, sobretudo se depender de vínculo laboral, matrícula escolar ou meios de subsistência.",
          "Mudanças de morada, de situação profissional ou de estado civil devem ser comunicadas e registadas. Manter os dados atualizados simplifica todos os processos seguintes.",
        ],
      },
      {
        id: "erros",
        title: "Erros que atrasam processos",
        paragraphs: [
          "Os atrasos mais comuns vêm de documentos caducados, traduções incompletas, comprovativos que não demonstram o que se pretende e falta de resposta a pedidos adicionais.",
          "Antes de submeter, faça uma verificação final: cada documento deve responder a um requisito concreto. Se a ligação não for evidente, junte uma nota explicativa.",
        ],
      },
    ],
    related: ["como-funciona-heranca-portugal", "compra-de-casa-documentos-verificacoes"],
  },
  {
    id: "constituir-empresa-quotas-ou-unipessoal",
    title: "Constituir uma empresa: sociedade por quotas ou unipessoal",
    metaTitle: "Constituir empresa: quotas ou unipessoal",
    area: "direito-comercial-societario",
    author: "antonio-mendes",
    date: "2025-11-06",
    readingTime: 6,
    excerpt:
      "Forma jurídica, capital, estatutos e obrigações iniciais: o que distingue uma sociedade por quotas de uma unipessoal por quotas.",
    intro:
      "Constituir uma empresa é um passo com efeitos duradouros: define quem decide, quem responde e como o capital circula. A escolha da forma jurídica não é uma formalidade — tem consequências na responsabilidade, no financiamento e na relação com clientes e fornecedores.",
    sections: [
      {
        id: "forma",
        title: "Escolher a forma jurídica",
        paragraphs: [
          "A sociedade por quotas tem dois ou mais sócios e é a forma mais comum nas pequenas e médias empresas. A sociedade unipessoal por quotas tem um único sócio e regras específicas que impedem a confusão entre património pessoal e societário.",
          "Ambas limitam, em regra, a responsabilidade do sócio ao capital subscrito, mas existem deveres de capital mínimo, de prestação de contas e de publicidade dos atos societários. Existem ainda outras formas, como a sociedade anónima, adequadas a estruturas com acionistas e capital mais elevado.",
        ],
      },
      {
        id: "nome-registo",
        title: "Nome, registo e objeto",
        paragraphs: [
          "É necessário obter a admissibilidade da firma e verificar a inexistência de sinais confundíveis. O objeto social deve descrever a atividade de forma clara, com os códigos de atividade económica correspondentes.",
          "O registo comercial inclui os atos de constituição e as alterações posteriores. Erros ou omissões nos registos traduzem-se, muitas vezes, em dificuldades com bancos, clientes e entidades públicas.",
        ],
      },
      {
        id: "capital",
        title: "Capital social e entradas",
        paragraphs: [
          "O capital é dividido em quotas, com valores atribuídos a cada sócio. As entradas podem ser em dinheiro ou em espécie, com regras próprias de avaliação e de responsabilidade.",
          "É comum começar com o capital mínimo, mas convém pensar no capital adequado à atividade: a insuficiência de meios próprios pode ser problema na relação com bancos e no cumprimento de obrigações.",
        ],
      },
      {
        id: "estatutos-acordos",
        title: "Estatutos e acordos entre sócios",
        paragraphs: [
          "Os estatutos definem objeto, sede, capital, órgãos e regras de deliberação. Devem ser escritos para o caso concreto, evitando modelos genéricos que não preveem situações de bloqueio, entrada de novos sócios ou saída de um dos titulares.",
          "Um acordo parassocial complementa os estatutos e regula matérias como voto, preferências, distribuição de lucros e resolução de conflitos. É uma ferramenta útil para evitar litígios futuros.",
        ],
      },
      {
        id: "obrigacoes",
        title: "Obrigações depois da constituição",
        paragraphs: [
          "Depois do registo, é necessário tratar do início de atividade, da contabilidade organizada, das obrigações fiscais periódicas e da segurança social dos gerentes e trabalhadores.",
          "A empresa deve manter atualizados os registos de beneficiário efetivo e de titularidade. Estas obrigações são verificadas por bancos e entidades públicas em processos de abertura de conta, candidaturas e contratação.",
        ],
      },
      {
        id: "erros",
        title: "Erros frequentes no início",
        paragraphs: [
          "Entre os erros mais comuns estão estatutos copiados, gerentes sem poderes definidos, entrada em atividade sem apoio contabilístico e confusão entre despesas pessoais e empresariais.",
          "Reunir um pequeno manual de governação — quem decide o quê, que despesas exigem deliberação, como se documentam as decisões — poupa problemas na relação com bancos, investidores e Autoridade Tributária.",
        ],
        list: [
          "Estatutos ajustados à realidade da empresa",
          "Gerência com poderes e limites definidos",
          "Contabilidade organizada desde o primeiro dia",
          "Registo de beneficiário efetivo atualizado",
          "Acordo entre sócios sobre saída e sucessão",
        ],
      },
    ],
    related: ["despedimento-direitos-trabalhador", "como-funciona-heranca-portugal"],
  },
];
