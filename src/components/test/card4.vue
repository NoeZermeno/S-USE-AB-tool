<template>
  <v-dialog v-model="mostrar" color="#19A08D" persistent >
    <v-card min-height="900px">
      <v-toolbar dark color="#19A08D">
        <v-toolbar-title style="text-align: center;" dark>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
         <v-btn text small @click="$emit('cancelar')"> 
          <v-icon>mdi-close</v-icon>
          close
        </v-btn>
      </v-toolbar>

      <!-- <v-row  v-if="test"> -->
      <v-container v-if="test">
      <v-row align="center" justify="center">
       <v-alert style="margin: 10px" density="compact" text="" title="Alert title" type="warning">If you close without saving, all unsaved questions will be deleted.</v-alert>
      </v-row>
      <v-form v-model="valid" ref="form" v-if="test">
          <v-row  v-for="(n,index) in preguntas" :key="index">
              <v-col cols="8">
                  <v-text-field 
                  v-model="n.category" 
                  label="Category" 
                  required 
                  outlined 
                  :rules="preguntasRules.category"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field 
                  v-model="n.task" 
                  label="Task" 
                  required 
                  outlined
                  :rules="preguntasRules.task"
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-text-field 
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
            <v-btn  dark outlined color="#19A08D" class="ml-1" @click="cancelar()">Cancel
            </v-btn>
            <v-btn @click="saveQuestionnaire()" color="#19A08D" :disabled="!valid" :loading="loading"> save </v-btn>
        </v-card-actions>
      </v-row>
      </v-container>

      <!-- <v-container> -->
       <!-- <v-row align="center" justify="center">
      <v-card-title>The System Usability Scale Standart Version</v-card-title>
       </v-row> -->
      <v-container>
       <v-row align="center" justify="center">
       <v-card v-if="localData.length > 0" min-width="100%">
        <v-data-table
          dense
          disable-sort
          :headers="headers"
          hide-default-footer
          :items="localData"
          :items-per-page="-1"
          group-by="task"
          class="ma-8 elevation-1"
        >
          <template v-slot:[`group.header`]="{items, isOpen, toggle}">
            <th colspan="2">
              <v-icon @click="toggle">{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
              {{ items[0].category }}
            </th>
          </template>
          <template v-slot:item="{ item }">
            <tr style="height: 60px !important">
              <td><strong>{{ item.task }}</strong></td>
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
              <td style="text-align: center;">
                  <v-row align="center" justify="center">
                      <v-btn-toggle v-model="item.op" color="#19A08D" >
                        <v-btn :disabled="soloLectura">Unsatisfying</v-btn>
                        <v-btn :disabled="soloLectura"> A little satisfying</v-btn>
                        <v-btn :disabled="soloLectura"> Indifferent</v-btn>
                        <v-btn :disabled="soloLectura"> Satisfying</v-btn>
                        <v-btn :disabled="soloLectura">  Very satisfying</v-btn>
                     
                      </v-btn-toggle>
                    </v-row>
                </td>
            </tr>
          </template>
        </v-data-table>

        <!-- <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        :items-per-page="-1"
        class="ma-8 elevation-1"

      >
         <template v-slot:body="{ items }">
            <tbody>
                <tr v-for="(item, index) in items" :key="`item-${index}`">
                <td>
                    {{item.task}}
                </td>
                <td>
                    {{ item.list }}
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
                <td style="text-align: center;">
                  <v-row align="center" justify="center">
                      <v-btn-toggle v-model="item.op" color="#19A08D" >
                        <v-btn :disabled="soloLectura">Unsatisfying</v-btn>
                        <v-btn :disabled="soloLectura"> A little satisfying</v-btn>
                        <v-btn :disabled="soloLectura"> Indifferent</v-btn>
                        <v-btn :disabled="soloLectura"> Satisfying</v-btn>
                        <v-btn :disabled="soloLectura">  Very satisfying</v-btn>
                     
                      </v-btn-toggle>
                    </v-row>
                </td>
                </tr>
            </tbody>
        </template>
        </v-data-table> -->
       </v-card>
       </v-row>

        <!-- </v-container> -->
      </v-container>

    </v-card>
    <add-component :mostrar="add" @cancelar="add = false" />
  </v-dialog>
</template>
<script>
import addComponent from "./formTest.vue";
import { serviceAddQestions } from "../../helpers/service.service";
export default {
  name: "card4",
  props: ["mostrar", "soloLectura", "test"],

  data() {
    return {
      loading: false,
      title: "Usability test",
      add: false,
      category: "",
      task: "",
      time: 0,   
      headers: [
        { text: "Task Category", align: "center", value: "category", sortable:false },
        { text: "Task List", value: "task", align: "center",sortable:false },
        { text: "Time", align: "center", value: "time", sortable:false },
        { text: "Option", align: "center", sortable:false },
        
       
      ],
      data: [
        {
          category: "Log in to the platform",
          task: "Login to Moodle",
          time:0,
          op: undefined,
        },
        {
          category: "Log in to the platform",
          task: "Find a course",
          time:0,
          op: undefined,
        },
         {
          category: "Log in to the platform",
          task: "Access into the course",
          time:0,
          op: undefined,
        },
   
        {
          category:"Technical support access",
          task: "Find technical support documentation (manual, FAQ)",
          time:0,
          op: undefined,
        },
        {  
          category:"Technical support access",
          task: "Fill the technical support contact form",
         time:0,
          op: undefined,
        },
        {
            category:"Technical support access",
          task: "Switch site language",
         time:0,
          op: undefined,
        },
        {
         category:"User account management",
          task: "Edit your profile",
          time:0,
          op: undefined,
        },
        {
          category:"User account management",
          task: "Upload/Update profile photo",
         time:0,
          op: undefined,
        },
        {
          category:"Access to information and resources/content",
          task: "Read news items in what's new",
          time:0,
          op: undefined,
        },
        {
         category:"Access to information and resources/content",
          task: "Download a file",
          time:0,
          op: undefined,
        },
        {
         category:"Access to information and resources/content",
          task: "Download a file from resource Directory",
          time:0,
          op: undefined,
        },
          {
          category:"Access to information and resources/content",
          task: "Track a URL link external to the platform resources/content",
          time:0,
          op: undefined,
        },
        {
       category:"Access to information and resources/content",
          task: "Display an embedded video",
         time:0,
          op: undefined,
        },
        {
         category:"Access to information and resources/content",
          task: "View a Page resource",
          time:0,
          op: undefined,
        },
         {  
          category:"Access to information and resources/content",
          task: "Fill the technical support contact form",
          time:0,
          op: undefined,
        },
        {
            category:"Access to information and resources/content",
          task: "Switch site language",
         time:0,
          op: undefined,
        },
        {
         category:"Access to information and resources/content",
          task: "Edit your profile",
          time:0,
          op: undefined,
        },
        {
          category:"Communication",
          task: "Upload/Update profile photo",
         time:0,
          op: undefined,
        },
        {
          category:"Communication",
          task: "Read news items in what's new",
          time:0,
          op: undefined,
        },
        {
         category:"Communication",
          task: "Download a file",
          time:0,
          op: undefined,
        },
        {
         category:"Communication",
          task: "Download a file from resource Directory",
          time:0,
          op: undefined,
        },
          {
          category:"Communication",
          task: "Track a URL link external to the platform resources/content",
          time:0,
          op: undefined,
        },
        {
       category:"Communication",
          task: "Display an embedded video",
         time:0,
          op: undefined,
        },
        {
         category:"Accomplishment of course activities",
          task: "View a Page resource",
          time:0,
          op: undefined,
        },
          {
          category:"Accomplishment of course activities",
          task: "Track a URL link external to the platform resources/content",
          time:0,
          op: undefined,
        },
        {
       category:"Accomplishment of course activities",
          task: "Display an embedded video",
         time:0,
          op: undefined,
        },
        {
         category:"Accomplishment of course activities",
          task: "View a Page resource",
          time:0,
          op: undefined,
        },
         {
         category:"Accomplishment of course activities",
          task: "View a Page resource",
          time:0,
          op: undefined,
        },
      ],
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
      preguntas:[{category:'',task:'', time:0}],
    };
  },
  computed: {
    localData(){
      return this.data.map((x) => {return x})
    }
  },
  components:{
    addComponent
  },
  created() {
    if(this.test) {
      this.title = this.test.name;
      this.data = [];
    }
  },
  mounted() {},
  methods: {
    async saveQuestionnaire(){
      try {
        this.loading = true;

        const data = { method: "config.tests.test.set", id: this.test.id };
        
        const serverResponse = await serviceAddQestions(data, this.preguntas);
        this.loading = false;
        this.category = "";
        this.task = "";
        this.time = 0;

        if (serverResponse.response.data.status == "error")
          alert(`${serverResponse.response.data.message}`);
        else console.log(serverResponse);

      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    agregarPregunta(){
        this.preguntas.push({task:'', category:'', time:0})
    },
    eliminarPregunta(index){
      this.preguntas.splice(index,1)
    },
  },
};
</script>
