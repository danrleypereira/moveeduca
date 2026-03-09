import { en } from "vuetify/lib/locale";

export default {
  ...en,
  organizationName: "Movement in Defense of Education",
  acronym: "Move&Educate",
  navBar: {
    home: "Home",
    institutional: "Organization",
    projects: "Projects",
    partners: "Partners",
    contact: "Contact",
    join: "Join Us",
  },
  loginSystem: {
    logged: "Hello, ",
    notLogged: "You're not logged in!",
    logout: "Logout",
    login: "Login",
    signUp: "SignUp",
    forget: "Forgetted password!",
    ok: "Seems right!",
    password: "Password",
    numberOfCharacters: "At least 8 characters",
    wrongPass: "Email and/or password wrong!",
    invalidMail: "E-mail not valid!",
    writeMail: "Tell us your registered email",
    writePassword: "Write up your password",
  },
  contactForm: {
    certo: "Perfect",
    name: {
      label: "Your Name",
      required: "Your Name is required",
      notValid: "Name must be less than 10 characters"
    },
    email: {
      required: "We need your email",
      notValid: "This email does not appear valid"
    },
    phone: {
      label: "Your Phone Number",
      required: "A Brazilian phone is required",
      notValid: "The number must have DDD and a minimum of characters"
    },
    item: {
      items: [
        "Projects",
        "Donation",
        "Transparency",
        "Become a Member",
        "I am Company",
        "Others"
      ],
      required: "Tell us the subject please",
      label: "Subject"
    },
    agree: {
      message: "Do you agree that we can call you and/or send you an email?",
      required: "To submit this form you must agree!"
    },
    actions: {
      submit: "Contact us",
      resetInputs: "Reset form",
      resetValidation: "Reset validations"
    }
  },
  cards: {
    aid: {
      topic: "Aid",
      title: "needy families",
      description: "Be one of the families we support.",
      action1: "Regulation",
      action2: "Contact",
    },
    services: {
      topic: "Services",
      title: "Private class",
      description: "Hire one of our services and help us help.",
      action1: "Know more",
      action2: "Hire Us",
    },
  },
  footer: {
    madeBy: "Built by",
  },

  partners: {
    abong: {
      description:
        "The Brazilian Association of Non-Governmental Organizations – Organizations in Defense of Rights and Common Goods is a national platform that brings together organizations that fight against all forms of discrimination, inequalities, for the construction of sustainable ways of life and for the radicalization of democracy.",
      name: "Abong",
      action1: "",
      action2: "",
    },
    gamacidadao: {
      description:
        "On the air since 2012, with the aim of favoring community information and the regionalization of the news. It was founded by journalist Israel Carvalho and has been playing an important role in transmitting truthful and impartial news about the reality of the city and the DF.",
      name: "Gama Cidadao",
      action1: "",
      action2: "",
    },
    mlh: {
      description:
        "Major League Hacking (MLH) is a company that operates a league for student hackers. Move&Educa organizes hackathons so that students can share and learn new skills, in addition to putting them into practice in real day-to-day problems.",
      name: "MLH",
      action1: "",
      action2: "",
    },
    santos: {
      description:
        "Rescue the lives of unborn children who are at risk of being aborted and provide psychological, spiritual and material support to needy pregnant women and their children. Going to meet the mother or family who is thinking about having an abortion - because they have been victims of aggression, for financial reasons, affective trauma, depression, etc. - and raise awareness about life and abortion. Provide material (when necessary), psychological and spiritual support.",
      name: "Santos Inocentes",
      action1: "",
      action2: "",
    },
    github: {
      description:
        "GitHub is a source code hosting platform with version control using Git. It allows programmers, utilities or any user registered on the platform to contribute to private and/or Open Source projects from anywhere in the world. GitHub is widely used by programmers to disseminate their work or for other programmers to contribute to the project, in addition to promoting easy communication through resources that report problems or merge remote repositories (issues, pull request).",
      name: "GitHub",
      action1: "",
      action2: "",
    },
    acig: {
      description:
        "Associação Comercial e Industrial do Guará defends as some of its objectives and purposes the strengthening and representation of the business class; assist members in their interests, valuing their products and services; promoting economic and social development; offer opportunities for permanent professional qualification, with higher levels of education for workers, associates and the community, to increase their employability and income.",
      name: "ACIG",
      action1: "",
      action2: "",
    },
    iades: {
      description:
        "Support and Defense Institute for Brazilian Students – IADES BRAZIL is a civil, private, non-profit association with a social and educational character. A student representation entity that covers the various educational levels, has come to innovate and facilitate the student's life, focusing on quality results. And offering tranquility and access to everything the market offers is the differential that will prepare you for the challenges.",
      name: "IADES",
      action1: "",
      action2: "",
    },
    concurso: {
      description:
        "Provide free classes for contests, in person, in the Federal District and surrounding areas, but also trigger social actions in favor of the community.",
      name: "Amigos do Concurso",
      action1: "",
      action2: "",
    },
    drogas: {
      description:
        "The National Movement for Citizenship for Life – BRASIL SEM DROGAS has a supra-partisan and supra-religious character and has been debating the legalization of marijuana from a scientific, social and human point of view.",
      name: "Brasil sem Drogas",
      action1: "",
      action2: "",
    },
  },
  projects: {
    mover: {
      name: "Move Project",
      description:
        "Projeto Mover, originally called the interdisciplinary project save teaching, is a project designed to develop socio-emotional skills in students assisted through a study group. The methodology used is project-based learning.",
      action1: "Enroll",
      action2: "Know More",
    },
    privateClass: {
      name: "Private Classes",
      description:
        "Private classes taught by university students with the support of a specialized pedagogical team with proven experience in the education department and in private institutions. We cover all contents from literacy to preparatory subjects for college entrance exams.",
      action1: "Hire",
      action2: "Know More",
    },
    volunteerClasses: {
      name: "Volunteer Classes",
      description:
        "Seeking to help the community, we promote classes focused on solving competition exercises and the ENEM (National High School Examination). This is a project that we carry out in partnership with some institutions and individuals.",
      action1: "",
      action2: "Know More",
    },
    robotic: {
      name: "Robotics",
      description:
        "Project focuses on teaching electronic components, prototyping boards and basic programming notions. We are currently using Arduino, an open source electronics prototyping platform, allowing users to create interactive electronic objects.",
      action1: "Hire",
      action2: "Know More",
    },
    sicatroli: {
      name: "SICATROLI",
      description:
        "Book Registration and Exchange System is a software developed by Move&Educa with a focus on helping public, private and non-profit institutions with collection management. The system registers the books and allows the loan and exchange of books between people and institutions.",
      action1: "Buy",
      action2: "Know More",
    },
    mlh: {
      name: "MLH",
      description:
        "The Major League Hacking (MLH) is the official student hackathon league. Move&Educa organizes hackathons so that students can share and learn new skills, in addition to putting them into practice in real day-to-day problems. Come join one of our hackathons.",
      action1: "Enroll",
      action2: "Know More",
    },
    coaching: {
      name: "Advisory and Training",
      description:
        "Our associates offer advice to education professionals and public, private and non-profit institutions that seek new projects, bureaucratic and pedagogical modernization. We have trainings in different subtopics of education: Project-Based Learning, Global Problems of Knowledge How to Assess, Information Technology and Computing in Education, etc.",
      action1: "Hire",
      action2: "Know More",
    },
    graduation: {
      name: "College ?",
      description:
        "This project was thought up by university students who are members of Move&Educa. The main objective is to take teenagers to get to know the different universities, the different campuses and a wide variety of courses so that they can, in addition to finding out which course to take, discover the institution that best suits their profile.",
      action1: "Enroll",
      action2: "Know More",
    },
    formulario: {
      mover: {
        title: "Form - Mover Project",
        fields: {
          nome: "Full name of volunteer",
          areaInteresse: "Area of interest",
          motivo: "Why do you want to participate?",
          botao: "Submit"
        }
      },
      particular: {
        title: "Form - Private Class",
        fields: {
          nome: "Full name of student",
          idade: "Age",
          materia: "Desired subject",
          materias: ["Mathematics", "Portuguese", "Physics"],
          botao: "Request Class"
        }
      },
      erro: {
        titulo: "Choose a valid modality",
        instrucoes: "You must access a valid URL, such as:",
        exemplos: ["/formulario?tipo=mover", "/formulario?tipo=particular"]
      }
    },
  },
  organanizationPage: {
    head: "Our Organization",
    whatDoWeDo:
      "Our organization has made a difference in the lives of many children and adolescents, working in partnerships with schools, the community, other non-profit organizations and the government. Our main mission is to be a springboard for the personal and intellectual development of those who pass through here. We assist educators, leaders and public figures in the construction of education policies and in training for their implementation.",
    welcome: "Welcome to",
    mission: {
      head: "Mission",
      content: "Awakening the Consciousness of the Being through education."
    },
    vision: {
      head: "Vision",
      content: "To be an institution that collaborates with other educational institutions to consolidate 21st century skills¹."
    },
    values: "Values",
    twentyOneCenturySkills: {
      head: "21st Century Skills according to UNESCO",
      dialogTitle: "21st Century Skills"
    }
  },
  roles: {
    president: "President",
    financialOfficer: "Financial Officer",
    managingOfficer: "Managing Officer",
    generalSecretary: "General Secretary",
    member: "Member",
  },
  aside: {
    donationButton: "Support Us",
    socialMedia: "Social Media",
  },
  articles: [
    {
      titulo: "1st UDF Programming Olympiad",
      portal: "Gama Citizen",
    },
  ],
  about: [
    "Welcome to Move&Educa, a movement whose main objective is to raise awareness through education.",
    "Founded in 2020, Move&Educa operates autonomously and has established partnerships with different segments of society, covering areas such as education, health and social assistance.",
    "Our vision is to collaborate with other educational institutions in consolidating 21st century skills, as defined by UNESCO. We believe in the power of transformative education and the potential of every human being.",
    "Aligned with our values, we seek unity, political neutrality, respect, internal and external collaboration, integrity, sustainability, innovation and transparency in all our actions and decisions.",
    "Move&Educa, since its conception, emphasizes the importance of information literacy, critical thinking, communication, self-management, global awareness, creativity, financial literacy, resilience, teamwork and ethics.",
    "In accordance with our statutes, Move&Educa promotes education in all fields of knowledge, defends the right to access to quality education and continually seeks collaborations and strategic partnerships to improve the quality of education and promote the well-being of the community. ",
    "With a firm commitment to promoting inclusion, diversity and equity, Move&Educa is an ardent defender of human rights and strives to ensure that each initiative reflects these principles.",
    "As we move forward, we are always looking for opportunities to amplify our impact and make a positive difference. Whether through promoting ethics, peace, citizenship or defending the environment, we are here to serve, educate and inspire.",
    "Our efforts are guided by the principles of legality, impersonality, morality, publicity and efficiency. We never discriminate on the basis of race, sex, color, age, gender or belief, and we work with the firm conviction that education has the power to transform lives and societies.",
  ],
  values: [
    {
      title: "Good of the whole",
      description:
        "All actions are governed and inspired with a focus on the good of humanity, expanding the vision of the whole and understanding the interdependence of Homo Sapiens Sapiens with the environment.",
    },
    {
      title: "Union",
      description:
        "All projects and initiatives seek unity between institutions and beings, never choosing between one and the other, encouraging a look at different perspectives.",
    },
    {
      title: "Political Neutrality",
      description:
        "The organization remains neutral, without supporting specific candidates, believing that impartiality promotes unity.",
    },
    {
      title: "Respect",
      description:
        "Value and recognize the different perspectives of the Being, regardless of their culture, origin, beliefs and socioeconomic situation. This value is guided by active listening, so that the recognition of different perspectives is truly effective. ",
    },
    {
      title: "Internal Collaboration",
      description:
        "Clarify the objective of each project and initiative for all employees, ensuring aligned and cohesive actions. Constantly encouraging the exchange of ideas and feedback between employees values effective collaboration and alignment of objectives .",
    },
    {
      title: "Partnerships and Collaboration",
      description:
        "Establish and cultivate strategic partnerships with other educational institutions, recognizing that expanded collaboration and interinstitutional cooperation are essential to achieving transformative education in the 21st century. Move&Educa seeks not only to collaborate, but create synergies that enhance positive impacts on education.",
    },
    {
      title: "Integrity",
      description:
        "Act with honesty, transparency and ethics in all actions, always seeking coherence in actions based on the mission and values of Move&Educa.",
    },
    {
      title: "Sustainability",
      description:
        "Ensuring that the organization's actions and projects are sustainable, considering environmental, social and economic aspects, understanding that today's society is responsible for the legacy left for tomorrow's society.",
    },
    {
      title: "Innovation",
      description:
        "Encourage the search for new solutions and approaches to face the challenges of the 21st century.",
    },
    {
      title: "Transparency",
      description:
        "Ensuring that all the organization's actions and decisions are transparent to employees, partners and the community.",
    },
  ],
  skills: [
    "Information Literacy and ICT (Information and Communication Technologies): Ability to seek, evaluate, use and create information using digital technologies.",
    "Critical Thinking and Problem Solving: Evaluate information critically and make logical judgments; find solutions to complex challenges and problems.",
    "Communication and Collaboration: Express ideas clearly, work collaboratively and use different forms of communication, including digital.",
    "Self-learning and Self-Management: Ability to regulate and adjust one's own learning, set goals, manage time and tasks, and work independently.",
    "Global Consciousness and Citizenship: Understand and act on global issues; respect and value diversity; exercise rights and obligations in an informed and responsible manner.",
    "Creativity and Innovation: Imagining and creating new ideas, products or solutions to various issues.",
    "Financial and Economic Literacy: Understand how money works in practice, make informed decisions about resources, and understand the economic consequences of decisions.",
    "Resilience, Adaptability and Flexibility: Adapting to new and adverse situations, overcoming obstacles and learning from experience.",
    "Teamwork and Leadership: Working productively with others, taking responsibility, and leading when necessary.",
    "Ethics and Integrity: Understand and act in accordance with ethical principles, demonstrate honesty and integrity in all actions.",
  ],
  comingSoon: {
    head: "Page coming soon...",
    content: "See other pages we've already built!"
  },
  utils: {
    about: "About Our Organization",
    close: "Close"
  }
};
