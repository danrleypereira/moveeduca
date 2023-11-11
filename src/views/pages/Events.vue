<template>
  <div class="dashboard">
    <v-container
      fluid ma-0 pa-0 xs12 md12 
      class="d-flex flex-column flex-md-row flex-lg-row flex-xl-row"
    >
      <!-- Updated v-flex component -->
      <v-flex xs12 md9 lg9 pt-10 class="d-flex flex-column align-center">
        <v-img class="" :src="image3" contain max-width="70%" max-height="50%"></v-img>
        <div class="w-100 h-screen" style="aspect-ratio:16/9; position: relative;">
          <iframe allow="autoplay; fullscreen" allowfullscreen="" style="cursor:pointer;" class="w-full h-full absolute top-0 left-0" src="https://player.vimeo.com/video/799664489?h=612f295f67&amp;autopause=0&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;playsinline=1&amp;transparent=1&amp;controls=0" data-ready="true" frameborder="0"></iframe>
        </div>
          <div class="">
          <h1>eXtreme Programming with React and .NET Workshop</h1>
          <p>Join us at Centro Universitário do Distrito Federal (UDF) for an enlightening workshop on React and .NET. Explore agile methodologies, including TDD and Pair Programming, in an interactive and collaborative environment.</p>
          <p><strong>When:</strong> Wednesday, 22 November 2023, 20h-22h & Saturday, 25 November 2023, 8:30h-12h</p>
          <p><strong>Where:</strong> Online via Google Meets</p>
          <p>Learn through engaging hands-on sessions, tackling katas and more. We progress together, ensuring no one is left behind.</p>
          <!-- Placeholder for images -->
          <v-img :src="image1" contain max-width="90%" max-height="70%"></v-img>
          <v-img :src="image2" contain max-width="90%" max-height="70%"></v-img>
        </div>
      </v-flex>
      <v-flex xs12 md3 lg3 secondary class="scribble-background">
        <Aside/>
      </v-flex>
    </v-container>
  </div>
</template>

<style>
.video-background {
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.video-background iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  color: white; /* Adjust color as needed */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import Aside from '../../components/Aside.vue';

export default {
  components: {
    Aside,
  },
  data: () => ({
    image1: require('../../assets/events/DALL·E 2023-11-11 12.27.55 - Create a vibrant and engaging image representing a university workshop on React and .NET, ideal for use in a social media flyer. The image should feat.png')                                , // Replace with actual image path
    image2: require('../../assets/events/chatgpt-generated.webp'), // Replace with actual image path
    image3: require('../../assets/events/udf-xp.png'),
  })
}
</script>                                                                       