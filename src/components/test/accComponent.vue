<template>
  <v-dialog v-model="mostrar" color="#19A08D" persistent  width="600px">
<v-card>
      <v-toolbar dark color="#19A08D">
        <v-toolbar-title style="text-align: center;" dark>ACC</v-toolbar-title>
        <v-spacer></v-spacer>
         <v-btn text small @click="$emit('cancelar')"> 
          <v-icon>mdi-close</v-icon>
          close
        </v-btn>
      </v-toolbar>
      <v-container>
       <v-row align="center" justify="center">
      <v-card-title>What is the accessibility level ( A, AA, AAA ) for {{}}</v-card-title>
       </v-row>
       <v-row align="center" justify="center">
       <v-card width="800px">
        <v-container style="display: flex;
    justify-content: space-evenly;">
        <v-radio-group v-model="value" :disabled="soloLectura">
          <v-radio
            v-for="(n,index) in array"
            :key="n"
            :label="`${array[index]}`"
            :value="n"
          ></v-radio>
        </v-radio-group>
        </v-container>
       </v-card>
       </v-row>
      </v-container>
       
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "acc",
  props: ["mostrar","soloLectura"],

  data() {
    return {
      loading: false,
      value: 'A',
      array: ['A', 'AA', 'AAA'],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
