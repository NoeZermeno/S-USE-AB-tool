<template>
  <v-dialog v-model="mostrar" color="#19A08D" persistent>
    <v-card>
      <v-toolbar dark color="#19A08D">
        <v-toolbar-title style="text-align: center" dark>{{
          title
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text small @click="$emit('cancelar')">
          <v-icon>mdi-close</v-icon>
          close
        </v-btn>
      </v-toolbar>

      <v-container style="margin-top: 10px">
        <v-row align="center" justify="center">
          <v-card-title v-if="!test"
            >The System Usability Scale Standart Version
          </v-card-title>
        </v-row>
        <v-row align="center" justify="center">
          <v-card v-if="localData.length > 0" width="800px">
            <v-data-table :headers="headers" :items="data" hide-default-footer>
              <template v-slot:body="{ items }">
                <tbody>
                  <tr v-for="(item, index) in items" :key="`item-${index}`" style="height: 100px">
                    <td style="text-align: center; width: 10px; font-size: 18px">
                      {{ item.number }}
                    </td>
                    <td style="width: 400px; font-size: 18px">
                      {{ item.question }}
                    </td>
                    <td style="text-align: center">
                      <v-btn-toggle v-model="item.op" color="#19A08D">
                        <v-btn :disabled="soloLectura">
                          <v-icon>mdi-numeric-1 </v-icon>
                        </v-btn>
                        <v-btn :disabled="soloLectura">
                          <v-icon>mdi-numeric-2 </v-icon>
                        </v-btn>
                        <v-btn :disabled="soloLectura">
                          <v-icon>mdi-numeric-3 </v-icon>
                        </v-btn>
                        <v-btn :disabled="soloLectura">
                          <v-icon>mdi-numeric-4 </v-icon>
                        </v-btn>
                        <v-btn :disabled="soloLectura">
                          <v-icon>mdi-numeric-5 </v-icon>
                        </v-btn>
                      </v-btn-toggle>
                    </td>
                  </tr>
                </tbody>
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
      <v-container v-if="test && soloLectura">
        <questComponent
          v-if="test"
          :test="test"
          @questionsAdded="updateTable"
        />
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { serviceToken } from "../../helpers/service.service";
import questComponent from "./questionQuestionnaire.vue";
export default {
  name: "dataView",
  props: ["mostrar", "soloLectura", "test", "alternativeId"],
  data() {
    return {
      loading: false,
      headers: [
        { text: "", value: "number", sortable: false },
        {
          text: "Question",
          value: "question",
          align: "center",
          sortable: false,
        },
        { text: "Responses", align: "center", value: "op", sortable: false },
      ],
      data: [],
      title: "SUS Questionnaire",
      idTest: 1,
    };
  },
  computed: {
    localData() {
      let number = 0;
      return this.data.map((x) => {
        number = number++;
        return { number, ...x };
      });
    },
  },
  components: { questComponent },
  created() {
    if (this.test) {
      this.title = this.test.name;
      this.idTest = this.test.id;
    }
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
      const data = { method: "config.tests.data", id: this.idTest};
      const serverResponse = await this.funcion(data);
      this.questions = serverResponse;
      this.data = serverResponse;
    },
    updateTable(questionsArray) {
      this.data = questionsArray;
    },
    async saveAnswers() {
      let answers = [];
      let error = false;
      this.localData.forEach((element) => {
        if (element.op == undefined) {
          error = true;
          return;
        }
        answers.push({ question: element.question, value: element.op + 1, index: element.index });
      });
      if (error) alert("Please answer all questions");
      else {
        const data = {
          method: "evaluations.tests.eval",
          project: this.$route.params.id,
          alternative: this.alternativeId,
          test: this.idTest,
          // index: "",
          // time: "optional",
          // success: "optional",
          // value: "",
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
