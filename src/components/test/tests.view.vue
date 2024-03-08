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
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <sus-component 
      v-if="seeSUS" 
      :mostrar="seeSUS" 
      :soloLectura="true" 
      :test="testSus" 
      @cancelar="seeSUS = false, testSus = null" 
    />
    <nps-component v-if="seeNPS" :mostrar="seeNPS" :soloLectura="true" @cancelar="seeNPS = false" />
    <acc-component v-if="seeACC" :mostrar="seeACC" :soloLectura="true" @cancelar="seeACC = false" />
    <questComponent v-if="seeQuest" :mostrar="seeQuest" :soloLectura="true" @cancelar="seeQuest = false" />
    <seeFourComponent 
      v-if="seeFour" 
      :mostrar="seeFour" 
      :soloLectura="true" 
      :test="test"
      @cancelar="seeFour = false, test = null"
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
      testSus: null,
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
        this.testSus = item;
        this.seeSUS = true;
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