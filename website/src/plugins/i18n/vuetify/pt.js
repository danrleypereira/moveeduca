import { pt } from "vuetify/lib/locale";

export default {
  ...pt,
  organizationName: "Movimento em Defesa da Educação",
  acronym: "Move&Educa",
  navBar: {
    home: "Início",
    institutional: "Institucional",
    projects: "Projetos",
    partners: "Parceiros",
    contact: "Contato",
    join: "Associe-se",
  },
  loginSystem: {
    logged: "Olá, ",
    notLogged: "Você não está logado!",
    logout: "desconectar",
    login: "Entrar",
    signUp: "cadastrar",
    forget: "Esqueci minha senha!",
    ok: "Parece certo",
    password: "Senha",
    numberOfCharacters: "Ao menos 8 caracteres",
    wrongPass: "Email e/ou senha errado(s)!",
    invalidMail: "E-mail não válido!",
    writeMail: "Nos diga o email cadastrado",
    writePassword: "É necessário informar a senha",
  },
  contactForm: {
    certo: "Perfeito",
    name: {
      label: "Seu Nome",
      required: "Seu Nome é obrigatório",
      notValid: "Nome tem que ser menor que 10 caracteres"
    },
    email: {
      required: "Precisamos do seu email",
      notValid: "Esse email não parece válido"
    },
    phone: {
      label: "Telefone ou Celular",
      required: "Um telefone brasileiro é necessário",
      notValid: "O número precisa ter DDD e o mínimo de caracteres"
    },
    item: {
      items: [
        "Projetos",
        "Doação",
        "Transparência",
        "Seja Membro",
        "Sou Empresa",
        "Outros"
      ],
      required: "Diga-nos o assunto por favor",
      label: "Assunto"
    },
    agree: {
      message: "Você concorda que possamos te ligar e/ou mandar email?",
      required: "Para submeter esse formulário você precisa concordar!"
    },
    actions: {
      submit: "Entre em contato",
      resetInputs: "Resetar formulário",
      resetValidation: "Resetar validações"
    }
  },
  cards: {
    aid: {
      topic: "Assistência",
      title: "Famílias Carentes",
      description: "Seja uma das famílias que nós apoiamos.",
      action1: "Regulamento",
      action2: "Contato",
    },
    services: {
      topic: "Serviços",
      title: "Aula particular",
      description: "Contrate um dos nossos serviços e nos ajude a ajudar.",
      action1: "Saiba Mais",
      action2: "Contratar",
    },
  },
  footer: {
    madeBy: "Feito por",
  },
  partners: {
    abong: {
      description:
        "A Associação Brasileira de Organizações Não Governamentais – Organizações em Defesa dos Direitos e Bens Comuns é uma plataforma de atuação nacional que congrega organizações que lutam contra todas as formas de discriminação, de desigualdades, pela construção de modos sustentáveis de vida e pela radicalização da democracia.",
      name: "Abong",
      action1: "",
      action2: "",
    },
    gamacidadao: {
      description:
        "No ar desde 2012, com o objetivo de privilegiar a informação comunitária e a regionalização da notícia. Foi fundado pelo jornalista Israel Carvalho e vem exercendo um importante papel de transmitir notícias verídicas e imparciais sobre a realidade da cidade e do DF.",
      name: "Gama Cidadao",
      action1: "",
      action2: "",
    },
    mlh: {
      description:
        "O Major League Hacking (MLH) é uma empresa que opera uma liga para hackers de estudantes. A Move&Educa organiza hackatons para que estudantes possam compartilhar e aprender novas habilidades, além de colocá-las em prática em problemas reais do dia a dia.",
      name: "MLH",
      action1: "",
      action2: "",
    },
    santos: {
      description:
        "Resgatar a vida das crianças em gestação que correm o risco de serem abortadas e dar apoio psicológico, espiritual e material às mulheres grávidas carentes e a seus filhos. Ir ao encontro da mãe ou família que esteja pensando em realizar um aborto - por terem sido vítimas de agressões, por questões financeiras, traumas afetivos, depressões etc. - e conscientizar a respeito da vida e do aborto. Dar apoio material (quando necessário), psicológico e espiritual.",
      name: "Santos Inocentes",
      action1: "",
      action2: "",
    },
    github: {
      description:
        "GitHub é uma plataforma de hospedagem de código-fonte com controle de versão usando o Git. Ele permite que programadores, utilitários ou qualquer usuário cadastrado na plataforma contribuam em projetos privados e/ou Open Source de qualquer lugar do mundo. GitHub é amplamente utilizado por programadores para divulgação de seus trabalhos ou para que outros programadores contribuam com o projeto, além de promover fácil comunicação através de recursos que relatam problemas ou mesclam repositórios remotos (issues, pull request).",
      name: "GitHub",
      action1: "",
      action2: "",
    },
    acig: {
      description:
        "Associação Comercial e Insdustrial do Guará defende como alguns de seus objetivos e finalidades o fortalecimento e representação da classe empresarial; assistir aos associados em seus interesses, valorizando seus produtos e serviços; promover do desenvolvimento econômico e social; ofertar oportunidades de qualificação profissional permanente, com elevação de escolaridade dos trabalhadores, associados e da comunidade, para ampliar a sua empregabilidade e renda.",
      name: "ACIG",
      action1: "",
      action2: "",
    },
    iades: {
      description:
        "Instituto de Apoio e Defesa dos Estudantes do Brasil – IADES BRASIL é uma associação civil, de direito privado, sem fins lucrativos de caráter social e educativo. Uma entidade de representação estudantil que abrange os diversos níveis educacionais, veio inovar e facilitar a vida do estudante, focando em resultados de qualidade. E oferecer tranquilidade e acesso a tudo que o mercado oferece é o diferencial que vai te preparar para os desafios.",
      name: "IADES",
      action1: "",
      action2: "",
    },
    concurso: {
      description:
        "Proporcionar aulas gratuitas para concurso, presencial, no Distrito Federal e Entorno, mas também desencadear ações sociais em prol da comunidade.",
      name: "Amigos do Concurso",
      action1: "",
      action2: "",
    },
    drogas: {
      description:
        "O Movimento Nacional da Cidadania pela Vida – BRASIL SEM DROGAS tem caráter suprapartidário e suprareligioso e vem debatendo a legalização da maconha sob o ponto de vista científico, social e humano.",
      name: "Brasil sem Drogas",
      action1: "",
      action2: "",
    },
  },
  projects: {
    mover: {
      name: "Projeto Mover",
      description:
        "Projeto Mover, originalmente chamado de projeto interdisciplinar salve o ensino, é um projeto pensado para desenvolver habilidades socioemocionais em estudantes atendidos através de um grupo de estudos. A metodologia utilizada é a de aprendizagem baseada em projetos.",
      action1: "Participar",
      action2: "Saiba Mais",
    },
    privateClass: {
      name: "Aula Particular",
      description:
        "Aulas particulares ministradas por universitários com o apoio de um time pedagógico especializado e com experiência comprovada na secretária de educação e em instituições privadas. Cobrimos todos os conteúdos desde a alfabetização até assuntos preparatórios para o vestibular.",
      action1: "Contratar",
      action2: "Saiba Mais",
    },
    volunteerClasses: {
      name: "Aulões Voluntários",
      description:
        "Buscando ajudar a comunidade promovemos aulões focados em resolução de exercícios de concursos e do ENEM (Examen Nacional do Ensino Médio). Esse é um projeto que realizamos em parceria com algumas instituições e pessoas físicas.",
      action1: "",
      action2: "Saiba Mais",
    },
    robotic: {
      name: "Robótica",
      description:
        "Projeto foca no ensino de componentes eletrônicos, placas de prototipagem e noções básica de programação. No momento estamos usando o Arduino, plataforma de prototipagem eletrônica de código aberto, permitindo que os usuários criem objetos eletrônicos interativos. ",
      action1: "Contratar",
      action2: "Saiba Mais",
    },
    sicatroli: {
      name: "SICATROLI",
      description:
        "Sistema de Cadastramento e Troca de Livros é um software desenvolvido pela Move&Educa com foco em auxiliar instituições públicas, privadas e sem fins lucrativos com o gerenciamento de acervo. O sistema cadastra os livros e permiti o empréstimo e a troca de livros entre pessoas e instituições.",
      action1: "Comprar",
      action2: "Saiba Mais",
    },
    mlh: {
      name: "MLH",
      description:
        "O Major League Hacking (MLH) é a liga oficial de hackathon para estudantes. A Move&Educa organiza hackatons para que estudantes possam compartilhar e aprender novas habilidades, além de colocá-las em prática em problemas reais do dia a dia. Venha participar de um dos nossos hackatons.",
      action1: "Participar",
      action2: "Saiba Mais",
    },
    coaching: {
      name: "Assessoria e Treinamento",
      description:
        "Nossos associados oferecem assessoria para profissionais da educação e insitituições públicas, privadas e sem fins lucrativos que buscam novos projetos, modernização burocrática e pedagógica. Temos treinamentos em diferentes subtópicos de educação: Aprendizagem Baseada em Projetos, Problemas Globais do conhecimento como avaliar, tecnologia da informação e computação na educação etc.",
      action1: "Contratar",
      action2: "Saiba Mais",
    },
    graduation: {
      name: "Graduação ?",
      description:
        "Esse projeto foi pensado pelos universitários que são associados da Move&Educa. O principal objetivo é levar adolescentes para conhecer as diferentes universidades, os diversos campus e uma grande variedade de cursos para que eles possam, além de descobrir qual curso fazer, descobrir a instituição que se adequa melhor ao seu perfil.",
      action1: "Participar",
      action2: "Saiba Mais",
    },
    formulario: {
      mover: {
        title: "Formulário - Projeto Mover",
        fields: {
          nome: "Nome completo do voluntário",
          areaInteresse: "Área de interesse",
          motivo: "Por que quer participar?",
          botao: "Enviar"
        }
      },
      particular: {
        title: "Formulário - Aula Particular",
        fields: {
          nome: "Nome completo do aluno",
          idade: "Idade",
          materia: "Matéria desejada",
          materias: ["Matemática", "Português", "Física"],
          botao: "Solicitar Aula"
        }
      },
      erro: {
        titulo: "Escolha uma modalidade válida",
        instrucoes: "Você precisa acessar com uma URL válida, como:",
        exemplos: ["/formulario?tipo=mover", "/formulario?tipo=particular"]
      }
    },
  },
  organanizationPage: {
    head: "Nossa Organização",
    whatDoWeDo:
      "Nossa organização vem sendo um diferencial na vida de várias crianças e adolescentes, atuando em parcerias come escolas, comunidade, outras organizações não lucrativas e com o governo. Nossa principal missão é ser um trampolim para o desenvolvimento pessoal e intelectual dos que por aqui passam. Nós auxiliamos educadores, líderes e figuras públicas na construção de políticas de educação e no treinamento para implementação dessas. ",
    welcome: "Bem Vindo a",
    mission: {
      head: "Missão",
      content: "Despertar a Consciência do Ser através da educação."
    },
    vision: {
      head: "Visão",
      content: "Ser uma instituição que colabora com outras instituições de ensino para a consolidação de habilidades do século XXI¹."
    },
    values: "Valores",
    twentyOneCenturySkills: {
      head: "Habilidades do Século XXI de acordo com a UNESCO",
      dialogTitle: "Habilidades do Século XXI"
    }
  },
  roles: {
    president: "Presidente",
    financialOfficer: "Diretor Financeiro",
    managingOfficer: "Diretor Administrativo",
    generalSecretary: "Secretário Geral",
    member: "Membro",
  },
  aside: {
    donationButton: "Apoie essa Causa",
    socialMedia: "Redes Sociais",
  },
  articles: [
    {
      titulo: "1ª Olimpíada de Programação do UDF",
      portal: "Gama Cidadão",
    },
  ],
  about: [
    "Bem-vindo ao Move&Educa, um movimento que tem como objetivo principal despertar a consciência através da educação.",
    "Fundado em 2020, o Move&Educa opera de maneira autônoma e estabeleceu parcerias com segmentos distintos da sociedade, abrangendo áreas como educação, saúde e assistência social.",
    "Nossa visão é colaborar com outras instituições de ensino na consolidação das habilidades do século XXI, conforme definido pela UNESCO. Acreditamos no poder da educação transformadora e no potencial de cada ser humano.",
    "Alinhados aos nossos valores, buscamos a unidade, neutralidade política, respeito, colaboração interna e externa, integridade, sustentabilidade, inovação e transparência em todas as nossas ações e decisões.",
    "A Move&Educa, desde sua concepção, enfatiza a importância da literacia da informação, pensamento crítico, comunicação, autogestão, consciência global, criatividade, literacia financeira, resiliência, trabalho em equipe e ética.",
    "Em conformidade com nossos estatutos, o Move&Educa promove a educação em todos os campos do saber, defende o direito ao acesso à educação de qualidade e busca continuamente colaborações e parcerias estratégicas para melhorar a qualidade da educação e promover o bem-estar da comunidade.",
    "Com um compromisso firme de promover a inclusão, a diversidade e a equidade, o Move&Educa é um defensor ardente dos direitos humanos e se esforça para assegurar que cada iniciativa reflita esses princípios.",
    "Conforme avançamos, estamos sempre à procura de oportunidades para ampliar nosso impacto e fazer uma diferença positiva. Seja através da promoção da ética, da paz, da cidadania ou da defesa do meio ambiente, estamos aqui para servir, educar e inspirar.",
    "Nossos esforços são guiados pelos princípios de legalidade, impessoalidade, moralidade, publicidade e eficiência. Nunca discriminamos com base em raça, sexo, cor, idade, gênero ou crença, e trabalhamos com a firme convicção de que a educação tem o poder de transformar vidas e sociedades.",
  ],
  values: [
    {
      title: "Bem do todo",
      description:
        "Todas as ações são regidas e inspiradas com foco no bem da humanidade, ampliando a visão do todo e compreendendo a interdependência do Homo Sapiens Sapiens com o meio ambiente.",
    },
    {
      title: "União",
      description:
        "Todos os projetos e iniciativas buscam a união entre as instituições e os seres, jamais escolhendo entre um e outro, incentivando o olhar pelas diferentes perspectivas.",
    },
    {
      title: "Neutralidade Política",
      description:
        "A organização se mantém neutra, sem apoiar candidatos específicos, acreditando que a imparcialidade promove a união.",
    },
    {
      title: "Respeito",
      description:
        "Valorizar e reconhecer as diferentes perspectivas do Ser, independente de sua cultura, origem, crenças e situação socioeconômica. Esse valor é guiado pela escuta ativa,  para que o reconhecimento das diferentes perspectivas seja realmente efetivo.",
    },
    {
      title: "Colaboração Interna",
      description:
        "Clarificar o objetivo de cada projeto e iniciativa para todos os colaboradores, assegurando ações alinhadas e coesas. Incentivar constantemente a troca de ideias e feedbacks entre os colaboradores valoriza a colaboração efetiva e o alinhamento de objetivos.",
    },
    {
      title: "Parcerias e Colaboração",
      description:
        "Estabelecer e cultivar parcerias estratégicas com outras instituições de ensino, reconhecendo que a colaboração ampliada e a cooperação interinstitucional são essenciais para alcançar uma educação transformadora no século XXI. Move&Educa busca não apenas colaborar, mas criar sinergias que potencializam os impactos positivos na educação.",
    },
    {
      title: "Integridade",
      description:
        "Agir com honestidade, transparência e ética em todas as ações, buscando sempre a coerência nas ações com base na missão e nos valores da Move&Educa.",
    },
    {
      title: "Sustentabilidade",
      description:
        "Garantir que as ações e projetos da organização sejam sustentáveis, considerando aspectos ambientais, sociais e econômicos, entendendo que a sociedade de hoje é responsável pela herança deixada para a sociedade do amanhã.",
    },
    {
      title: "Inovação",
      description:
        "Encorajar a busca por novas soluções e abordagens para enfrentar os desafios do século XXI.",
    },
    {
      title: "Transparência",
      description:
        "Assegurar que todas as ações e decisões da organização sejam transparentes para os colaboradores, parceiros e a comunidade.",
    },
  ],
  skills: [
    "Literacia da Informação e TIC (Tecnologias da Informação e Comunicação): Capacidade de buscar, avaliar, usar e criar informações usando tecnologias digitais.",
    "Pensamento Crítico e Solução de Problemas: Avaliar informações de forma crítica e fazer julgamentos lógicos; encontrar soluções para desafios e problemas complexos.",
    "Comunicação e Colaboração: Expressar ideias claramente, trabalhar de forma colaborativa e usar diferentes formas de comunicação, inclusive digital.",
    "Autoaprendizado e Autogestão: Capacidade de regular e ajustar a própria aprendizagem, estabelecer metas, gerenciar o tempo e tarefas, e trabalhar de forma independente.",
    "Consciência Global e Cidadania: Entender e agir sobre questões globais; respeitar e valorizar a diversidade; exercer direitos e obrigações de forma informada e responsável.",
    "Criatividade e Inovação: Imaginar e criar novas ideias, produtos ou soluções para questões variadas.",
    "Literacia Financeira e Econômica: Compreender como o dinheiro funciona na prática, tomar decisões informadas sobre recursos e compreender as consequências econômicas das decisões.",
    "Resiliência, Adaptabilidade e Flexibilidade: Adaptar-se a situações novas e adversas, superar obstáculos e aprender com a experiência.",
    "Trabalho em Equipe e Liderança: Trabalhar de forma produtiva com outros, assumir responsabilidades e liderar quando necessário.",
    "Ética e Integridade: Compreender e agir de acordo com princípios éticos, demonstrar honestidade e integridade em todas as ações.",
  ],
  comingSoon: {
    head: "Página em construção...",
    content: "Veja outros páginas que já construímos!"
  },
  utils: {
    about: "Sobre nossa Organização",
    close: "Fechar"
  }
};
