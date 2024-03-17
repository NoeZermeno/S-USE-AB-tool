<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-system-bar
          ><v-spacer></v-spacer><b class="text-h5">Complete all tests for all alternatives</b
          ><v-spacer></v-spacer
        ></v-system-bar>
        <v-row align="center" justify="center">
          <v-col>
            <v-container>
              <v-row>
                <v-col v-for="(alternative, i) in alternatives" :key="i" sm="6" md="6" lg="6">
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title 
                            style="display: inline-flex; align-items: center" 
                            class="text-h5 mb-1"
                          >
                              {{ alternative.alias }}
                              <v-spacer></v-spacer>
                              <v-avatar style="width: 80px; height: 80px" color="#8AA7FF">
                                <v-img :src="`https://lionware.dev/ari-dasci/webservice/?method=project.pic&id=${alternative.id}`" cover>
                                </v-img>
                              </v-avatar>
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            URL: <a target=”_blank” :href="alternative.url">{{alternative.url}}</a>
                          </v-list-item-subtitle>
                          <v-list>
                            <v-list-item
                              style="border-bottom: 1px solid black"
                              v-for="(item, index) in tests"
                              :key="index"
                              @click="openTest(item, alternative.id, alternative.alias)"
                            >
                              <v-list-item-title>{{ item.name }}</v-list-item-title>
                              <v-list-item-subtitle>{{ item.instructions }}</v-list-item-subtitle>
                            </v-list-item>
                          </v-list>
                        </v-list-item-content>
                    </v-list-item>
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
      :soloLectura="false" 
      :test="testSus"
      :alternativeId="alternativeId"
      @cancelar="seeSUS = false, testSus = null" 
    />
    <nps-component v-if="seeNPS" :mostrar="seeNPS" :soloLectura="false" :alternativeId="alternativeId" @cancelar="seeNPS = false" />
    <acc-component 
      v-if="seeACC" 
      :mostrar="seeACC" 
      :soloLectura="false" 
      :alternativeId="alternativeId" 
      :alternativeName="alternativeName" 
      @cancelar="seeACC = false" 
    />
    <questComponent v-if="seeQuest" :mostrar="seeQuest" :soloLectura="false" :alternativeId="alternativeId" @cancelar="seeQuest = false" />
    <seeFourComponent 
      v-if="seeFour" 
      :mostrar="seeFour" 
      :soloLectura="false" 
      :test="test"
      :alternativeId="alternativeId"
      @cancelar="seeFour = false, test = null"
    />
  </div>
</template>

<script>
import { serviceToken } from "../../helpers/service.service";
import susComponent from "../test/susComponent.vue";
import npsComponent from "../test/npsComponent.vue";
import accComponent from "../test/accComponent.vue";
import seeFourComponent from "../test/card4.vue";
import questComponent from "../test/quest.vue";
export default {
  name: "step1",
  components: {
    susComponent,
    npsComponent,
    accComponent,
    seeFourComponent,
    questComponent
  },
  props: {
  },
  data() {
    return {
      loading: false,
      alternatives: [],
      tests: [],
      seeSUS: false,
      seeNPS: false,
      seeACC: false,
      seeFour: false,
      seeQuest: false,
      test: null,
      testSus: null,
      alternativeId: null,
      alternativeName: "",
    };
  },
  mounted() {
    this.getAlternatives();
  },
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
    async getAlternatives(){
      const data = {
        method: "evaluations.alternatives.get",
        project: parseInt(this.$route.params.id),
      };
      this.alternatives = await this.funcion(data);
      await this.getTests();
    },
    async getTests(){
      const data = {
        method: "evaluations.tests.list",
        project: parseInt(this.$route.params.id),
      };
      this.tests = await this.funcion(data);
    },
    async openTest(item, alternativeId, alternativeName){
      this.alternativeId = alternativeId;
      this.alternativeName = alternativeName;
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
    }
  },
};
</script>