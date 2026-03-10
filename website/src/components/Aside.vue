<template>
  <v-container fluid ma-0 px-0 py-0 class="secondary">
    <v-flex xs12 md12 lg12 class="d-flex flex-column align-center">
      <v-btn
        color="accent"
        class="title font-weight-black my-5"
        to="/comingsoon"
      >
        {{ $vuetify.lang.t("$vuetify.aside.donationButton") }}
      </v-btn>
      <v-card
        v-for="(card, index) in cards"
        :key="card.title + index"
        :class="'mx-0 ' + !index ? 'my-2' : 'my-0'"
        max-width="90%"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              {{ card.topic() }}
            </div>
            <v-list-item-title class="headline mb-1">
              {{ card.title() }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ card.description() }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="90" color="white">
            <v-img :src="card.img" contain max-width="60"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn text :to="getRouterLink(card.action1)">
            {{ card.action1.name() }}
          </v-btn>
          <v-btn text :color="!card.buttonCollor ? '' : card.buttonCollor" :to="getRouterLink(card.action2)">
            {{ card.action2.name() }}
          </v-btn>
        </v-card-actions>
      </v-card>
      <SocialMidia />
    </v-flex>
  </v-container>
</template>

<style>
</style>

<script>
import SocialMidia from "./SocialMidia";

export default {
  components: {
    SocialMidia,
  },
  data() {
    return {
      cards: [
        {
          topic: () => this.getTextFromI18n("$vuetify.cards.aid.topic"),
          title: () => this.getTextFromI18n("$vuetify.cards.aid.title"),
          description: () =>
            this.getTextFromI18n("$vuetify.cards.aid.description"),
          img: require("../assets/family.svg"),
          action1: {
            name: () => this.getTextFromI18n("$vuetify.cards.aid.action1"),
            link: "/aid/needy-families"
          },
          action2: {
            name: () => this.getTextFromI18n("$vuetify.cards.aid.action2"),
            link: "/contact"
          },
          buttonCollor: false,
        },
        {
          topic: () => this.getTextFromI18n("$vuetify.cards.services.topic"),
          title: () => this.getTextFromI18n("$vuetify.cards.services.title"),
          description: () =>
            this.getTextFromI18n("$vuetify.cards.services.description"),
          img: require("../assets/teacher3.svg"),
          action1: {
            name: () => this.getTextFromI18n("$vuetify.cards.services.action1"),
            link: "/products/private-classes"
          },
          action2: {
            name: () => this.getTextFromI18n("$vuetify.cards.services.action2"),
            link: {
              path: "/formulario",
              query: { tipo: "particular" }
            }
          },
          buttonCollor: "purple",
        },
      ],
    };
  },
  methods: {
    getTextFromI18n: function (elementName) {
      return this.$vuetify.lang.t(elementName);
    },
    getRouterLink(action) {
      if (typeof action.link === 'object') {
        return action.link;
      }
      return { path: action.link };
    }
  },
};
</script>