<template>
  <v-container fluid ma-0 pa-0 class="midia-articles">
    <div class="d-flex flex-column">
      <h1 class="d-flex justify-center">Saiu na Mídia</h1>
    </div>
    <div class="d-flex xs12 flex-wrap">
      <v-hover v-slot:default="{ hover }" v-for="(article, i) in articles" :key="i">
        <div class="d-flex xs6 article justify-center flex-column" :style="{ 'background-color': article.color }">
          <div :class="`${hover ? 'disappear' : ''} d-flex xs12 flex-column`" style="height: 100%">
            <p class="d-flex text-justify align-center font-weight-bold mr-3 ml-3" style="flex: 1">
              {{ article.titulo() }}
            </p>
            <h3 class="d-flex justify-center">{{ article.portal() }}</h3>
          </div>

          <v-expand-transition class="">
            <a :href="article.href" target="_blank"
              class="align-self-center midia-logo transition-fast-in-fast-out orange darken-2" v-if="hover">
              <v-img :src="article.logo" contain class="article-img">
              </v-img>
            </a>
          </v-expand-transition>
        </div>
      </v-hover>
    </div>
  </v-container>
</template>
<style>
.midia-articles {
  position: relative;
}

.article {
  width: 50%;
  height: 20vh;
  color: antiquewhite;
}

.article-img {
  height: 20vh;
}

.midia-logo {
  opacity: .5;
  position: absolute;
  width: 50%;
}

.disappear {
  opacity: 0;
}

@media screen and (min-width: 960px) {
  .article {
    font-size: 1.3vw;
    line-height: 2vw;
  }
}

@media screen and (max-width: 960px) {
  .article {
    height: 35vh;
  }

  .article-img {
    height: 35vh;
  }
}
</style>

<script>
export default {
  data() {
    return {
      articles: [
        {
          titulo: () => this.getTextFromI18n("$vuetify.articles[0].titulo"),
          logo: require('../assets/jornais/gamacidadao.jpg'),
          href: 'https://www.gamacidadao.com.br/1a-olimpiadas-de-programacao-da-udf/',
          portal: () => this.getTextFromI18n("$vuetify.articles[0].portal"),
          color: '#000000',
        },
        // {
        //   titulo: 'Associação Comercial vai reeditar a Facig',
        //   logo: require('../assets/jornais/jornaldoguara.jpg'),
        //   href: 'https://jornaldoguara.com.br/2019/07/05/associacao-comercial-vai-reeditar-a-facig/',
        //   portal: 'Jornal do Guará',
        //   color: '#881319',
        // },
        // {
        //   titulo: 'FACIG já movimenta o Guará: Deputado Distrital Reginaldo Sardinha visita ACIG',
        //   logo: require('../assets/jornais/guaranews.png'),
        //   href: 'http://guaranews.com.br/facig-ja-movimenta-o-guara-deputado-distrital-sardinha-visita-acig/',
        //   name: 'Guara News',
        //   color: '#CB0000',
        // },
        // {
        //   titulo: 'CDDF/CD Guará: José Augusto representa o CDDF na 4a FACIG',
        //   logo: require('../assets/jornais/egnews.png'),
        //   href: 'http://egnews.com.br/politica/distrito-federal/cddf-cd-guara-jose-augusto-representa-o-cddf-na-4a-facig/',
        //   name: 'EG News',
        //   color: '#00142C',
        // },
      ],
    }
  },
  methods: {
    getTextFromI18n: function (elementName) {
      return this.$vuetify.lang.t(elementName);
    },
  },
}
</script>