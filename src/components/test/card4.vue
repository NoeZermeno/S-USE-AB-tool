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
                      label="Select seconds"
                      step=".1"
                      min="0"
                      max="200"
                      suffix="seconds"
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
      </v-container>
      <v-container v-if="test">
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
  props: ["mostrar", "soloLectura", "test"],

  data() {
    return {
      loading: false,
      title: "Usability test",
      add: false,
      // category: "",
      // task: "",
      // time: 0,
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
      data: [
        {
          category: "Log in to the platform",
          task: "Login to Moodle",
          time: 0,
          op: undefined,
        },
        {
          category: "Log in to the platform",
          task: "Find a course",
          time: 0,
          op: undefined,
        },
        {
          category: "Log in to the platform",
          task: "Access into the course",
          time: 0,
          op: undefined,
        },

        {
          category: "Technical support access",
          task: "Find technical support documentation (manual, FAQ)",
          time: 0,
          op: undefined,
        },
        {
          category: "Technical support access",
          task: "Fill the technical support contact form",
          time: 0,
          op: undefined,
        },
        {
          category: "Technical support access",
          task: "Switch site language",
          time: 0,
          op: undefined,
        },
        {
          category: "User account management",
          task: "Edit your profile",
          time: 0,
          op: undefined,
        },
        {
          category: "User account management",
          task: "Upload/Update profile photo",
          time: 0,
          op: undefined,
        },
        {
          category: "Access to information and resources/content",
          task: "Read news items in what's new",
          time: 0,
          op: undefined,
        },
        {
          category: "Access to information and resources/content",
          task: "Download a file",
          time: 0,
          op: undefined,
        },
        {
          category: "Access to information and resources/content",
          task: "Download a file from resource Directory",
          time: 0,
          op: undefined,
        },
        {
          category: "Access to information and resources/content",
          task: "Track a URL link external to the platform resources/content",
          time: 0,
          op: undefined,
        },
        {
          category: "Access to information and resources/content",
          task: "Display an embedded video",
          time: 0,
          op: undefined,
        },
        {
          category: "Access to information and resources/content",
          task: "View a Page resource",
          time: 0,
          op: undefined,
        },
        {
          category: "Access to information and resources/content",
          task: "Fill the technical support contact form",
          time: 0,
          op: undefined,
        },
        {
          category: "Access to information and resources/content",
          task: "Switch site language",
          time: 0,
          op: undefined,
        },
        {
          category: "Access to information and resources/content",
          task: "Edit your profile",
          time: 0,
          op: undefined,
        },
        {
          category: "Communication",
          task: "Upload/Update profile photo",
          time: 0,
          op: undefined,
        },
        {
          category: "Communication",
          task: "Read news items in what's new",
          time: 0,
          op: undefined,
        },
        {
          category: "Communication",
          task: "Download a file",
          time: 0,
          op: undefined,
        },
        {
          category: "Communication",
          task: "Download a file from resource Directory",
          time: 0,
          op: undefined,
        },
        {
          category: "Communication",
          task: "Track a URL link external to the platform resources/content",
          time: 0,
          op: undefined,
        },
        {
          category: "Communication",
          task: "Display an embedded video",
          time: 0,
          op: undefined,
        },
        {
          category: "Accomplishment of course activities",
          task: "View a Page resource",
          time: 0,
          op: undefined,
        },
        {
          category: "Accomplishment of course activities",
          task: "Track a URL link external to the platform resources/content",
          time: 0,
          op: undefined,
        },
        {
          category: "Accomplishment of course activities",
          task: "Display an embedded video",
          time: 0,
          op: undefined,
        },
        {
          category: "Accomplishment of course activities",
          task: "View a Page resource",
          time: 0,
          op: undefined,
        },
        {
          category: "Accomplishment of course activities",
          task: "View a Page resource",
          time: 0,
          op: undefined,
        },
      ],
      // valid: false,
      // preguntasRules: {
      //   category: [v => !!v || 'Required'],
      //   task: [v => !!v || 'Required'],
      //   time: [v => !!v || 'Required']
      //   },
      // categoryRules: [
      //   v => !!v || "Category is required",
      // ],
      // errorMessage: "",
      // preguntas:[{category:'',task:'', time:0}],
      questions: [],
    };
  },
  computed: {
    localData() {
      return this.data.map((x) => {
        return {...x, time: 0};
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
      this.data = [];
      this.getQuestions();
    }
  },
  mounted() {},
  methods: {
    async getQuestions() {
      try {
        this.loading = true;
        const data = { method: "config.tests.data", id: this.test.id };
        const serverResponse = await serviceToken(data);
        this.loading = false;
        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        else {
          this.questions = serverResponse;
          this.data = serverResponse;
        }
      } catch (error) {
        this.loading = false;
      }
    },
    updateTable(questionsArray) {
      for (const question of questionsArray) {
        this.data.push(question);
      }
    },
    // async saveQuestionnaire(){
    //   try {
    //     this.loading = true;

    //     const data = { method: "config.tests.test.set", id: this.test.id };

    //     const serverResponse = await serviceAddQestions(data, this.preguntas);
    //     this.loading = false;
    //     // this.loading = false;
    //     // this.category = "";
    //     // this.task = "";
    //     // this.time = 0;
    //     if (serverResponse.status == "error")
    //       alert(`${serverResponse.message}`);
    //     else this.$emit('cancelar')
    //   } catch (error) {
    //     console.log(error);
    //     this.loading = false;
    //   }
    // },
  },
};
</script>
