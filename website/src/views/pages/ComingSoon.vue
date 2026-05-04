<template>
  <div class="dashboard">
    <v-container
      fluid ma-0 pa-0 xs12 md12 
      class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row"
    >
      <v-flex xs12 md9 lg9 pt-10 class="d-flex flex-column align-center">
          <h1>{{ this.$vuetify.lang.t('$vuetify.comingSoon.head') }}</h1>
          <v-img :src="require('../../assets/under-construction.png')" contain max-width="90%" max-height="70%"></v-img>
          <p>
            {{ this.$vuetify.lang.t('$vuetify.comingSoon.content') }}
          </p>
      </v-flex>
      <v-flex xs12 md3 lg3 secondary class="scribble-background">
        <Aside/>
      </v-flex>
    </v-container>
  </div>
</template>

<style>

</style>

<script>
import Aside from '../../components/Aside.vue';

export default {
  components: {
    Aside,
  },
  data: () => ({
  })
}
</script>