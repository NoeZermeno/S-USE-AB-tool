<template>
  <v-dialog v-model="mostrar" :scrim="false" color="#19A08D">
   <v-card>
    <v-toolbar dark color="#19A08D">
      <v-toolbar-title style="text-align: center;" dark>Test</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text small @click="$emit('cancelar')"> 
       <v-icon>mdi-close</v-icon>
       close
      </v-btn>
    </v-toolbar>
    <!-- CULAGOS ------------------------->
    <div style="padding: 5%">
      <div >
       <v-row style="display: flex; align-items: center; justify-content: center;">
       <h3>CULagos</h3>
       <v-tooltip top>
       <template v-slot:activator="{ on }">
       <v-checkbox
        color="#19A08D"
        v-model="checkculagos"
        class="pe-2" 
        v-on="on"></v-checkbox>
       </template>
       <span>see other table</span>
       </v-tooltip>
       </v-row>
      </div>
      <v-data-table
       
       :headers="headers"
       :items="checkculagos?culagos:culagosdata"
       class="elevation-1"
       hide-default-footer
      >
      <template v-slot:body="{ items }">
       <tbody>
        <tr v-for="(item, index) in items" :key="`item-${index}`">
          <td  >
           {{item.name}}
          </td>
          <td  style="text-align: center"><span v-html="item.see"></span></td>
          <td  style="text-align: center"><span v-html="item.hearing"></span></td>
          <td  style="text-align: center"><span v-html="item.touch"></span></td>
         
        </tr>
       </tbody>
      </template></v-data-table>
      <v-list-item>
          <v-list-item-content>
          <v-list-item-title>General Linguistic Term</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <p v-if="checkculagos">{{culagosglt}}</p>
            <p v-else v-html="culagosgltdata"></p>
          </v-list-item-action>
       </v-list-item>
       <v-divider></v-divider>
       <v-list-item>
          <v-list-item-content>
          <v-list-item-title>General ranking (2T-WA)</v-list-item-title>
          
          </v-list-item-content>
          <v-list-item-action>
            <p v-if="checkculagos">{{culagosttwa}}</p>
            <p v-else >{{culagosttwadata}}</p>
          </v-list-item-action>
       </v-list-item>
      </div>
    <!-- CUNORTE ------------------------->
      <div style="padding: 5%">
      <div style="text-align: center">
       <v-row style="display: flex; align-items: center; justify-content: center;">
       <h3>CUNorte</h3>
       <v-tooltip top>
       <template v-slot:activator="{ on }">
       <v-checkbox
        color="#19A08D"
        v-model="checkcunorte"
        class="pe-2" 
        v-on="on"></v-checkbox>
       </template>
       <span>see other table</span>
       </v-tooltip>
       </v-row>
      </div>
      <v-data-table
       :headers="headers"
       :items="checkcunorte?cunorte:cunortedata"
       class="elevation-1"
       hide-default-footer
      >
      <template v-slot:body="{ items }">
       <tbody>
        <tr v-for="(item, index) in items" :key="`item-${index}`">
          <td  >
           {{item.name}}
          </td>
          <td  style="text-align: center"><span v-html="item.see"></span></td>
          <td  style="text-align: center"><span v-html="item.hearing"></span></td>
          <td  style="text-align: center"><span v-html="item.touch"></span></td>
        </tr>
       </tbody>
      </template>
      </v-data-table>
      <v-list-item>
          <v-list-item-content>
          <v-list-item-title>General Linguistic Term</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <p v-if="checkcunorte">{{cunorteglt}}</p>
            <p v-else v-html="cunortegltdata"></p>
          </v-list-item-action>
       </v-list-item>
       <v-divider></v-divider>
       <v-list-item>
          <v-list-item-content>
          <v-list-item-title>General ranking (2T-WA)</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <p v-if="checkcunorte">{{culagosttwa}}</p>
            <p v-else>{{cunortettwadata}}</p>
          </v-list-item-action>
       </v-list-item>
      </div>
    <!-- CUTonala ------------------------->
      <div style="padding: 5%">
      <div style="text-align: center">
       <v-row style="display: flex; align-items: center; justify-content: center;">
       <h3>CUTonalá</h3>
       <v-tooltip top>
       <template v-slot:activator="{ on }">
       <v-checkbox
        color="#19A08D"
        v-model="checkcutonala"
        class="pe-2" 
        v-on="on"></v-checkbox>
       </template>
       <span>see other table</span>
       </v-tooltip>
       </v-row>
      </div>

      <v-data-table
       :headers="headers"
       :items="checkcutonala?cutonala:cutonaladata"
       class="elevation-1"
       hide-default-footer
      >
      <template v-slot:body="{ items }">
       <tbody>
        <tr v-for="(item, index) in items" :key="`item-${index}`">
          <td  >
           {{item.name}}
          </td>
          <td  style="text-align: center"><span v-html="item.see"></span></td>
          <td  style="text-align: center"><span v-html="item.hearing"></span></td>
          <td  style="text-align: center"><span v-html="item.touch"></span></td>
         
        </tr>
       </tbody>
      </template>
      </v-data-table>
      
      <v-list-item>
          <v-list-item-content>
          <v-list-item-title>General Linguistic Term</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <p v-if="checkcutonala">{{cutonalaglt}}</p>
            <p v-else v-html="cutonalagltdata"></p>
          </v-list-item-action>
       </v-list-item>
       <v-divider></v-divider>
       <v-list-item>
          <v-list-item-content>
          <v-list-item-title>General ranking (2T-WA)</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <p v-if="checkcutonala">{{cutonalattwa}}</p>
            <p v-else>{{cutonalattwadata}}</p>
          </v-list-item-action>
       </v-list-item>
      </div>
   </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "dataView",
  props: ["mostrar", "projectInfo"],

  data() {
   return {
    loading: false,
    headers: [
      { text: "", value: "name", width:"200px"},
      { text: "See", value: "see", align: "center"},
      { text: "Hearing", value: "hearing", align: "center"},
      { text: "Touch", value: "touch", align: "center"},
    ],
    culagos: [
      {
       name: "NPS",
       see: "(Poor,0.45)",
       hearing: "(Poor,0.22)",
       touch: "(Ok,0.01)",
      },
      {
       name: "SUS",
       see: "(Poor,0.31)",
       hearing: "(Ok,-0.19)",
       touch: "(Ok,0.09)",
      },
      {
       name: "UT",
       see: "(Ok,0.17)",
       hearing: "(Ok,0.12)",
       touch: "(Ok,-0.46)",
      },
      {
       name: "ACC",
       see: "(None,0)",
       hearing: "(None,0)",
       touch: "(None,0)",
      },
      {
       name: "Role Linguistic Term",
       see: "(Ok,-0.2)",
       hearing: "(Poor,0.48)😢",
       touch: "(Ok,0.12)⭐️",
      },
    ],
    cunorte: [
      {
       name: "NPS",
       see: "(Ok,-0.07)",
       hearing: "(Poor,0.32)",
       touch: "(Poor,0.28)",
      },
      {
       name: "SUS",
       see: "(Ok,-0.07)",
       hearing: "(Poor,0.29)",
       touch: "(Poor,0.49)",
      },
      {
       name: "UT",
       see: "(Poor,0.46)",
       hearing: "(Ok,-0.17)",
       touch: "(Ok,-0.38)",
      },
      {
       name: "ACC",
       see: "(Ok,0)",
       hearing: "(Ok,0)",
       touch: "(None,0)",
      },
      {
       name: "Role Linguistic Term",
       see: "(Ok,0.08)",
       hearing: "(Ok,0.16)⭐️",
       touch: "(Poor,0.34)😢",
      },
    ],
    cutonala: [
      {
       name: "NPS",
       see: "(Poor,-0.47)",
       hearing: "(Worst imaginable,0.1)",
       touch: "(Poor,-0.21)",
      },
      {
       name: "SUS",
       see: "(Worst imaginable,0.16)",
       hearing: "(None,0.18)",
       touch: "(None,0.26)",
      },
      {
       name: "UT",
       see: "(Ok,-0.17)",
       hearing: "(Worst imaginable,-0.36)",
       touch: "(Worst imaginable,-0.19)",
      },
      {
       name: "ACC",
       see: "(None,0)",
       hearing: "(None,0)",
       touch: "(None,0)",
      },
      {
       name: "Role Linguistic Term",
       see: "(Poor,-0.25)😢",
       hearing: "(Ok,-0.08)⭐️",
       touch: "(Poor,0.47)",
      },
    ],
    culagosdata: [
      {
       name: "NPS",
       see: "(s<sup>sus</sup><sub>2</sub>,0.45)",
       hearing: "(s<sup>sus</sup><sub>2</sub>,0.22)",
       touch:"(s<sup>sus</sup><sub>3</sub>,0.01)"
      },
      {
       name: "SUS",
       see: "(s<sup>sus</sup><sub>2</sub>,0.31)",
       hearing: "(s<sup>sus</sup><sub>3</sub>,-0.19)",
       touch: "(s<sup>sus</sup><sub>3</sub>,-0.19)"
      },
      {
       name: "UT",
       see: "(s<sup>sus</sup><sub>3</sub>,0.17)",
       hearing: "(s<sup>sus</sup><sub></sub>3,0.12)",
       touch: "(s<sup>sus</sup><sub></sub>3,-0.46)"
      },
      {
       name: "ACC",
       see: "(s<sup>sus</sup><sub>0</sub>,0)",
       hearing: "(s<sup>sus</sup><sub>0</sub>,0)",
       touch: "(s<sup>sus</sup><sub>0</sub>,0)"
      },
      {
       name: "Role Linguistic Term",
       see: "(s<sup>sus</sup><sub>3</sub>,-0.2)",
       hearing: "(s<sup>sus</sup><sub>2</sub>,0.48)",
       touch: "(s<sup>sus</sup><sub>3</sub>,0.12)"
      },
    ],
    checkculagos:false,
    checkcunorte:false,
    checkcutonala:false,
    culagosglt: "(Ok,-0.12)",
    culagosttwa: 2,
    culagosgltdata: "(s<sup>sus</sup><sub>3</sub>,-0.12)",
    culagosttwadata: 2,
    cunorteglt: "(Ok,-0.19)",
    cunortettwa: 1,
    cunortegltdata: "(s<sup>sus</sup><sub>3</sub>,-0.19)",
    cunortettwadata: 1,
    cutonalaglt: "(Ok,-0.13)",
    cutonalattwa: 3,
    cutonalagltdata: "(s<sup>sus</sup><sub>3</sub>,-0.13)",
    cutonalattwadata: 3,

    cunortedata: [
      {
       name: "NPS",
       see: "(s<sup>sus</sup><sub>3</sub>,-0.07)",
       hearing: "(s<sup>sus</sup><sub>2</sub>,0.32)",
       touch: "(s<sup>sus</sup><sub>2</sub>,0.28)"
      },
      {
       name: "SUS",
       see: "(s<sup>sus</sup><sub>3</sub>,-0.07)",
       hearing: "(s<sup>sus</sup><sub>2</sub>,0.29)",
       touch: "(s<sup>sus</sup><sub>2</sub>,0.49)"
      },
      {
       name: "UT",
       see: "(s<sup>sus</sup><sub>2</sub>,0.46)",
       hearing: "(s<sup>sus</sup><sub>3</sub>,-0.17)",
       touch: "(s<sup>sus</sup><sub>3</sub>,-0.38)"
      },
      {
       name: "ACC",
       see: "(s<sup>sus</sup><sub>3</sub>,0)",
       hearing: "(s<sup>sus</sup><sub>3</sub>,0)",
       touch: "(s<sup>sus</sup><sub>0</sub>,0)"
      },
      {
       name: "Role Linguistic Term",
       see: "(s<sup>sus</sup><sub>3</sub>,0.08)",
       hearing: "(s<sup>sus</sup><sub>3</sub>,0.16)",
       touch: "(s<sup>sus</sup><sub>2</sub>,0.34)"
      },
    ],

    cutonaladata: [
      {
       name: "NPS",
       see: "(s<sup>sus</sup><sub>2</sub>,-0.47)",
       hearing: "(s<sup>sus</sup><sub>1</sub>,0.1)",
       touch: "(s<sup>sus</sup><sub>2</sub>,-0.21)"
      },
      {
       name: "SUS",
       see: "(s<sup>sus</sup><sub>1</sub>,0.16)",
       hearing: "(s<sup>sus</sup><sub>0</sub>,0.18)",
       touch: "(s<sup>sus</sup><sub>0</sub>,0.26)"
      },
      {
       name: "UT",
       see: "(s<sup>sus</sup><sub>3</sub>,-0.17)",
       hearing: "(s<sup>sus</sup><sub>1</sub>,-0.36)",
       touch: "(s<sup>sus</sup><sub>1</sub>,-0.19)"
      },
      {
       name: "ACC",
       see: "(s<sup>sus</sup><sub>0</sub>,0)",
       hearing: "(s<sup>sus</sup><sub>0</sub>,0)",
       touch: "(s<sup>sus</sup><sub>0</sub>,0)"
      },
      {
       name: "Role Linguistic Term",
      see: "(s<sup>sus</sup><sub>2</sub>,-0.23)",
       hearing: "(s<sup>sus</sup><sub>3</sub>,-0.08)",
       touch: "(s<sup>sus</sup><sub>2</sub>,0.47)"
      },
    ],



   };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
 }
</style>