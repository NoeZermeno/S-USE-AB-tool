<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="#19A08D"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#own">
        Own projects
      </v-tab>

      <v-tab href="#evaluator">
        Evaluator projects
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :value="'own'">
        <ownProjectsComponent />
      </v-tab-item>
      <v-tab-item :value="'evaluator'">
        <evaluatorProjectsComponent />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
    import ownProjectsComponent from "./project.view.vue";
    import evaluatorProjectsComponent from "./evaluatorProjects.vue";
  export default {
    components: { ownProjectsComponent, evaluatorProjectsComponent },
    data () {
      return {
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>