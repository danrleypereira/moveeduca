<template>
  <v-app>
    <NavBar/>

    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');
</style>

<script>
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  },
};
</script>
