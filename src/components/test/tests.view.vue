<template>
  <div>
    <v-container fluid>
      <v-card :loading="loading">
        <v-system-bar
          ><v-spacer></v-spacer><b class="text-h5">Test</b><v-spacer></v-spacer
        ></v-system-bar>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark lerger color="#19A08D" @click="add = true">
                <v-icon > mdi-plus </v-icon> add test
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col>
            <v-container>
              <v-row align="center" justify="center">
                <v-col v-for="(item, i) in tests"  :key="i" cols="6">
                  <v-card outlined>
                    <v-toolbar dense dark color="#19A08D">
                      <v-icon v-if="!idsBloqued.includes(item.id)" @click="editar(item)">mdi mdi-pencil-outline</v-icon>
                      <v-spacer></v-spacer>
                      <v-toolbar-title @click="actionToDo(item)" style="cursor: pointer" class="text-md-center text-h5">
                        {{item.name}}
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-icon v-if="!idsBloqued.includes(item.id)" @click="eliminar(item.id)">mdi mdi-trash-can-outline</v-icon>
                    </v-toolbar>
                    <v-card-text class="biggerText"
                      >{{item.instructions}}
                    </v-card-text>
                  </v-card>
                </v-col>
                <!-- <v-col cols="6">
                  <v-card @click="seeSUS = true" outlined>
                    <v-toolbar dense dark color="#19A08D">
                      <v-spacer></v-spacer>
                      <v-toolbar-title class="text-md-center text-h5">
                        SUS Questionnaire
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text class="biggerText"
                      >The System Usability Scale (SUS) provides a “quick and
                      dirty”, reliable tool for measuring the usability. It
                      consists of a 10 item questionnaire with five response
                      options for respondents; from Strongly agree to Strongly
                      disagree. Originally created by John Brooke in 1986, it
                      allows you to evaluate a wide variety of products and
                      services, including hardware, software, mobile devices,
                      websites and applications.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card @click="seeNPS = true" outlined>
                    <v-toolbar dense dark color="#19A08D">
                      <v-spacer></v-spacer>
                      <v-toolbar-title class="text-md-center text-5">
                        NPS
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text class="biggerText"
                      >The Net Promoter Score or NPS is a tool that helps you measure customer satisfaction with a single question, giving you an indicator of growth for your company or product. The NPS evaluates the degree to which a person recommends a certain company, product or service to friends, family or colleagues. The idea is very simple: if you like using a product or doing business with a particular company, you are willing to share that experience with others.
                    </v-card-text
                    >
                  </v-card>
                </v-col> -->
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <sus-component v-if="seeSUS" :mostrar="seeSUS" :soloLectura="true" @cancelar="seeSUS = false" />
    <nps-component v-if="seeNPS" :mostrar="seeNPS" :soloLectura="true" @cancelar="seeNPS = false" />
    <acc-component v-if="seeACC" :mostrar="seeACC" :soloLectura="true" @cancelar="seeACC = false" />
    <seeFourComponent 
      v-if="seeFour" 
      :mostrar="seeFour" 
      :soloLectura="true" 
      :test="test"
      @cancelar="seeFour = false, test = null"
    />
    <questComponent 
      v-if="seeQuest" 
      :mostrar="seeQuest" 
      :soloLectura="true" 
      :test="test"
      @cancelar="seeQuest = false, test = null"
    />
    <!-- <add-component :mostrar="add" @cancelar="add = false" /> -->
    <addNewTest 
      v-if="add" 
      :mostrar="add"
      :test="test" 
      @cancelar="add = false, test = null" 
      @testAdded="getTests()"/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import susComponent from "./susComponent.vue";
import npsComponent from "./npsComponent.vue";
import accComponent from "./accComponent.vue";
import seeFourComponent from "./card4.vue";
import questComponent from "./quest.vue";
// import addComponent from "./formTest.vue";
import addNewTest from "./addNewTest.vue";
import { serviceToken } from "../../helpers/service.service";
export default {
  name: "roles",
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  components: {
    susComponent,
    npsComponent,
    accComponent,
    seeFourComponent,
    questComponent,
    addNewTest
  },
  mounted() {
    if (this.sessionToken) this.getTests();
  },
  data() {
    return {
      loading: false,
      agregar: false,
      seeSUS: false,
      seeNPS: false,
      seeACC: false,
      seeFour: false,
      seeQuest: false,
      add: false,
      tests: [],
      test: null,
      idsBloqued: [1, 2 ,3 , 4, 5],
    };
  },
  methods: {
    async getTests() {
      try {
        this.loading = true;
        const data = {
          method: "config.tests.get",
        };
        const serverResponse = await serviceToken(data);
        this.loading = false;

        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        else this.tests = serverResponse;
      } catch (error) {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.$store.dispatch("setSessionToken", null);
        this.$router.push("/login");
      }
    },
    actionToDo(item){
      if(item.id == 1) this.seeSUS = true;
      else if(item.id == 2) this.seeNPS = true;
      else if(item.id == 3) this.seeACC = true;
      else if(item.id == 4) this.seeFour = true;
      else if(item.id == 5) this.seeQuest = true;
      else if(item.type == 'TEST'){
        this.test = item;
        this.seeFour = true;
      }
      else if(item.type == 'QUESTIONNAIRE'){
        this.test = item;
        this.seeQuest = true;
      }
    },
    async eliminar(id) {
      var result = false;
      if(this.idsBloqued.includes(id)) alert("This item can't be modified or deleted.");
      else result = confirm("Are you sure to delete?");
      if (result == true) {
        try {
          this.loading = true;
          const data = {
            method:'config.tests.delete',
            id: id,
          };
          const serverResponse = await serviceToken(data);
          this.loading = false;
          if (serverResponse.status == "error") 
            alert(`${serverResponse.message}`);
          else {
            let index = this.tests.findIndex((x) => x.id == id);
            if (index >= 0) this.tests.splice(index, 1);
          }
        } catch (error) {
          this.loading = false;
        }
      } else {
        return false;
      }
    },
    editar(item) {
      var result = false;
      if(this.idsBloqued.includes(item.id)) alert("This item can't be modified or deleted.");
      else result = true;
      if(result){
        this.test = item;
        this.add = true;
      }
    },
  },
};
</script>

<style scoped>
.biggerText {
  font-size: 18px !important;
  min-height: 250px !important
}
</style>