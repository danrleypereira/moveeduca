<template>
  <v-container fluid ma-0 xs12 md12 lg12 sucess 
    class="apareca d-flex flex-column darkblue"
  >
    <div class="d-flex flex-column">
      <h1 class="d-flex apareca-title justify-center">
        Move & Educa
      </h1>
      <h1 class="d-flex apareca-title justify-center">
        Instagram
      </h1>
    </div>
    <v-flex class="d-flex flex-row apareca-row justify-center">
      <!-- <a href="https://www.facebook.com/facigdf" target="_blank"
        class="d-flex apareca-social-icon"
      >
        <v-img
          :src="require('../assets/facebook-icon.svg')"
          min-height="60"
          height="80"
          max-height="100"
          max-width="60"
          contain
          class=""
        ></v-img>
      </a> -->
      <a href="https://www.instagram.com/moveeducaOSC" target="_blank"
        class="d-flex apareca-social-icon"
      >
        <v-img
          :src="require('../assets/instagram-icon.svg')"
          min-height="60"
          height="80"
          max-height="100"
          max-width="60"
          contain
          class=""
        ></v-img>
      </a>
    </v-flex>
  </v-container>
</template>
<style>
  .apareca {
    padding: 40px 10% 20px 10%;
    color: #FFFFFF;
  }
  .apareca-row {
    margin: 30px 0;
  }
  .apareca-title {
    margin-bottom: 10px;
  }
  .apareca-social-icon {
    margin: 0 0 0 30px;
  }
  @media screen and (max-width: 960px) {

  }
</style>
  
<script>
export default {
  data: () => ({

  }),
}
</script>