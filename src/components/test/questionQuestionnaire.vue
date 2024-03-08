<template>
    <div>
        <v-row align="center" justify="center">
       <v-alert style="margin: 10px" density="compact" text="" title="Alert title" type="warning">
        If you click on save button, all questions will be replaced by the new questions.
       </v-alert>
      </v-row>
      <v-form v-model="valid" ref="form">
          <v-row  v-for="(n,index) in preguntas" :key="index">
              <v-col cols="12">
                  <v-text-field 
                  v-model="n.question" 
                  label="Question" 
                  required 
                  outlined 
                  :disabled="n.guardado"
                  :rules="preguntasRules.question"
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

import { serviceAddQestionsQuestionnaire } from "../../helpers/service.service";

export default {
    props: ["test"],

  data() {
    return {
      loading: false,
      valid: false,
      preguntasRules: {
        question: [v => !!v || 'Required']
        },
      categoryRules: [
        v => !!v || "Question is required",
      ],
      errorMessage: "",
      preguntas:[{question: '', guardado:false}],
    };
  },
  computed: {},
  created() {},
  watch: {},
  methods: {
    async saveQuestionnaire(){
      try {
        this.loading = true;
        let id = null;
        if(this.test) id = this.test.id;
        const data = { method: "config.tests.questionnaire.set", id};
        const serverResponse = await serviceAddQestionsQuestionnaire(data, this.preguntas);
        this.loading = false;
        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        else {
          this.$emit('questionsAdded', this.preguntas);
          this.preguntas = [{question: '', guardado:false}];
        }
      } catch (error) {
        this.loading = false;
      }
    },
    agregarPregunta(){
        this.preguntas.push({question: '', guardado:false})
    },
    eliminarPregunta(index){
      this.preguntas.splice(index,1)
    },
  },
};
</script>