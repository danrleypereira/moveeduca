<template>
  <div class="dashboard">
    <v-container
      fluid
      ma-0
      pa-0
      xs12
      md12
      class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row"
    >
      <v-flex xs12 md9 lg9 class="">
        <CardAbout
          v-for="(project, index) in projects"
          v-bind:key="(project.name + index)"
          v-bind:project="project"
        ></CardAbout>
      </v-flex>
      <v-flex xs12 md3 lg3 secondary class="scribble-background">
        <!-- <v-parallax
          dark
          :src="require('../../assets/scribbles/scribbles-scribbles-52.png')"
        > -->
        <Aside />
        <!-- </v-parallax> -->
      </v-flex>
    </v-container>
  </div>
</template>

<style>
.scribble-background {
  position: relative;
  overflow: hidden;
  /* transform: rotate(30deg); */
  background-image: url("../../assets/scribbles/scribbles-scribbles-88-white.png");
  /* background-image: url('../../assets/logo-branca.png'); */

  background-size: 100%;
  background-repeat: repeat-y;
  /* transition: all 0.7s ease; */
  /* animation: shake 4s linear 0 infinite normal none; */
}
/* @keyframes shake {
    0% {
      -webkit-transform: rotate(0deg)
    }
    25% {
      -webkit-transform: rotate(45deg)
    }
    50% {
      -webkit-transform: rotate(90deg)
    }
    75% {
      -webkit-transform: rotate(45deg)
    }
    100% {
      -webkit-transform: rotate(0deg)
    }
  } */
</style>

<script>
import CardAbout from "../../components/CardAbout";
import Aside from "../../components/Aside";

export default {
  components: {
    CardAbout,
    Aside,
  },
  data() {
    return {
      projects: [
        {
          name: () => this.getTextFromI18n("$vuetify.projects.mover.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.projects.mover.description"),
          img: {
            src: require("../../assets/projects/mover/abacus.svg"),
            alt: "ábaco",
          },
          action1: {
            name: () => this.getTextFromI18n("$vuetify.projects.mover.action1"),
            path: {
              path: "/formulario",
              query: { tipo: "mover" }
            }
          },
          action2: {
            name: () => this.getTextFromI18n("$vuetify.projects.mover.action2"),
            path: "/comingsoon",
          },
        },
        {
          name: () =>
            this.getTextFromI18n("$vuetify.projects.privateClass.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.projects.privateClass.description"),
          img: {
            src: require("../../assets/projects/private-classes/learning-student.svg"),
            alt: "professor e aluna",
          },
          action1: {
            name: () =>
              this.getTextFromI18n("$vuetify.projects.privateClass.action1"),
            path: {
              path: "/formulario",
              query: { tipo: "particular" }
            },
          },
          action2: {
            name: () =>
              this.getTextFromI18n("$vuetify.projects.privateClass.action2"),
            path: "/products/private-classes",
          },
        },
        {
          name: () =>
            this.getTextFromI18n(
              "$vuetify.projects.volunteerClasses.name"
            ),
          description: () =>
            this.getTextFromI18n(
              "$vuetify.projects.volunteerClasses.description"
            ),
          img: {
            src: require("../../assets/projects/volunteer-classes/blackboard-class2.svg"),
            alt: "quadro negro com a fórmula molecular da água (H2O)",
          },
          action1: {
            name: () =>
              this.getTextFromI18n(
                "$vuetify.projects.volunteerClasses.action1"
              ),
            path: false,
          },
          action2: {
            name: () =>
              this.getTextFromI18n(
                "$vuetify.projects.volunteerClasses.action2"
              ),
            path: "/comingsoon",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.projects.robotic.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.projects.robotic.description"),
          img: {
            src: require("../../assets/projects/robotic/robot1.svg"),
            alt: "professor e aluna",
          },
          action1: {
            name: () =>
              this.getTextFromI18n("$vuetify.projects.robotic.action1"),
            path: "/comingsoon",
          },
          action2: {
            name: () =>
              this.getTextFromI18n("$vuetify.projects.robotic.action2"),
            path: "/comingsoon",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.projects.sicatroli.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.projects.sicatroli.description"),
          img: {
            src: require("../../assets/projects/sicatroli/library-book.svg"),
            alt: "lupa apontando para livros",
          },
          action1: {
            name: () =>
              this.getTextFromI18n("$vuetify.projects.sicatroli.action1"),
            path: "/comingsoon",
          },
          action2: {
            name: () =>
              this.getTextFromI18n("$vuetify.projects.sicatroli.action2"),
            path: "/comingsoon",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.projects.mlh.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.projects.mlh.description"),
          img: {
            src: require("../../assets/projects/programming-34.svg"),
            alt: "peça de lego laranja em fundo azul claro",
          },
          action1: {
            name: () => this.getTextFromI18n("$vuetify.projects.mlh.action1"),
            path: "/comingsoon",
          },
          action2: {
            name: () => this.getTextFromI18n("$vuetify.projects.mlh.action2"),
            path: "/comingsoon",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.projects.coaching.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.projects.coaching.description"),
          img: {
            src: require("../../assets/projects/diploma-patent.svg"),
            alt: "Diploma genérico",
          },
          action1: {
            name: () =>
              this.getTextFromI18n("$vuetify.projects.coaching.action1"),
            path: "/comingsoon",
          },
          action2: {
            name: () =>
              this.getTextFromI18n("$vuetify.projects.coaching.action2"),
            path: "/comingsoon",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.projects.graduation.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.projects.graduation.description"),
          img: {
            src: require("../../assets/projects/graduation.svg"),
            alt: "Diploma em rolo e chapéu de graduação",
          },
          action1: {
            name: () =>
              this.getTextFromI18n("$vuetify.projects.graduation.action1"),
            path: "/comingsoon",
          },
          action2: {
            name: () =>
              this.getTextFromI18n("$vuetify.projects.graduation.action2"),
            path: "/comingsoon",
          },
        },
      ],
    };
  },
  methods: {
    getTextFromI18n: function (elementName) {
      return this.$vuetify.lang.t(elementName);
    },
  },
};
</script>