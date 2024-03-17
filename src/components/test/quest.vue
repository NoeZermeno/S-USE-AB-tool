<template>
  <v-dialog style="min-height: 800px" v-model="mostrar" color="#19A08D" persistent >
    <v-card>
      <v-toolbar dark color="#19A08D">
        <v-toolbar-title style="text-align: center;" dark>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
         <v-btn text small @click="$emit('cancelar')"> 
          <v-icon>mdi-close</v-icon>
          close
        </v-btn>
      </v-toolbar>

      <v-container>
       <v-row align="center" justify="center">
       <v-card v-if="localData.length > 0" min-width="800px">
        <v-data-table
          dense
          disable-sort
          :headers="headers"
          hide-default-footer
          :items="localData"
          :items-per-page="-1"
          item-key="id"
          group-by="dimension"
        >
          <template v-slot:[`group.header`]="{items, isOpen, toggle}">
            <th colspan="2">
              <v-icon @click="toggle">{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
              {{ items[0].dimention }}
            </th>
          </template>
          <template v-slot:item="{ item }">
            <tr style="height: 60px !important">
              <td><strong>{{ item.question }}</strong></td>
              <td style="text-align: center;">
                  <v-row align="center" justify="center">
                      <v-btn-toggle v-model="item.op" color="#19A08D" >
                        <v-btn :disabled="soloLectura">Anger</v-btn>
                        <v-btn :disabled="soloLectura">Frustration</v-btn>
                        <v-btn :disabled="soloLectura">Indifference</v-btn>
                        <v-btn :disabled="soloLectura">Joy</v-btn>
                        <v-btn :disabled="soloLectura">Happiness</v-btn>
                     
                      </v-btn-toggle>
                    </v-row>
                </td>
            </tr>
          </template>
        </v-data-table>
       </v-card>
       </v-row>
       <v-row v-if="!soloLectura" justify="end">
          <v-card-actions>
            <v-btn small dark outlined color="#19A08D" class="ml-1" @click="$emit('cancelar')">Cancel
            </v-btn>
            <v-btn @click="saveAnswers()" small color="#19A08D" :disabled="loading" :loading="loading"> save </v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>

import { serviceToken } from "../../helpers/service.service";
export default {
  name: "quest",
  props: ["mostrar", "soloLectura", "alternativeId"],

  data() {
    return {
      loading: false,
      title: "Quest",
      // menu2:false,
   
      headers: [
        { text: "Dimension", value: "dimension", align: "center", sortable:false },
        { text: "Question", value: "quest", align: "center",sortable:false },
        { text: "Option", align: "center", sortable:false },
      ],
      data: [],
    };
  },
  computed: {
    localData() {
      return this.data.map((x) => {
        return {...x, op: undefined};
      });
    },
  },
  created() {
    this.getQuestions();
  },
  mounted() {},
  methods: {
    async funcion(data) {
      try {
        this.loading = true;
        const serverResponse = await serviceToken(data);
        this.loading = false;

        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        else return serverResponse;
      } catch (error) {
        this.loading = false;
        alert("Sorry, failed connection");
      }
    },
    async getQuestions() {
      const data = { method: "config.tests.data", id: 5};
      const serverResponse = await this.funcion(data);
      this.data = serverResponse;
    },
    async saveAnswers() {
      let answers = [];
      let error = false;
      this.localData.forEach((element) => {
        if (element.op == undefined) {
          error = true;
          return;
        }
        answers.push({ index: element.index, value: element.op + 1 });
      });
      if (error) alert("Please answer all questions");
      else {
        const data = {
          method: "evaluations.tests.eval",
          project: this.$route.params.id,
          alternative: this.alternativeId,
          test: 5,
        };
        for (const answer of answers) {
          data.index = answer.index;
          data.value = answer.value;
          await this.funcion(data);
          this.$emit('cancelar');
        }
      }
    },
  },
};
</script>
