<template>
  <nav>
    <v-app-bar app hide-on-scroll prominent color="primary">
      <template #extension>
        <v-spacer></v-spacer>
        <v-toolbar-items class="d-none d-sm-block">
          <v-btn
            v-for="item in menu"
            :key="item.icon"
            :to="item.route"
            text
            color="darkblue"
            >{{ item.title() }}</v-btn
          >
          <v-btn key="language" icon color="white" @click="spinLanguage">
            <v-icon>mdi-cached</v-icon>
            {{ isEnglish ? `en` : `pt` }}
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-container class="d-flex d-sm-none justify-space-between">
          <h4
            style="
              color: white;
              font-style: italic;
              font-family: 'Indie Flower';
            "
          >
            {{ $vuetify.lang.t("$vuetify.acronym") }}
          </h4>
          <v-btn color="blue" dark @click.stop="drawer = !drawer" right>
            <v-icon class="ma-2">mdi-menu</v-icon>
          </v-btn>
        </v-container>
        <!-- <v-spacer></v-spacer> -->
      </template>
      <v-container fluid ma-0 pa-0>
        <v-layout row wrap align-center>
          <v-flex
            md9
            sm12
            class="d-flex align-center flex-row"
            :class="{ 'justify-center': $vuetify.breakpoint.smAndDown }"
          >
            <a href="/" class="">
              <v-img
                :src="require('../assets/logo-branca.png')"
                height="120"
                max-height="180"
                max-width="200"
                contain
              ></v-img>
            </a>
            <h1 class="navbar-title d-none d-sm-block" style="">
              {{ $vuetify.lang.t("$vuetify.organizationName") }}
            </h1>
          </v-flex>
          <v-flex xs3 md3 sm3 class="d-none d-sm-block">
            <v-flex xs12 class="d-flex justify-space-around">
              <v-btn
                href="https://api.whatsapp.com/send?phone=5561994234712&text=Estou%20entrando%20em%20contato%20depois%20de%20ver%20o%20site%20da%20FACIG."
                target="_blank"
                color="accent"
                class=""
              >
                <span class="ma-2 font-weight-black">
                  {{ $vuetify.lang.t("$vuetify.navBar.join") }}
                </span>
              </v-btn>
              <v-btn
                to="/Login"
                target=""
                color="white"
                icon
                outlined
                fab
                small
                class=""
              >
                <v-icon class="ma-2">mdi-account</v-icon>
              </v-btn>
            </v-flex>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            src="https://pngimage.net/wp-content/uploads/2018/06/user-account-png-1.png"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ $vuetify.lang.t("$vuetify.loginSystem.notLogged") }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in menu"
          :key="item.title()"
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon class="ma-2">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title() }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            key="language"
            outlined
            block
            color="indigo"
            @click="spinLanguage"
          >
            <v-icon>mdi-cached</v-icon>
            {{ isEnglish ? `en` : `pt` }}
          </v-btn>
        </div>
        <div v-if="logged()" class="pa-2">
          <v-btn block>{{ $vuetify.lang.t("$vuetify.loginSystem.logout") }}</v-btn>
        </div>
        <div v-else class="pa-2">
          <v-btn color="primary" to="/Login" block> 
            {{ $vuetify.lang.t("$vuetify.loginSystem.login") }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<style>
.navbar-title {
  margin-left: 20px;
  color: white;
  font-style: italic;
  font-family: "Indie Flower";
}
/* @media screen and (max-width: 960px) {
    .navbar-title {
      margin-left: 10px;
      font-size: 1em;
    }
  } */
</style>

<script>
export default {
  data() {
    return {
      vuetify: this.$vuetify,
      drawer: null,
      isEnglish: false,
      menu: [
        {
          icon: "mdi-home",
          title: () => this.getTextFromI18n("$vuetify.navBar.home"),
          route: "/",
        },
        {
          icon: "mdi-home-city-outline",
          title: () => this.getTextFromI18n("$vuetify.navBar.institutional"),
          route: "/institutional",
        },
        {
          icon: "mdi-folder-multiple-outline",
          title: () => this.getTextFromI18n("$vuetify.navBar.projects"),
          route: "/projects",
        },
        {
          icon: "mdi-home-group",
          title: () => this.getTextFromI18n("$vuetify.navBar.partners"),
          route: "/partners",
        },
        {
          icon: "mdi-phone-classic",
          title: () => this.getTextFromI18n("$vuetify.navBar.contact"),
          route: "/contact",
        },
      ],
    };
  },
  methods: {
    logged: function () {
      return false;
    },
    spinLanguage: function () {
      this.isEnglish = !this.isEnglish;
      this.isEnglish
        ? (this.$vuetify.lang.current = "en")
        : (this.$vuetify.lang.current = "pt");
    },
    getTextFromI18n: function (elementName) {
      return this.$vuetify.lang.t(elementName);
    },
  },
};
//mdi-hand-heart
//mdi-head-cog-outline
//head-lightbulb-outline
//mdi-account-group
//mdi-domain
</script>

<style>
</style>