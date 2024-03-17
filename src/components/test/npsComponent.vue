<template>
  <v-dialog v-model="mostrar" color="#19A08D" persistent width="600px">
    <v-card>
       
     <v-toolbar dark color="#19A08D">
        <v-toolbar-title style="text-align: center;" dark>NPS</v-toolbar-title>
        <v-spacer></v-spacer>
         <v-btn text small @click="$emit('cancelar')"> 
          <v-icon>mdi-close</v-icon>
          close
        </v-btn>
      </v-toolbar>

      <v-container>
        <v-row align="center" justify="center">
          <v-card-title>How willing are to recommend the website represented by</v-card-title>
        </v-row>
      
      
        <v-container style="text-align: center;" >
           <v-btn-toggle v-model="opcion" color="#19A08D">
            <v-btn :disabled="soloLectura"> <v-icon color="red">mdi-emoticon-sad</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon color="red">mdi-emoticon-sad</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon color="red">mdi-emoticon-sad</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon color="red">mdi-emoticon-sad</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon color="red">mdi-emoticon-sad</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon color="red">mdi-emoticon-sad</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon color="amber">mdi-emoticon-neutral</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon color="amber">mdi-emoticon-neutral</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon color="green">mdi-emoticon-excited</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon color="green">mdi-emoticon-excited</v-icon></v-btn>
          </v-btn-toggle>
          <v-btn-toggle v-model="opcion" color="#19A08D">
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-1</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-2</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-3 </v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-4</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-5 </v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-6 </v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-7 </v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-8 </v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-9 </v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-10 </v-icon></v-btn>
          </v-btn-toggle>
        </v-container>

        <v-row v-if="!soloLectura" justify="end">
          <v-card-actions>
            <v-btn small dark outlined color="#19A08D" class="ml-1" @click="$emit('cancelar')">Cancel
            </v-btn>
            <v-btn @click="saveAnswer()" small color="#19A08D" :disabled="loading" :loading="loading"> save </v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
       
    </v-card>
  </v-dialog>
</template>
<script>

import { serviceToken } from "../../helpers/service.service";
export default {
  name: "nps",
  props: ["mostrar","soloLectura", "alternativeId"],

  data() {
    return {
      loading: false,
      opcion:undefined,
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async saveAnswer() {
      try {
        if (this.opcion == undefined) alert("Please answer the question");
        else {
          const data = {
            method: "evaluations.tests.eval",
            project: this.$route.params.id,
            alternative: this.alternativeId,
            test: 2,
            index: 1,
            value: this.opcion + 1,
          };
          await serviceToken(data);
          this.$emit('cancelar');
        }
      } catch (error) {
        this.loading = false;
        alert("Sorry, failed connection");
      }
    },
  },
};
</script>
