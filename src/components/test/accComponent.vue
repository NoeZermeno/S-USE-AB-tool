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
        <v-toolbar-title style="text-align: center;">ACC</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
       <v-row align="center" justify="center">
      <v-card-title>WHAT IS THE ACCESSIBILITY LEVEL ( A, AA, AAA ) FOR {{}}</v-card-title>
       </v-row>
       <v-row align="center" justify="center">
       <v-card width="800px">
        <v-container>
        <v-checkbox disabled label="A, AA, AAA "></v-checkbox>
        </v-container>
       </v-card>
       </v-row>
      </v-container>
       
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "dataView",
  props: ["mostrar"],

  data() {
    return {
      loading: false,
      rules: [v => v.length <= 250 || 'Max 250 characters'],
      value: '',
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
