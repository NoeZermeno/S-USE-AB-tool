<template>
  <div style="margin: 0px">
    <v-container fluid>
      <template>
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
            <v-stepper-step :complete="e1 > 3" step="3">
              Step 2.1: Set the importance of criteria
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 4" step="4">
              Step 3: Set of users
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 5" step="5">
              Step 4: Set of roles
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 6" step="6">
              Step 4.1: Set the importance of roles
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="mb-12">
                <v-row>
                  <v-col>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn small color="primary" @click="agregar = true">
                        <v-icon dark> mdi-plus </v-icon> add item
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
                <v-data-table
                  :headers="headers1"
                  :items="data1"
                  item-key="alias"
                  class="elevation-1"
                >
                  <template v-slot:body="{ items }">
                    <tbody>
                      <tr v-for="(item, index) in items" :key="`item-${index}`">
                        <td style="width: 50px">
                          <v-simple-checkbox
                            @change="colorStep1()"
                            v-model="selected1[index]"
                          ></v-simple-checkbox>
                        </td>
                        <td style="text-align: center; width: 50px">
                          {{ item.visible }}
                        </td>
                        <td style="text-align: center">{{ item.alias }}</td>
                        <td style="text-align: center">{{ item.url }}</td>
                        <td>
                          <div style="padding: 10px; display: flex; justify-content: center;">
                            <v-avatar color="#8AA7FF"></v-avatar>
                          </div>
                        </td>
                        <td>
                          <div style="padding: 10px; display: flex; justify-content: center;">
                            <v-btn icon :disabled="loading" @click="editar(item)">
                              <v-icon small>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn icon :disabled="loading" @click="eliminar(item)">
                              <v-icon small>mdi-close</v-icon>
                            </v-btn>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </v-card>

              <v-row>
                <v-col>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color="colorStep1()" @click="validaStep1()"
                      >Next</v-btn
                    >
                  </v-card-actions>
                </v-col></v-row
              >
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card class="mb-12">
                <v-row>
                  <v-col>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn small color="primary" @click="agregar = true">
                        <v-icon dark> mdi-plus </v-icon> add item
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
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
                            @change="colorStep2()"
                            v-model="selected2[index]"
                          ></v-simple-checkbox>
                        </td>
                        <td style="text-align: left">{{ item.alias }}</td>
                        <td style="text-align: left">{{ item.nombre }}</td>
                        <td style="text-align: left">
                          instruccionesinstruccionesinstruccionesinstruccionesinstrucciones
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-data-table>
              </v-card>
              <div style="text-align: end">
                <v-btn style="margin-right: 20px" @click="e1 = 1">Return</v-btn>
                <v-btn :color="colorStep2()" @click="validaStep2()">Next</v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card class="mb-12">
                <v-row>
                  <v-col>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn small color="success">
                        CI=0.09
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
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

              <div style="text-align: end">
                <v-btn style="margin-right: 20px" @click="e1 = 2">Return</v-btn>
                <v-btn color="primary" @click="e1 = 4">Next</v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="4">
              <v-card class="mb-12">
                <v-card>
                  <div class="d-flex ma-10 align-center justify-center">
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
                              />
                          </div>
                          <div><h2>{{percentageU}}%</h2></div> 
                      </div>
              </v-card>
              </v-card>

              <div style="text-align: end">
                <v-btn style="margin-right: 20px" @click="e1 = 3">Return</v-btn>
                <v-btn color="primary" @click="e1 = 5">Next</v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="5">
              <v-card class="mb-12">
                <div class="d-flex align-content-space-evenly">
                    <v-col v-for="(v, k) of groupedRoles" :key="k">
                      <v-list>
                        <v-list-item
                          v-for="e in v"
                          :key="e.id"
                          :title="e.title"
                          :subtitle="e.subtitle"
                          :active="selectedRoles.has(e.id)"
                          class="ma-1 rounded"
                          variant="elevated"
                          :color="roleCategoriesMap[e.category].color"
                          @click="updateRoles(e.id)"
                        >
                          <v-list-item-icon>
                            <img style="height: 100px" :src="e.icon" />
                          </v-list-item-icon>
                          <v-list-item-title>{{e.title}}
                            <v-list-item-subtitle>{{e.subtitle}}</v-list-item-subtitle>
                          </v-list-item-title>
                          
                        </v-list-item>
                      </v-list>
                    </v-col>
                </div>
            </v-card>

              <div style="text-align: end">
                <v-btn style="margin-right: 20px" @click="e1 = 4">Return</v-btn>
                <v-btn color="primary" @click="e1 = 6">Next</v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="6">
              <v-card class="mb-12">
                <v-slider
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
                ></v-slider>
              </v-card>

              <div style="text-align: end">
                <v-btn style="margin-right: 20px" @click="e1 = 5">Return</v-btn>
                <v-btn color="primary" @click="e1 = 1">Save</v-btn>
              </div>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </template>
    </v-container>
  </div>
</template>
     
<script>
import { serviceToken } from "../../helpers/service.service";
import { mapGetters } from "vuex";

// import { DateTime } from 'luxon'
export default {
  name: "wizard",
  computed: {
    ...mapGetters(["sessionToken"]),
    // data1List(){
    //   let list = []
    //   if(this.data1.length){
    //   list = this.data1.map(x=>{
    //     return {
    //       check:x.visible == 1 ? true : false,
    //       visible: x.visible,
    //       alias:x.alias,
    //       url:x.url,
    //       icono:x.logo
    //     }
    //   })
    //   }
    //   return list;

    // },
    // criteria: function () {
    //   const result = [];
    //   this.evaluationCriteria.forEach((e) => {
    //     console.log(e);
    //     this.selected2.map(function (s) {
    //       console.log(s);
    //     });
    //   });
    //   // this.evaluationCriteria.filter(e => this.selected2.value.includes(e.alias));
    //   return result;
    // },
    groupedRoles(){
      let acc = this.roles.reduce((acc, curr) => {
        if (!(curr.category in acc)) {
            acc[curr.category] = [];
        }
        acc[curr.category].push(curr);
        return acc;
      }, {})
      return acc;
    },
    roleCategoriesMap(){
      let acc = this.roleCategories.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
      }, {})
      return acc;
    }
        
  },
  components: {},
  watch: {
    // 'selected1':function(val){
    //       let contador = 0;
    //       if(val.length){
    //         for (let i = 0; i < val.length; i++) {
    //           if (typeof val[i] === 'boolean' && val[i]== true) contador++;
    //         }
    //         if(contador >= 2) this.coloor = 'primary'
    //         else {
    //           this.coloor = 'gray'
    //         }
    //       }
    //     }
  },
  mounted() {
    //if(this.sessionToken)
    // get proyecto
  },
  data() {
    return {
      loading: false,
      next: false,
      next2: false,
      e1: 1,
      selected1: [],
      selectedData1: [],
      selected2: [],
      selectedData2: [],
      headers1: [
        { text: "", value: "check" },
        { text: "Visible", value: "visible", align: "center" },
        { text: "Alias", value: "alias", align: "center" },
        { text: "Url", value: "url", align: "center" },
        { text: "Logo", value: "logo", align: "center" },
        { text: "Actions", value: "", align: "center" },
      ],
      data1: [
        {
          visible: 1,
          alias: "UGR",
          url: "https://ugr.es",
          logo: "[Foto]",
          actions: "[Editar][Eliminar]",
        },
        {
          visible: 1,
          alias: "UGR2",
          url: "https://ugr.es",
          logo: "[Foto]",
          actions: "[Editar][Eliminar]",
        },
        {
          visible: 1,
          alias: "UGR3",
          url: "https://ugr.es",
          logo: "[Foto]",
          actions: "[Editar][Eliminar]",
        },
        {
          visible: 1,
          alias: "UGR4",
          url: "https://ugr.es",
          logo: "[Foto]",
          actions: "[Editar][Eliminar]",
        },
      ],
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
      percentageE: 50,
      percentageU: 50,
      roles: [
        {
          id: 1,
          title: 'Blind',
          subtitle: 'Permanent visual impairment.',
          category: 1,
          icon: '/images/blind.png'
        },
        {
          id: 2,
          title: 'One arm',
          subtitle: 'Permanent visual impairment.',
          category: 2,
          icon: '/images/one-arm.png'
        },
        {
          id: 3,
          title: 'Deaf',
          subtitle: 'Situationaly visual impairment ',
          category: 3,
          icon: '/images/deaf.png'
        },
        {
          id: 4,
          title: 'Non verbal',
          subtitle: 'Situationaly visual impairment ',
          category: 4,
          icon: '/images/non-verbal.png'
        },
        {
          id: 5,
          title: 'Cataratas',
          subtitle: 'Permanent visual impairment.',
          category: 1,
          icon: '/images/cataratas.png'
        },
        {
          id: 6,
          title: 'Arm injury',
          subtitle: 'Permanent visual impairment.',
          category: 2,
          icon: '/images/arm-injury.png'
        },
        {
          id: 7,
          title: 'Ear infection',
          subtitle: 'Permanent visual impairment.',
          category: 3,
          icon: '/images/ear-infection.png'
        },
        {
          id: 8,
          title: 'Laryngitis',
          subtitle: 'Permanent visual impairment.',
          category: 4,
          icon: '/images/laryngitis.png'
        },
        {
          id: 9,
          title: 'Distracted',
          subtitle: 'Permanent visual impairment.',
          category: 1,
          icon: '/images/distracted.png'
        },
        {
          id: 10,
          title: 'New parent',
          subtitle: 'Permanent visual impairment.',
          category: 2,
          icon: '/images/new-parent.png'
        },
        {
          id: 11,
          title: 'Bartender',
          subtitle: 'Permanent visual impairment.',
          category: 3,
          icon: '/images/bartender.png'
        },
        {
          id: 12,
          title: 'Heavy accent',
          subtitle: 'Permanent visual impairment.',
          category: 4,
          icon: '/images/heavy-accent.png'
        }
      ],
      roleCategories: [
        {
            id: 1,
            title: 'see',
            icon: 'visibility_off',
            color: 'red'
        },
        {
            id: 2,
            title: 'touch',
            icon: 'personal_injury',
            color: 'green'
        },
        {
            id: 3,
            title: 'hear',
            icon: 'hearing_disabled',
            color: 'blue'
        },
        {
            id: 4,
            title: 'speak',
            icon: 'voice_over_off',
            color: 'yellow'
        }
      ],
      selectedRoles: new Set(),
      sliderSpeak: 50,
      sliderTouch: 50,
      sliderHear: 50,
    };
  },
  methods: {
    async funcion() {
      try {
        this.loading = true;
        const data = {
          //"method":'project.get'
        };
        const serverResponse = await serviceToken(data);
        this.loading = false;

        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        //TODO --> REVISAR QUE FUNCIONE ESTE ERROR
        else this.projects = serverResponse;
      } catch (error) {
        console.log(error);
        this.loading = false;
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.$store.dispatch("setSessionToken", null);
        this.$router.push("/login");
      }
    },
    //------------ STEP 1
    validaStep1() {
      this.colorStep1();
      if (this.next) {
        this.selectedData1 = [];
        for (let i = 0; i < this.selected1.length; i++) {
          if (typeof this.selected1[i] === "boolean" && this.selected1[i] == true)
            this.selectedData1.push(this.data1[i]);
        }
        this.e1 = 2;
      }
      else alert("At least two alternatives must be selected");
    },
    colorStep1() {
      let contador = 0;
      if (this.selected1.length) {
        for (let i = 0; i < this.selected1.length; i++) {
          if (typeof this.selected1[i] === "boolean" && this.selected1[i] == true)
            contador++;
        }
        if (contador >= 2) {
          this.next = true;
          return "primary";
        } else {
          this.next = false;
          return "gray";
        }
      }
    },
    async eliminar(item) {
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
          let index = this.data1.findIndex((x) => x.id == item.id);
          if (index >= 0) this.data1.splice(index, 1);
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      } else {
        return false;
      }
    },

    // ------------- STEP 2
    validaStep2() {
      this.colorStep2();
      if (this.next2) {
        this.selectedData2 = [];
        for (let i = 0; i < this.selected2.length; i++) {
          if (typeof this.selected2[i] === "boolean" && this.selected2[i] == true)
            this.selectedData2.push(this.data2[i]);
        }
        this.values = Array.from({ length: this.selectedData2.length }, () => 1).map(() => Array.from({ length: this.selectedData2.length }, () => 1));
        this.e1 = 3;
      }else alert("At least two alternatives must be selected");
    },
    colorStep2() {
      let contador = 0;
      if (this.selected2.length) {
        for (let i = 0; i < this.selected2.length; i++) {
          if (
            typeof this.selected2[i] === "boolean" &&
            this.selected2[i] == true
          )
            contador++;
        }
        if (contador >= 2) {
          this.next2 = true;
          return "primary";
        } else {
          this.next2 = false;
          return "gray";
        }
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
          console.log(error);
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

    // ------------- STEP 5
    updateRoles(id) {
      this.selectedRoles.has(id) ? this.selectedRoles.delete(id) : this.selectedRoles.add(id);
      console.log(this.selectedRoles);
    }
  },
};
</script>

<style scoped>
.container{
  max-width: 100% !important;
}
</style>