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
          :key="(project.name + index)"
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
}
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
          name: () => this.getTextFromI18n("$vuetify.partners.abong.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.partners.abong.description"),
          img: {
            src: require("../../assets/partners/abong.png"),
            alt: "quadro negro com a fórmula molecular da água (H2O)",
          },
          action1: {
            name: () => this.getTextFromI18n("$vuetify.partners.abong.action1"),
            path: false,
          },
          action2: {
            name: () => this.getTextFromI18n("$vuetify.partners.abong.action2"),
            path: "",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.partners.santos.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.partners.santos.description"),
          img: {
            src: require("../../assets/partners/santos-inocente-logo.jpg"),
            alt: "professor e aluna",
          },
          action1: {
            name: () =>
              this.getTextFromI18n("$vuetify.partners.santos.action1"),
            path: "",
          },
          action2: {
            name: () =>
              this.getTextFromI18n("$vuetify.partners.santos.action2"),
            path: "",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.partners.github.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.partners.github.description"),
          img: {
            src: require("../../assets/partners/github.png"),
            alt: "professor e aluna",
          },
          action1: {
            name: () =>
              this.getTextFromI18n("$vuetify.partners.github.action1"),
            path: "",
          },
          action2: {
            name: () =>
              this.getTextFromI18n("$vuetify.partners.github.action2"),
            path: "",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.partners.acig.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.partners.acig.description"),
          img: {
            src: require("../../assets/partners/acig.jpg"),
            alt: "ábaco",
          },
          action1: {
            name: () => this.getTextFromI18n("$vuetify.partners.acig.action1"),
            path: "",
          },
          action2: {
            name: () => this.getTextFromI18n("$vuetify.partners.acig.action2"),
            path: "",
          },
        },
        {
          name: () =>
            this.getTextFromI18n("$vuetify.partners.gamacidadao.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.partners.gamacidadao.description"),
          img: {
            src: require("../../assets/partners/gamacidadao.jpg"),
            alt: "lupa apontando para livros",
          },
          action1: {
            name: () =>
              this.getTextFromI18n("$vuetify.partners.gamacidadao.action1"),
            path: "",
          },
          action2: {
            name: () =>
              this.getTextFromI18n("$vuetify.partners.gamacidadao.action2"),
            path: "",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.partners.mlh.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.partners.mlh.description"),
          img: {
            src: require("../../assets/partners/mlh.jpg"),
            alt: "peça de lego laranja em fundo azul claro",
          },
          action1: {
            name: () => this.getTextFromI18n("$vuetify.partners.mlh.action1"),
            path: "",
          },
          action2: {
            name: () => this.getTextFromI18n("$vuetify.partners.mlh.action2"),
            path: "",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.partners.iades.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.partners.iades.description"),
          img: {
            src: require("../../assets/partners/aides.jpg"),
            alt: "ábaco",
          },
          action1: {
            name: () => this.getTextFromI18n("$vuetify.partners.iades.action1"),
            path: "",
          },
          action2: {
            name: () => this.getTextFromI18n("$vuetify.partners.iades.action2"),
            path: "",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.partners.concurso.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.partners.concurso.description"),
          img: {
            src: require("../../assets/partners/amigos-do-concurso.jpg"),
            alt: "Diploma genérico",
          },
          action1: {
            name: () =>
              this.getTextFromI18n("$vuetify.partners.concurso.action1"),
            path: "",
          },
          action2: {
            name: () =>
              this.getTextFromI18n("$vuetify.partners.concurso.action2"),
            path: "",
          },
        },
        {
          name: () => this.getTextFromI18n("$vuetify.partners.drogas.name"),
          description: () =>
            this.getTextFromI18n("$vuetify.partners.drogas.description"),
          img: {
            src: require("../../assets/partners/brasil-sem-drogas-logo.png"),
            alt: "Diploma em rolo e chapéu de graduação",
          },
          action1: {
            name: () =>
              this.getTextFromI18n("$vuetify.partners.drogas.action1"),
            path: "",
          },
          action2: {
            name: () =>
              this.getTextFromI18n("$vuetify.partners.drogas.action2"),
            path: "",
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