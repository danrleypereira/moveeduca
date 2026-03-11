<template>
  <v-container fluid ma-0 class="primary about-facig">
    <div class="d-flex flex-column about-title justify-center">
      <h1 class="d-flex"><strong>{{ this.$vuetify.lang.t('$vuetify.utils.about') }}</strong></h1>
      <v-flex class="d-flex flex-row">
        <!-- <v-img :src="require('../assets/facig-word.png')" height="70%" max-height="90%" max-width="70%" contain
          class=""></v-img> -->
      </v-flex>
    </div>
    <div class="about-section">
      <div
        v-for="(paragraph, index) in this.getParagraphs()"
        :key="index"
        class="text-justify paragraph"
      >
        {{ paragraph }}
      </div>
    </div>

  </v-container>
</template>
<style>
.about-facig {
  padding: 40px 5%;
  color: #FFFFFF;
}

.about-title {
  font-family: 'Geomanist webfont', Arial, sans-serif;
  font-size: 2vw;
  line-height: 2vw;
  margin-bottom: 30px;
}

@media screen and (max-width: 960px) {
  .about-title {
    font-size: 4vw;
    line-height: 4vw;
  }

  .paragraph {
    font-size: 5vw;
    line-height: 7vw;
  }
}

.about-section {
  font-family: 'Geomanist webfont', Arial, sans-serif;
  font-size: 1.7vw;
  line-height: 3vw;
  font-weight: 300;
  text-align: left;
}

.paragraph {
  max-width: 650px;
  margin: 0 30px 20px 30px;
}</style>

<script>
export default {
  methods: {
    getParagraphs: function () {
      let i = 0;
      const paragraphs = []
      while(i < Infinity) {
        let paragraph = this.$vuetify.lang.t(`$vuetify.about[${i}]`);
        if(paragraph === `$vuetify.about[${i++}]`)// paragraph index not found
          break;
        paragraphs.push(paragraph);
      }
      return paragraphs;
    }
  }
}
</script>