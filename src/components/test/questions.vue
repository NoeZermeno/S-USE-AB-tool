<template>
    <div>
        <v-row align="center" justify="center">
       <v-alert style="margin: 10px" density="compact" text="" title="Alert title" type="warning">
        If you click on save button, all questions will be replaced by the new questions.
       </v-alert>
      </v-row>
      <v-form v-model="valid" ref="form">
          <v-row  v-for="(n,index) in preguntas" :key="index">
              <v-col cols="8">
                  <v-text-field 
                  v-model="n.category" 
                  label="Category" 
                  required 
                  outlined 
                  :disabled="n.guardado"
                  :rules="preguntasRules.category"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field 
                  v-model="n.task" 
                  label="Task" 
                  required 
                  outlined
                  :disabled="n.guardado"
                  :rules="preguntasRules.task"
                ></v-text-field>
              </v-col>
              <v-col  cols="1">
                <v-text-field 
                 v-if="n.guardado"
                  v-model="n.time"
                  type="number"
                  label="Time"
                  min="0"
                  required 
                  outlined  
                  disabled
                 
                ></v-text-field>
                <v-text-field 
                  v-else
                  v-model="n.time"
                  type="number"
                  label="Time"
                  min="0"
                  required 
                  outlined  
                  :rules="preguntasRules.time"
                  :append-outer-icon="'mdi-close'"
                  @click:append-outer="eliminarPregunta(index)"
                ></v-text-field>

              </v-col>
          </v-row>
      </v-form>
 
      <v-row>
        <v-col>
        <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn dark v-on="on" lerger color="#19A08D" @click="agregarPregunta()">
              <v-icon > mdi-plus </v-icon> add questions
            </v-btn>
            </template>
            <span>add question</span>
        </v-tooltip>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-card-actions>
            <v-btn @click="saveQuestionnaire()" color="#19A08D" :disabled="!valid" :loading="loading"> save </v-btn>
        </v-card-actions>
      </v-row>
    </div>
</template>
<script>

import { serviceAddQestions } from "../../helpers/service.service";

export default {
    props: ["questions", "test"],

  data() {
    return {
      loading: false,
      valid: false,
      preguntasRules: {
        category: [v => !!v || 'Required'],
        task: [v => !!v || 'Required'],
        time: [v => !!v || 'Required']
        },
      categoryRules: [
        v => !!v || "Category is required",
      ],
      errorMessage: "",
      preguntas:[{category:'',task:'', time:0, guardado:false}],
    };
  },
  computed: {
  },

  created() {
  },
  watch: {
    // if(this.questions.length > 0){
    // let arreglo = []
    // //  this.preguntas = this.questions
    //  this.questions.forEach((x) => {
    //     let obj= {category:x.category,task:x.task, time:100, guardado:false}
    //     arreglo.push(obj)
    //  })
    //  this.preguntas = arreglo
    // 'questions':function(val){
    //     let arreglo = []
    //     val.forEach((x) => {
    //       let obj= {category:x.category,task:x.task, time:100, guardado:true}
    //       arreglo.push(obj)
    //     })
    //     this.preguntas = arreglo
    // }
   },
  methods: {
    async saveQuestionnaire(){
      try {
        this.loading = true;
        let id = null;
        if(this.test) id = this.test.id;
        const data = { method: "config.tests.test.set", id};
        const serverResponse = await serviceAddQestions(data, this.preguntas);
        this.loading = false;
        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        else {
          this.$emit('questionsAdded', this.preguntas);
          this.preguntas = [{category:'',task:'', time:0, guardado:false}];
        }
      } catch (error) {
        this.loading = false;
      }
    },
    agregarPregunta(){
        this.preguntas.push({task:'', category:'', time:0, guardado:false})
    },
    eliminarPregunta(index){
      this.preguntas.splice(index,1)
    },
  },
};
</script>