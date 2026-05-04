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
        <InstitutionalInfo></InstitutionalInfo>
        <v-card color="#385F73" dark class="mx-4 my-2">
          <v-card-title class="text-h5">
            {{ this.$vuetify.lang.t("$vuetify.organanizationPage.head") }}
          </v-card-title>

          <v-card-subtitle style="text-align: justify">
            {{ this.$vuetify.lang.t("$vuetify.organanizationPage.whatDoWeDo") }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn v-if="false" text> Listen Now </v-btn>
          </v-card-actions>
        </v-card>
        <v-row class="mx-4 my-2">
          <v-col
            v-for="(member, index) in members"
            :key="member.role + index"
            cols="12"
            :md="index < 2 ? '6' : '4'"
            class="flex-child"
          >
            <v-card class="mx-auto" max-width="434" tile>
              <v-img
                height="100%"
                src="https://observatorio3setor.org.br/wp-content/uploads/2020/09/316844-P8VCX3-12.jpg"
              >
                <v-row align="end" class="fill-height">
                  <v-col align-self="start" class="pa-0" cols="12">
                    <v-avatar class="profile" color="grey" size="164" tile>
                      <v-img :src="member.profileImg"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col class="py-0">
                    <v-list-item color="rgba(0, 4, 0, .4)" dark>
                      <v-list-item-content>
                        <v-list-item-title class="text-h6">
                          {{ member.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ member.role() }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                </v-row>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-row>
          <h1>Diretoria</h1>
        </v-row>
        <v-row class="flex-child mx-4 my-2">
          <v-col cols="12" md="4">
              <v-sheet
                class="d-flex"
                color="red lighten-3"
                height="250"
              >
                <sheet-footer>
                  #5: (2r x 2c)
                </sheet-footer>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="4">
              <v-sheet
                class="d-flex"
                color="red lighten-3"
                height="250"
              >
                <sheet-footer>
                  #5: (2r x 2c)
                </sheet-footer>
              </v-sheet>
            </v-col>
            <v-col cols="12" md="4">
              <v-sheet
                class="d-flex"
                color="red lighten-3"
                height="250"
              >
                <sheet-footer>
                  #5: (2r x 2c)
                </sheet-footer>
              </v-sheet>
            </v-col>
        </v-row> -->
      </v-flex>
      <v-flex xs12 md3 lg3 secondary class="scribble-background">
        <Aside></Aside>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import Aside from "../../components/Aside";
import InstitutionalInfo from "../../components/InstitutionalInfo";

export default {
  components: {
    Aside,
    InstitutionalInfo
  },
  data() {
    return {
      members: [
        {
          name: "Ademar Lamoglia",
          role: () => this.getTextFromI18n("$vuetify.roles.president"),
          profileImg: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
        },
        {
          name: "Danrley Pereira",
          role: () => this.getTextFromI18n("$vuetify.roles.financialOfficer"),
          profileImg: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
        },
        {
          name: "Paulo Fernando",
          role: () => this.getTextFromI18n("$vuetify.roles.managingOfficer"),
          profileImg: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
        },
        {
          name: "Polyana Cunha",
          role: () => this.getTextFromI18n("$vuetify.roles.generalSecretary"),
          profileImg: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
        },
        {
          name: "Israel Carvalho",
          role: () => this.getTextFromI18n("$vuetify.roles.member"),
          profileImg: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
        },
        {
          name: "Claudina Aguiar",
          role: () => this.getTextFromI18n("$vuetify.roles.member"),
          profileImg: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
        },
        {
          name: "Eduarda Aguiar",
          role: () => this.getTextFromI18n("$vuetify.roles.member"),
          profileImg: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
        },
        {
          name: "Geniv Catarina",
          role: () => this.getTextFromI18n("$vuetify.roles.member"),
          profileImg: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
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