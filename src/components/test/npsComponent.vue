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
             <!-- <v-btn :disabled="soloLectura"> <v-icon>mdi-emoticon-neutral</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-emoticon-neutral</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-emoticon-excited</v-icon></v-btn>
            <v-btn :disabled="soloLectura"> <v-icon>mdi-emoticon-excited</v-icon></v-btn> -->
          </v-btn-toggle>
          <v-btn-toggle v-model="opcion" color="#19A08D">
            
            <!-- <v-btn   > <v-icon>mdi-numeric-1</v-icon></v-btn>
            <v-btn   > <v-icon>mdi-numeric-2</v-icon></v-btn>
            <v-btn   > <v-icon>mdi-numeric-3 </v-icon></v-btn>
            <v-btn   > <v-icon>mdi-numeric-4</v-icon></v-btn>
            <v-btn   > <v-icon>mdi-numeric-5 </v-icon></v-btn>
            <v-btn   > <v-icon>mdi-numeric-6 </v-icon></v-btn>
            <v-btn   > <v-icon>mdi-numeric-7 </v-icon></v-btn>
            <v-btn   > <v-icon>mdi-numeric-8 </v-icon></v-btn>
            <v-btn   > <v-icon>mdi-numeric-9 </v-icon></v-btn>
            <v-btn   > <v-icon>mdi-numeric-10 </v-icon></v-btn> -->

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
