<template>
  <v-dialog v-model="mostrar" color="#19A08D" persistent>
    <v-card min-height="900px">
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

      <!-- <v-row  v-if="test"> -->

      <v-container>
        <v-row align="center" justify="center">
          <v-card-title>
            The System Usability Scale Standart Version
          </v-card-title>
        </v-row>

        <v-row align="center" justify="center">
          <v-card v-if="localData.length > 0" min-width="100%">
            <v-data-table
              dense
              disable-sort
              :headers="headers"
              hide-default-footer
              :items="localData"
              :items-per-page="-1"
              group-by="category"
              class="ma-8 elevation-1"
            >
              <template v-slot:[`group.header`]="{ items, isOpen, toggle }">
                <th colspan="2">
                  <v-icon @click="toggle">{{isOpen ? "mdi-minus" : "mdi-plus"}}</v-icon>
                  {{ items[0].category }}
                </th>
              </template>
              <template v-slot:item="{ item }">
                <tr style="height: 60px !important">
                  <td style="min-width: 425px">
                    <strong>{{ item.task }}</strong>
                  </td>
                  <td style="width: 150px">
                    <v-text-field
                      v-model="item.time"
                      type="number"
                      label="Seconds"
                      step="1"
                      min="0"
                      max="200"
                      :disabled="soloLectura"
                    ></v-text-field>
                  </td>
                  <td style="text-align: center">
                    <v-row align="center" justify="center">
                      <v-btn-toggle v-model="item.op" color="#19A08D">
                        <v-btn :disabled="soloLectura">Unsatisfying</v-btn>
                        <v-btn :disabled="soloLectura">A little satisfying</v-btn>
                        <v-btn :disabled="soloLectura"> Indifferent</v-btn>
                        <v-btn :disabled="soloLectura"> Satisfying</v-btn>
                        <v-btn :disabled="soloLectura"> Very satisfying</v-btn>
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
      <v-container v-if="test && soloLectura">
        <questions-component 
          v-if="test" 
          :questions="questions" 
          :test="test" 
          @questionsAdded="updateTable"
        />
      </v-container>
    </v-card>
    <add-component :mostrar="add" @cancelar="add = false" />
  </v-dialog>
</template>
<script>
import addComponent from "./formTest.vue";
import { serviceToken } from "../../helpers/service.service";
import questionsComponent from "./questions.vue";
export default {
  name: "card4",
  props: ["mostrar", "soloLectura", "test", "alternativeId"],

  data() {
    return {
      loading: false,
      title: "Usability test",
      add: false,
      headers: [
        {
          text: "Task Category",
          align: "center",
          value: "category",
          sortable: false,
        },
        { text: "Task List", value: "task", align: "center", sortable: false },
        { text: "Time", align: "center", value: "time", sortable: false },
        { text: "Option", align: "center", sortable: false },
      ],
      data: [],
      questions: [],
      idTest: 4,
    };
  },
  computed: {
    localData() {
      return this.data.map((x) => {
        return {...x, time: 0, op: undefined};
      });
    },
  },
  components: {
    addComponent,
    questionsComponent,
  },
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
      const data = { method: "config.tests.data", id: this.idTest };
      const serverResponse = await serviceToken(data);
      this.questions = serverResponse;
      this.data = serverResponse;
    },
    updateTable(questionsArray) {
      for (const question of questionsArray) {
        this.data.push(question);
      }
    },
    async saveAnswers() {
      let answers = [];
      let error = false;
      this.localData.forEach((element) => {
        if (element.op == undefined || element.time == 0) {
          error = true;
          return;
        }
        answers.push({ index: element.index, time: element.time, value: element.op + 1 });
      });
      if (error) alert("Please answer all questions and set the time.");
      else {
        const data = {
          method: "evaluations.tests.eval",
          project: this.$route.params.id,
          alternative: this.alternativeId,
          test: this.idTest,
        };
        for (const answer of answers) {
          data.index = answer.index;
          data.value = answer.value;
          data.time = answer.time;
          data.success = true;
          await this.funcion(data);
          this.$emit('cancelar');
        }
      }
    }
  },
};
</script>
