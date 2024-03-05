<template>
  <div>
    <v-container fluid>
      <v-card >
        <div style="display: flex; justify-content: center">
          <div style="margin: 25px">
            <v-avatar color="surface-variant" size="128" class="mx-n6">
                <v-img src="https://static.vecteezy.com/system/resources/previews/024/063/069/original/black-file-icon-symbol-free-png.png"></v-img>
            </v-avatar>
          </div>
          <div style="margin:25px; display:flex; align-items: center">
            <h2> Test</h2>
          </div>
        </div>
        <div>
          <p style="margin-left: 5px">Projects/Create</p>
        </div>

      <template >
        <v-stepper v-model="e1">
          <v-stepper-header style="font-size: x-small">
            <v-stepper-step :complete="e1 > 1" step="1">
              Step 1: Set the alternatives
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">
              Step 2: Set the criteria
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2.1" step="2.1">
              Step 2.1: Set the importance of criteria
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 3" step="3">
              Step 3: Set of users
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 4" step="4">
              Step 4: Set of roles
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 4.1" step="4.1">
              Step 4.1: Set the importance of roles
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items style="height: 700px;">
            <v-stepper-content style="height:100% !important" step="1" >
              <div style="height:80% !important">
                <stepOne
                  :selected="selected1"
                  @alternativesChanged="colorStep1"
                />
              </div>
              <div class="boton" style="height:20% !important">  
                <v-btn dark :color="color1" @click="validaStep1()">Next</v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content style="height:100% !important" step="2" >
              <div style="height:80% !important">
              <v-card>
                <v-data-table
                  :headers="headers2"
                  :items="data2"
                  item-key="alias"
                  class="elevation-1"
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr v-for="(item, index) in items" :key="`item-${index}`">
                        <td style="width: 50px">
                          <v-simple-checkbox
                            @click="actionStep2(index, item.id), colorStep2()"
                            v-model="item.exists"
                          ></v-simple-checkbox>
                        </td>
                        <td style="text-align: left">{{ item.alias }}</td>
                        <td style="text-align: left">{{ item.name }}</td>
                        <td style="text-align: left">{{ item.instructions }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </v-card>
              </div>
              <div class="boton" style="height:20% !important">  
                <v-btn style="margin-right: 20px" @click="e1 = 1">Return</v-btn>
              <v-btn dark :color="colorStep2()" @click="validaStep2()">Next</v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content style="height:100% !important" step="2.1" >
              <div style="height:80% !important">
              <v-card>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small color="success">
                  CI=0.09
                </v-btn>
              </v-card-actions>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                      <th>Criteria</th>
                      <th v-for="item of selectedData2" :key="item.alias">{{ item.alias }}</th>
                  </thead>
                  <tbody>
                      <tr v-for="(itemx, x) in selectedData2" :key="itemx.alias">
                          <td>{{ itemx.alias }}</td>
                          <td v-for="(itemy, y) in selectedData2" :key="itemy.alias">
                              <v-select
                                  v-model="values[x][y]"
                                  :items="corelation"
                                  item-text="title"
                                  item-value="value"
                                  density="compact"
                                  :disabled="x == y"
                                  @change="val => onChangeValues(x, y, val)"
                              ></v-select>
                          </td>
                      </tr>
                  </tbody>
                </template>
              </v-simple-table>
              </v-card>
              </div>
              <div class="boton" style="height:20% !important">  
                <v-btn style="margin-right: 20px"  @click="e1 = 2">Return</v-btn>
                <v-btn dark :color="colorStep3()" @click="validaStep3()">Next</v-btn>
              </div>
            </v-stepper-content>

            
            <v-stepper-content style="height:100% !important" step="3" >
              <div style="height:80% !important">
              <v-card>
                  <div class="d-flex align-center justify-center">
                      <div class="d-flex flex-column align-center">
                          <v-img width="150" src="/images/experts.png"></v-img>
                          <div>Experts</div>
                      </div>
                      <div style="min-width: 50%">
                          <v-slider
                              v-model="percentageE"
                              class="mx-10 mt-6"
                              step="1"
                              max="100"
                              color="blue-lighten-1"
                              track-color="blue-lighten-1"
                              @change="setValueExperts()"
                          />
                      </div>
                      <div>
                          <h2>{{percentageE}}%</h2>
                      </div>
                  </div>
                  <div class="d-flex ma-10 align-center justify-center">
                          <div class="d-flex flex-column align-center">
                              <v-img width="150" src="/images/end-users.png"></v-img>
                              <div>End users</div>
                          </div>
                          <div style="min-width: 50%">
                              <v-slider
                                v-model="percentageU"
                                class="mx-10 mt-6"
                                step="2"
                                max="100"
                                color="blue-lighten-1"
                                track-color="blue-lighten-1"
                                @change="setValueUsers()"
                              />
                          </div>
                          <div><h2>{{percentageU}}%</h2></div> 
                      </div>
              </v-card>
              </div>
               <div class="boton" style="height:20% !important">  
                <v-btn style="margin-right: 20px" @click="e1 = 2.1">Return</v-btn>
              <v-btn dark color="#19A08D" @click="validaStep4()">Next</v-btn>
              </div>

            </v-stepper-content>

             <v-stepper-content style="height:100% !important" step="4" >
              <div style="height:80% !important">
              <v-card>
                <div class="d-flex flex-wrap align-content-space-evenly">
                    <v-list style="width: 100%">
                      <v-list-item-group v-model="selectedRoles" multiple>
                          <v-row >
                            <v-col v-for="(v, k) of groupedRoles" :key="k" sm="3" md="3" lg="3">
                              <h4 v-bind:style="{'text-align': 'center', 'border-bottom': '1px solid black', 'background-color': headersRoles[k-1].color}">{{headersRoles[k-1].name}}</h4>
                              <template v-for="e in v">
                                <v-list-item
                                  :key="e.id"
                                  variant="elevated"
                                  :color="roleCategoriesMap[e.role_category].color"
                                  @click="setRolesInfo(e)"
                                >
                                  <v-list-item-icon>
                                    <img style="height: 100px" :src="e.icon" />
                                  </v-list-item-icon>
                                  <v-list-item-title>{{e.title}}
                                    <v-list-item-subtitle>{{e.subtitle}}</v-list-item-subtitle>
                                  </v-list-item-title>
                                  
                                </v-list-item>
                              </template>
                            </v-col>
                          </v-row>
                        
                      </v-list-item-group>
                    </v-list>
                </div>
            </v-card>
            </div>
              
            <div class="boton" style="height:20% !important">  
                <v-btn style="margin-right: 20px" @click="e1 = 3">Return</v-btn>
              <v-btn dark :color="colorStep5()" @click="validaStep5()">Next</v-btn>
            </div>
            </v-stepper-content>
          <v-stepper-content style="height:100% !important" step="4.1" >
              <div style="height:80% !important">
              <v-card>
                <v-card class="d-flex flex-wrap align-center">
                    <div style="width:100%" v-for="(v, i) in categoriesSelected" :key="i" class="w-50 pa-2">
                        <v-card class="d-flex pa-2 align-center justify-space-between">
                            <v-slider
                                style="align-items: baseline"
                                class="w-75"
                                v-model="v.value"
                                :prepend-icon="v.icon"
                                :color="v.color"
                                :label="v.title"
                                step="1"
                                max="100"
                                track-color="grey"
                                @change="slidersValue(v)"
                            >
                            <template v-slot:append>
                              <v-text-field
                                v-model="v.value"
                                type="number"
                                style="width: 80px"
                                density="compact"
                                hide-details
                                outlined
                              ></v-text-field>
                            </template>
                            </v-slider>
                        </v-card>
                    </div>
                </v-card>
                <!-- <v-slider
                  v-model="sliderSpeak"
                  prepend-icon="mdi-volume-high"
                  step="1"
                  max="100"
                  color="yellow"
                  track-color="grey"
                  label="Speak"
                ></v-slider>
                <v-slider
                  v-model="sliderTouch"
                  prepend-icon="mdi-volume-high"
                  step="1"
                  max="100"
                  color="green"
                  track-color="grey"
                  label="Touch"
                ></v-slider>
                <v-slider
                  v-model="sliderHear"
                  prepend-icon="mdi-volume-high"
                  step="1"
                  max="100"
                  color="blue"
                  track-color="grey"
                  label="Hear"
                ></v-slider> -->
              </v-card>
              </div>
              <div class="boton" style="height:20% !important">  
                <v-btn style="margin-right: 20px" @click="e1 = 4">Return</v-btn>
              <v-btn dark color="#19A08D" @click="validaStep6()">Finish</v-btn>
              </div>

            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </template>
      </v-card>
    </v-container>
  </div>
</template>
     
<script>
import { serviceToken } from "../../helpers/service.service";
import { mapGetters } from "vuex";
import stepOne from "./stepOne";
import _ from "underscore";
// import { DateTime } from 'luxon'
export default {
  name: "wizard",
  computed: {
    ...mapGetters(["sessionToken"]),
    groupedRoles(){
      if(this.roles.length == 0) return [];
      else{
        let acc = this.roles.reduce((acc, curr) => {
          if (!(curr.role_category in acc)) {
              acc[curr.role_category] = [];
          }
          acc[curr.role_category].push(curr);
          return acc;
        }, {})
        return acc;
      }
    },
    roleCategoriesMap(){
      let acc = this.roleCategories.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
      }, {})
      return acc;
    }
        
  },
  components: {stepOne},
  watch: {},
  mounted() {
    //if(this.sessionToken)
    // get proyecto
  },
  data() {
    return {
      loading: false,
      next: false,
      next2: false,
      next3: false,
      e1: 1,
      selected1: [],
      selectedData1: [],
      selected2: [],
      selectedData2: [],
      coloor: "gray",
      headers2: [
        { text: "", value: "check" },
        { text: "Alias", value: "alias" },
        { text: "Nombre", value: "nombre" },
        { text: "Instrucciones", value: "instrucciones" },
      ],
      data2: [
        {
          alias: "SUS",
          nombre: "sus",
          instrucciones: "jchvdujscvdsujcdmscsdc",
        },
        {
          alias: "NPS",
          nombre: "nps",
          instrucciones: "kdcjskdmc sdc",
        },
        {
          alias: "Usability test",
          nombre: "test",
          instrucciones: "svjicnkmefs,cx",
        },
        {
          alias: "ACC",
          nombre: "https://ugr.es",
          instrucciones: "coajsnlDKCOX",
        },
      ],
      corelation: [
        {
          title: "1 important",
          value: 1,
        },
        {
          title: "2 important",
          value: 2,
        },
        {
          title: "3 important",
          value: 3,
        },
        {
          title: "4 important",
          value: 4,
        },
        {
          title: "5 important",
          value: 5,
        },
      ],
      evaluationCriteria: [
        {
          alias: "SUS",
          title: "System usability scale",
          instructions: "idsbkc",
          responsesScale: "",
        },
        {
          alias: "NPS",
          title: "Net promoter score",
          instructions: "ebkjdnmxd",
          responsesScale: "",
        },
        {
          alias: "Usability test",
          title: "Set of activities for LMS",
          instructions: "dwjbkscn",
          responsesScale: "",
        },
        {
          alias: "ACC",
          name: "iwjdbakcx",
          instructions: "ekbsdnx",
          scale: "5^5",
        },
      ],
      values: [],
      percentageE: 100,
      percentageU: 90,
      roles: [
        // {
        //   id: 1,
        //   title: 'Blind',
        //   subtitle: 'Permanent visual impairment.',
        //   category: 1,
        //   icon: '/images/blind.png'
        // },
        // {
        //   id: 2,
        //   title: 'One arm',
        //   subtitle: 'Permanent visual impairment.',
        //   category: 2,
        //   icon: '/images/one-arm.png'
        // },
        // {
        //   id: 3,
        //   title: 'Deaf',
        //   subtitle: 'Situationaly visual impairment ',
        //   category: 3,
        //   icon: '/images/deaf.png'
        // },
        // {
        //   id: 4,
        //   title: 'Non verbal',
        //   subtitle: 'Situationaly visual impairment ',
        //   category: 4,
        //   icon: '/images/non-verbal.png'
        // },
        // {
        //   id: 5,
        //   title: 'Cataratas',
        //   subtitle: 'Permanent visual impairment.',
        //   category: 1,
        //   icon: '/images/cataratas.png'
        // },
        // {
        //   id: 6,
        //   title: 'Arm injury',
        //   subtitle: 'Permanent visual impairment.',
        //   category: 2,
        //   icon: '/images/arm-injury.png'
        // },
        // {
        //   id: 7,
        //   title: 'Ear infection',
        //   subtitle: 'Permanent visual impairment.',
        //   category: 3,
        //   icon: '/images/ear-infection.png'
        // },
        // {
        //   id: 8,
        //   title: 'Laryngitis',
        //   subtitle: 'Permanent visual impairment.',
        //   category: 4,
        //   icon: '/images/laryngitis.png'
        // },
        // {
        //   id: 9,
        //   title: 'Distracted',
        //   subtitle: 'Permanent visual impairment.',
        //   category: 1,
        //   icon: '/images/distracted.png'
        // },
        // {
        //   id: 10,
        //   title: 'New parent',
        //   subtitle: 'Permanent visual impairment.',
        //   category: 2,
        //   icon: '/images/new-parent.png'
        // },
        // {
        //   id: 11,
        //   title: 'Bartender',
        //   subtitle: 'Permanent visual impairment.',
        //   category: 3,
        //   icon: '/images/bartender.png'
        // },
        // {
        //   id: 12,
        //   title: 'Heavy accent',
        //   subtitle: 'Permanent visual impairment.',
        //   category: 4,
        //   icon: '/images/heavy-accent.png'
        // }
      ],
      roleCategories: [
        {
            id: 1,
            title: 'See',
            icon: 'mdi mdi-eye-off',
            color: 'red'
        },
        {
            id: 2,
            title: 'Touch',
            icon: 'mdi mdi-account-injury',
            color: 'green'
        },
        {
            id: 3,
            title: 'Hear',
            icon: 'mdi mdi-ear-hearing-off',
            color: 'blue'
        },
        {
            id: 4,
            title: 'Speak',
            icon: 'mdi mdi-account-voice-off',
            color: 'yellow'
        }
      ],
      selectedRoles: [],
      selectedRolesInfo: [],
      sliderSpeak: 100,
      sliderTouch: 100,
      sliderHear: 100,
      headersRoles: [ 
        {name: "See", color: "#F44336"}, 
        {name: "Toch", color: "#4CAF50"}, 
        {name: "Hear", color: "#2196F3"}, 
        {name: "Speak", color: "#ffeb3b "}
        ],
      categoriesSelected: [],
      color1: "gray",
    };
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
    //------------ STEP 1
    async validaStep1() {
      this.colorStep1(this.selected1);
      if (this.next) {

        this.selected2 = [];

        this.data2 =  await this.funcion({method: 'config.tests.get', project: parseInt(this.$route.params.id)});
        const criteriaSelected = await this.funcion({method: 'project.tests.get', project: parseInt(this.$route.params.id)});
        criteriaSelected.forEach(c => {
          let index = this.data2.findIndex((x) => x.id == c);
          this.selected2.push(index);
        });
        this.data2 = this.data2.map(c => {
          let exists = false;
          if(criteriaSelected.includes(c.id)) exists = true;
          return {...c, exists}
        })
        this.e1 = 2;
      }
      else alert("At least two alternatives must be selected");
    },
    colorStep1(alternativesSelected) {
      this.selected1 = alternativesSelected;
      if (alternativesSelected.length >= 2) {
        this.next = true;
        this.color1 = "#19A08D";
      } else {
        this.next = false;
        this.color1 = "gray";
      }
    },

    // ------------- STEP 2
    validaStep2() {
      this.colorStep2();
      if (this.next2) {
        this.selectedData2 = [];
        this.values = [];
        for (let i = 0; i < this.selected2.length; i++) {
            this.selectedData2.push(this.data2[this.selected2[i]]);
        }
        this.values = Array.from({ length: this.selectedData2.length }, () => 1).map(() => Array.from({ length: this.selectedData2.length }, () => 1));
        this.e1 = 2.1;
      }else alert("At least two alternatives must be selected");
    },
    async actionStep2(index, idItem){
      if (index && idItem && this.selected2.includes(index)) {
        const data = {method: 'project.tests.unset', project: parseInt(this.$route.params.id), test: idItem};
        await this.funcion(data);
        let i = this.selected2.findIndex((i) => i == index);
        this.selected2.splice(i, 1)

      } else if(index && idItem && !this.selected2.includes(index)) {
        const data = {method: 'project.tests.set', project: parseInt(this.$route.params.id), test: idItem};
        await this.funcion(data);
        this.selected2.push(index)
      }
    },
    colorStep2() {
      if (this.selected2.length >= 2) {
        this.next2 = true;
        return "#19A08D";
      } else {
        this.next2 = false;
        return "gray";
      }
    },
    async eliminar2(item) {
      var result = confirm(`Are you sure to delete ${item.alias}?`);
      if (result == true) {
        try {
          this.loading = true;
          const data = {
            // 'method':'project.delete',
            id: item.id,
          };
          const serverResponse = await serviceToken(data);
          this.loading = false;
          console.log(serverResponse);
          let index = this.data2.findIndex((x) => x.id == item.id);
          if (index >= 0) this.data2.splice(index, 1);
        } catch (error) {
          // console.log(error);
          this.loading = false;
        }
      } else {
        return false;
      }
    },

    // ------------- STEP 3
    onChangeValues(x, y, value){
      if (x == y) return;
      this.values[x][y] = value;
      this.values[y][x] = value;
    },
    colorStep3() {
      if (this.selected2.length >= 2) {
        this.next3 = true;
        return "#19A08D";
      } else {
        this.next3 = false;
        return "gray";
      }
    },
    async validaStep3(){
      const data = {
        method: 'project.userScale.get', 
        project: parseInt(this.$route.params.id),
      }
      const serverResponse = await this.funcion(data);
      
      this.percentageE = serverResponse.experts;
      this.percentageU = serverResponse.endusers;
      this.e1 = 3;
    },

    // ------------- STEP 4
    async setValueExperts(){
      const data = {
        method: 'project.userScale.set', 
        project: parseInt(this.$route.params.id),
        user: 'EXPERT',
        value: this.percentageE
      }
      await this.funcion(data);
    },
    async setValueUsers(){
      const data = {
        method: 'project.userScale.set', 
        project: parseInt(this.$route.params.id),
        user: 'ENDUSER',
        value: this.percentageU
      }
      await this.funcion(data);
    },
    async validaStep4(){
      this.setValueExperts();
      this.setValueUsers();

      this.roles = await this.funcion({method: 'config.roles.get', project: parseInt(this.$route.params.id)});
      const rolesSelected = await this.funcion({method: 'project.roles.get', project: parseInt(this.$route.params.id)});
      rolesSelected.forEach(r => {
          let index = this.roles.findIndex((x) => x.id == r);
          this.selectedRoles.push(index);
          this.selectedRolesInfo.push(this.roles[index]);
        });
      this.e1 = 4;
    },

    // ------------- STEP 5
    colorStep5() {
      if (this.selectedRoles.length >= 2) {
        return "#19A08D"
      }else{
        return "gray"
      }
    },
    async setRolesInfo(e){
      const index = this.selectedRolesInfo.findIndex(i => i.id == e.id);
      if(index > -1) {
        await this.funcion({method: 'project.roles.unset', project: parseInt(this.$route.params.id), role: e.id});
        this.selectedRolesInfo.splice(index, 1)
      }
      else {
        await this.funcion({method: 'project.roles.set', project: parseInt(this.$route.params.id), role: e.id});
        this.selectedRolesInfo.push(e);
      }
    },
    async validaStep5(){
      if (this.selectedRolesInfo.length >= 2) {
        this.categoriesSelected = [];
        const categoriesSaved = await this.funcion({method: 'project.roleScale.get', project: parseInt(this.$route.params.id)});
        let activeCategories = [];
        for (let i = 0; i < this.selectedRolesInfo.length; i++) {
          const idCategory = this.roles[this.selectedRolesInfo[i].id-1].role_category;
          activeCategories.push(idCategory);
          const category = this.roleCategories.find(c => c.id == idCategory);
          const valueSaved = categoriesSaved[idCategory];
          valueSaved > 0 ? category.value = valueSaved : category.value = 100;
          const found = this.categoriesSelected.some(c => c.id === category.id);
          if (!found) this.categoriesSelected.push(category);
        }
        const categoriesDiference = _.difference([1, 2, 3, 4], activeCategories);
        for(const c of categoriesDiference){
          await this.slidersValue({id: c, value: 0});
        }
        this.e1 = 4.1;
      }else alert("At least two alternatives must be selected");
    },

    // ------------- STEP 6
    async slidersValue(value){
      const data = {
        method: 'project.roleScale.set', 
        project: parseInt(this.$route.params.id),
        rolecategory: value.id,
        value: value.value
      }
      await this.funcion(data);
    },
    async validaStep6(){
      for(const c of this.categoriesSelected){
        await this.slidersValue({id: c.id, value: c.value});
      }
      this.$router.push('/projects');
    },
  },
};
</script>

<style>
/* .div{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
     
  } */
  .boton{
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .v-stepper__wrapper{
    height: 100% !important;

  }
</style>