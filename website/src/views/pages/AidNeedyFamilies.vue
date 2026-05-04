<template>
  <v-container fluid ma-0 pa-0>
    <v-container
      fluid
      ma-0
      pa-0
      xs12
      md12
      class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row"
    >
      <v-flex xs12 md7 lg7>
        <v-container>
          <v-card class="pa-4">
            <h2>{{ getTextFromI18n('$vuetify.aidDetails.title') }}</h2>
            
            <v-divider class="my-4"></v-divider>
            
            <p class="text-justify mb-4">
              {{ getTextFromI18n('$vuetify.aidDetails.description') }}
            </p>
            
            <h3 class="mt-4 mb-2">{{ getTextFromI18n('$vuetify.aidDetails.requirementsTitle') }}</h3>
            <ul class="mb-4">
              <li>{{ getTextFromI18n('$vuetify.aidDetails.req1') }}</li>
              <li>{{ getTextFromI18n('$vuetify.aidDetails.req2') }}</li>
              <li>{{ getTextFromI18n('$vuetify.aidDetails.req3') }}</li>
            </ul>
            
            <h3 class="mt-4 mb-2">{{ getTextFromI18n('$vuetify.aidDetails.docsTitle') }}</h3>
            <ul class="mb-4">
              <li>{{ getTextFromI18n('$vuetify.aidDetails.doc1') }}</li>
              <li>{{ getTextFromI18n('$vuetify.aidDetails.doc2') }}</li>
              <li>{{ getTextFromI18n('$vuetify.aidDetails.doc3') }}</li>
              <li>{{ getTextFromI18n('$vuetify.aidDetails.doc4') }}</li>
              <li>{{ getTextFromI18n('$vuetify.aidDetails.doc5') }}</li>
            </ul>
            
            <v-btn 
              color="purple" 
              class="mt-4" 
              :to="{ path: '/formulario', query: { tipo: 'familia' } }"
            >
              {{ getTextFromI18n('$vuetify.aidDetails.button') }}
            </v-btn>
            
          </v-card>
        </v-container>
      </v-flex>
      <v-flex xs12 md5 lg5 secondary class="scribble-background">
        <Aside />
      </v-flex>
    </v-container>
  </v-container>
</template>

<style>
.scribble-background {
  background-image: url("../../assets/scribbles/scribbles-scribbles-88-white.png");
  background-size: 100%;
  background-repeat: repeat-y;
}
</style>

<script>
import Aside from "../../components/Aside";

export default {
  components: {
    Aside,
  },
  methods: {
    getTextFromI18n(elementName) {
      return this.$vuetify.lang.t(elementName);
    },
  },
};
</script>
