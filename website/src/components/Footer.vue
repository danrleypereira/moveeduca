<template>
  <v-container fluid ma-0 xs12 pa-0 md12 lg12
    class="d-flex accent flex-column"
  >
    <!-- <v-flex xs12 md12 
      class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row footer"
    >
      <v-flex xs12 md5 class="footer-content">
        <p class="">
          Ao lado do Edifício Consei <br>Guará II EQ 31/33 <br>
        </p>
        <a href="https://www.google.com/maps/place/Guará+II+EQ+31%2F33+Edifício+Consei+-+Guará,+Brasília+-+DF,+71065-315/@-15.8407017,-47.9726268,17z/data=!3m1!4b1!4m5!3m4!1s0x935a2e27b6742f21:0xd49b09e48d7a398f!8m2!3d-15.8407017!4d-47.9726268?hl=en"
          target="_blank"
          style="color: black;"
        >
          Mapa
        </a>
      </v-flex>
      <v-flex xs12 md5 class="footer-content">
        <p class="">
          facig2019@gmail.com <br> (61) 3384-8293
        </p>
        <a href="https://api.whatsapp.com/send?phone=5561994234712&text=Estou%20entrando%20em%20contato%20depois%20de%20ver%20o%20site%20da%20FACIG."
          target="_blank"
          style="color: black;"
        >
          Whatsapp
        </a>
      </v-flex>
      <v-flex xs2 md2 class="footer-content">
        <v-btn
          class=""
          outlined
          color="black"
          @click="top"
        >
          <v-icon>mdi-arrow-up</v-icon>
          Topo
        </v-btn>
      </v-flex>
    </v-flex> -->
    <v-divider></v-divider>
    <v-flex fluid ma-0 xs12 md12 lg12>
      <v-card-actions class="accent justify-center">
        <v-spacer></v-spacer>
        &copy;{{ new Date().getFullYear() }} 
        — {{ $vuetify.lang.t("$vuetify.footer.madeBy") }}
        &nbsp;
        <strong>
          <a
            href="https://danrleypereira.com.br"
            target="_blank"
            style="color: black;"  
          >
            Danrley Pereira
          </a>
        </strong>!
        <v-spacer></v-spacer>
        <v-btn
          ref="top-btn"
          fixed
          fab
          bottom
          small
          right
          id="top-btn"
          v-scroll="onScroll"
          color="accent"
          @click="top"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </v-card-actions>
    </v-flex>
  </v-container>
</template>
<style>
  .footer {
    padding: 5vw 0 5vw 2vw;
  }
  .footer-title {
    margin-bottom: 10px;
  }
  #top-btn {
    display: none; /* Hidden by default */
  }
  @media screen and (max-width: 960px) {
    .footer-content {
      margin-bottom: 30px;
    }
  }
</style>
  
<script>
export default {
  data: () => ({

  }),
  methods:{
    onScroll () {
      if (typeof window === 'undefined') return
      if(window.pageYOffset > 320) {
        this.$refs["top-btn"].$el.style.display = "block";
      } else {
        this.$refs["top-btn"].$el.style.display = "none";
      }
      
    },
    top(){
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    }
}
</script>