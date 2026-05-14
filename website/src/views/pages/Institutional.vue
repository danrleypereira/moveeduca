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
        <v-btn color="primary" tile @click="downloadEstatuto" class="mx-4 my-2 ml-9" x-large>Visualizar Estatuto</v-btn>
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
            :key="member.bioKey + index"
            cols="12"
            :md="index < 2 ? '6' : '4'"
            class="flex-child"
          >
            <v-card
              class="mx-auto member-card"
              max-width="434"
              tile
              @click="openProfile(member)"
            >
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
                          {{ getDisplayName(member) }}
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

        <v-dialog v-model="profileDialog" transition="dialog-bottom-transition" max-width="600">
          <v-card v-if="selectedMember">
            <v-toolbar color="primary" dark>
              <v-toolbar-title class="text-h6">
                {{ getDisplayName(selectedMember) }}
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text class="pt-6">
              <v-row no-gutters align="center">
                <v-col cols="12" sm="4" class="text-center pb-4 pb-sm-0">
                  <v-avatar size="140" color="grey lighten-2">
                    <v-img v-if="selectedMember.profileImg" :src="selectedMember.profileImg"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="12" sm="8" class="pl-sm-4">
                  <div class="text-subtitle-1 font-weight-bold mb-2">
                    {{ selectedMember.role() }}
                  </div>
                  <p class="text-body-2" style="text-align: justify">
                    {{ getBio(selectedMember) }}
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="profileDialog = false">
                {{ this.$vuetify.lang.t("$vuetify.founders.dialogClose") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      profileDialog: false,
      selectedMember: null,
      members: [
        {
          bioKey: "israel",
          role: () => this.getTextFromI18n("$vuetify.roles.president"),
          profileImg: require("../../assets/members/israel.jpeg"),
        },
        {
          bioKey: "sebastiao",
          role: () => this.getTextFromI18n("$vuetify.roles.vice"),
          profileImg: require("../../assets/members/sebastiao.jpeg"),
        },
        {
          bioKey: "danrley",
          role: () => this.getTextFromI18n("$vuetify.roles.financialOfficer"),
          profileImg: require("../../assets/members/danrley.jpeg"),
        },
        {
          bioKey: "polyana",
          role: () => this.getTextFromI18n("$vuetify.roles.generalSecretary"),
          profileImg: require("../../assets/members/polyana.jpeg"),
        },
        {
          bioKey: "marilia",
          role: () => this.getTextFromI18n("$vuetify.roles.administrativeCouncil"),
          profileImg: require("../../assets/members/marilia.jpeg"),
        },
        {
          bioKey: "kerlla",
          role: () => this.getTextFromI18n("$vuetify.roles.administrativeCouncil"),
          profileImg: require("../../assets/members/kerlla.jpeg"),
        },
        {
          bioKey: "paulo",
          role: () => this.getTextFromI18n("$vuetify.roles.administrativeCouncil"),
          profileImg: require("../../assets/members/paulo.jpeg"),
        },
        {
          bioKey: "aulus",
          role: () => this.getTextFromI18n("$vuetify.roles.fiscalCouncil"),
          profileImg: require("../../assets/members/aulus.jpeg"),
        },
        {
          bioKey: "carlos",
          role: () => this.getTextFromI18n("$vuetify.roles.fiscalCouncil"),
          profileImg: require("../../assets/members/carlos.jpeg"),
        },
        {
          bioKey: "ariana",
          role: () => this.getTextFromI18n("$vuetify.roles.fiscalCouncil"),
          profileImg: require("../../assets/members/ariana.jpeg"),
        },
      ],
    };
  },
  methods: {
    getTextFromI18n: function (elementName) {
      return this.$vuetify.lang.t(elementName);
    },
    getDisplayName(member) {
      return this.$vuetify.lang.t(`$vuetify.founders.${member.bioKey}.displayName`);
    },
    getBio(member) {
      return this.$vuetify.lang.t(`$vuetify.founders.${member.bioKey}.bio`);
    },
    openProfile(member) {
      this.selectedMember = member;
      this.profileDialog = true;
    },
    downloadEstatuto() {
      const link = document.createElement('a');
      link.href = '/docs/Estatuto Move & Educa.pdf';
      link.download = 'Estatuto Move & Educa.pdf';
      link.click();
    }
  },
};
</script>

<style scoped>
.member-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.member-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>
