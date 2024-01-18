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
        <v-container style="display:flex; justify-content:center">
          <v-btn-toggle v-model="opcion" color="primary">
            <v-btn> <v-icon>mdi-numeric-1-box-outline</v-icon></v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-2-box-outline</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-3-box-outline</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-4-box-outline</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-5-box-outline</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-6-box-outline</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-7-box-outline</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-8-box-outline</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-9-box-outline</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-10-box-outline</v-icon></v-btn>
          </v-btn-toggle>
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
  props: ["mostrar","soloLectura"],

  data() {
    return {
      loading: false,
      opcion:undefined,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
