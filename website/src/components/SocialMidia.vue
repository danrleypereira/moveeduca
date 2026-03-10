<template>
  <v-container fluid ma-0 secondary class="social-midia radius">
    <div class="d-flex">
      <h1 class="d-flex social-midia-title">
        {{ $vuetify.lang.t("$vuetify.aside.socialMedia") }}
      </h1>
    </div>
    <v-flex class="d-flex flex-row social-midia-row">
      <a href="https://www.instagram.com/moveeducaosc/" target="_blank" class="d-flex">
        <v-img
          :src="require('../assets/instagram-icon.svg')"
          min-height="20"
          height="40"
          max-height="60"
          max-width="60"
          contain
          class=""
        ></v-img>
        <div class="text-justify align-center d-flex">
          instagram.com/<b>moveeducaOSC</b>
        </div>
      </a>
    </v-flex>
    <v-flex class="d-flex flex-row social-midia-row">
      <!-- <a href="https://www.facebook.com/facigdf" target="_blank" class="d-flex">
        <v-img
          :src="require('../assets/facebook-icon.svg')"
          min-height="20"
          height="40"
          max-height="60"
          max-width="60"
          contain
          class=""
        ></v-img>
        <div class="text-justify align-center d-flex">
          facebook.com/<b>moveeduca</b>
        </div>
      </a> -->
    </v-flex>
  </v-container>
</template>
<style>
  .social-midia {
    padding: 40px 0 0 5%;
    color: #FFFFFF;
  }
  .social-midia-row {
    margin: 30px 0;
    font-size: 1.5vw;
  }
  .social-midia-row a {
    color: #FFFFFF !important;
    text-decoration: none;
  }
  .social-midia-title {
    margin-bottom: 10px;
  }
  .radius {
    border-radius: 10px;
  }
  @media screen and (max-width: 960px) {
    .social-midia-row {
      font-size: 5vw;
    }
  }
</style>
  
<script>
export default {
  data: () => ({

  }),
}
</script>