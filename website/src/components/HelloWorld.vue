<template>
  <v-container fluid ma-0 pa-0>
    <v-layout>
      <v-img
        :src="require('../assets/capa.png')"
        contain
      ></v-img>
    </v-layout>
    <v-layout class="justify-center align-center">
      <v-sheet
        class="mx-auto d-flex justify-center"
        color="accent"
        width="100vw"
      >
        <v-slide-group multiple show-arrows center-active class="justify-center">
          <v-slide-item
            v-for="(item, i) in items"
            :key="i"
            v-slot:default="{ active, toggle }"
          >
            <v-img
              class="ma-5 slide-img"
              :src="item.src"
              contain
              max-width="20vh"
            >
            <!-- o max-width está relacionado com a altura da tela-->
            </v-img>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-layout>
  </v-container>
</template>

<style scoped>
/* Estilos do componente HelloWorld */
.slide-img {
  transition: transform 0.3s ease;
}

.slide-img:hover {
  transform: scale(1.1);
}

.v-slide-group {
  justify-content: center !important;
}

.v-slide-group__wrapper {
  justify-content: center !important;
}
</style>

<script>
export default {
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    items: [
      {
        src: require('../assets/partners/mlh-removebg.png'),
      },
      {
        src: require('../assets/partners/logo-gama-cidadao.png'),
      },
      {
        src: require('../assets/partners/github.png'),
      },
      {
        src: require('../assets/partners/udf-logo.png'),
      },
      {
        src: 'https://i.imgur.com/mAOu6Vh.png',
      },
      // {
      //   src: require('../assets/partners/gdf.png'),
      // },
      // {
      //   src: require('../assets/partners/IADES-BRASIL.png'),
      // },
      // {
      //   src: require('../assets/partners/acig-logo.png'),
      // },
      // {
      //   src: require('../assets/partners/brasil-sem-drogas-logo-removebg.png'),
      // },
      // {
      //   src: require('../assets/partners/santos-inocente-logo-removebg.png'),
      // },
      // {
      //   src: require('../assets/partners/amigos-do-concurso-removebg.png'),
      // },
      
    ],
    model: null,
  }),
};
</script>
