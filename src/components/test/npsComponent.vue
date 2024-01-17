<template>
  <v-dialog v-model="mostrar" fullscreen color="primary" persistent >
    <v-card>
      <v-toolbar
        dark
        color="primary"
        
      >
        <v-btn icon dark @click="$emit('cancelar')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title style="text-align: center;">NPS</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
       <v-row align="center" justify="center">
      <v-card-title>HOW WILLING ARE YOU TO RECOMMEND THE WEBSITE REPRESENTED BY</v-card-title>
       </v-row>
       <v-row align="center" justify="center">
       <v-card width="800px">
        <v-container>
        <v-checkbox disabled label="---------"></v-checkbox>
        </v-container>

       </v-card>
       </v-row>
      </v-container>
       
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "nps",
  props: ["mostrar"],

  data() {
    return {
      loading: false,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
