<template>
  <v-container fluid ma-0 pa-5 class="">
    <!-- <div class="d-flex xs12 flex-wrap"> -->
    <v-card
      color="blue lighten-2"
      light
      class="d-flex"
      :class="{
        'flex-row': $vuetify.breakpoint.mdAndUp,
        'flex-column': $vuetify.breakpoint.smAndDown,
      }"
    >
      <!-- <v-flex class="d-flex justify-md-center flex-md-row flex-sm-column"> -->
      <v-flex xs12 md3 pa-5>
        <v-img
          :src="project.img.src"
          :alt="project.img.alt"
          class=""
          style="border-radius: 50%"
        ></v-img>
      </v-flex>
      <v-flex xs12 md9 class="d-flex align-stretch flex-column">
        <v-card-title
          :class="{
            'display-1': $vuetify.breakpoint.mdAndUp,
            'title justify-center': $vuetify.breakpoint.smAndDown,
          }"
        >
          <p>
            {{ project.name() }}
          </p>
        </v-card-title>

        <v-card-subtitle
          :class="{
            'subtitle-1': $vuetify.breakpoint.mdAndUp,
            'subtitle-2': $vuetify.breakpoint.smAndDown,
          }"
        >
          <p class="text-justify">
            {{ project.description() }}
          </p>
        </v-card-subtitle>
        <v-spacer></v-spacer>
        <v-card-actions class="d-flex flex-row justify-end align-end">
          <!-- <v-spacer></v-spacer>    -->
          <v-btn
            v-if="project.action2.path"
            :class="{
              title: $vuetify.breakpoint.mdAndUp,
              'subtitle-1': $vuetify.breakpoint.smAndDown,
            }"
            :to="project.action2.path"
            text
          >
            {{ project.action2.name() }}
          </v-btn>
          <!-- <v-btn class="headline accent" >Saiba Mais</v-btn> -->
          <v-btn
            v-if="project.action1.path"
            color="purple"
            :class="{
              title: $vuetify.breakpoint.mdAndUp,
              'subtitle-1': $vuetify.breakpoint.smAndDown,
            }"
            text
            :to="getRouterLink(project.action1)"
          >
            {{ project.action1.name() }}
          </v-btn>
        </v-card-actions>
      </v-flex>
      <!-- </v-flex> -->
    </v-card>
    <!-- </div> -->
  </v-container>
</template>
<style>
</style>

<script>
export default {
  props: ["project"],
  data: () => ({}),
  methods: {
    getRouterLink(action) {
      if (typeof action.path === 'object') {
        return action.path;
      }
      return { path: action.path };
    }
  }
};
</script>
