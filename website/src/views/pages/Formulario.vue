<template>
  <v-container fluid ma-0 pa-0>
    <v-container
      fluid ma-0 pa-0 xs12 md12
      class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row"
    >
      <v-flex xs12 md7 lg7>
        <v-container>
          <v-card class="pa-4">
            <GeneralForm :projectType="tipo" />
          </v-card>
        </v-container>
      </v-flex>
      <v-flex xs12 md5 lg5 secondary class="scribble-background">
        <Aside />
      </v-flex>
    </v-container>
  </v-container>
</template>

<script>
import Aside from "../../components/Aside";
import GeneralForm from "../../components/GeneralForm";

export default {
  components: {
    Aside,
    GeneralForm,
  },
  computed: {
    tipo() {
      return this.$route.query.tipo;
    },
  },
};
</script>
