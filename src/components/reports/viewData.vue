<template>
  <v-dialog v-model="mostrar" :scrim="false" fullscreen color="#19A08D">
    <v-card>
      <v-toolbar dark color="#19A08D">
        <v-toolbar-title style="text-align: center;" dark>Test</v-toolbar-title>
        <v-spacer></v-spacer>
         <v-btn text small @click="$emit('cancelar')"> 
          <v-icon>mdi-close</v-icon>
          close
        </v-btn>
      </v-toolbar>
      <div style="padding: 5%">
        <div style="text-align: center">
          <h3>CULagos</h3>
        </div>
        <v-data-table
          :headers="headers"
          :items="data"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
        <v-list-item>
              <v-list-item-content>
              <v-list-item-title>General Linguistic Term</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                  <p>(Ok,-0.12)</p>
              </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
              <v-list-item-content>
              <v-list-item-title>General ranking (2T-WA)</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                  <p>2</p>
              </v-list-item-action>
          </v-list-item>
        </div>

        <div style="padding: 5%">
        <div style="text-align: center">
          <h3>CUNorte</h3>
        </div>
        <v-data-table
          :headers="headers"
          :items="data1"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
        <v-list-item>
              <v-list-item-content>
              <v-list-item-title>General Linguistic Term</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                  <p>(Ok,0.19)</p>
              </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
              <v-list-item-content>
              <v-list-item-title>General ranking (2T-WA)</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                  <p>1</p>
              </v-list-item-action>
          </v-list-item>
        </div>

        <div style="padding: 5%">
        <div style="text-align: center">
          <h3>CUTonalá</h3>
        </div>
        <v-data-table
          :headers="headers"
          :items="data2"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
        <v-list-item>
              <v-list-item-content>
              <v-list-item-title>General Linguistic Term</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                  <p>(Ok,-0.13)</p>
              </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
              <v-list-item-content>
              <v-list-item-title>General ranking (2T-WA)</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                  <p>3</p>
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
        { text: "", value: "name" },
        { text: "See", value: "see", align: "center" },
        { text: "Hearing", value: "hearing", align: "center" },
        { text: "Touch", value: "touch", align: "center" },
      ],
      data: [
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
      data1: [
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
      data2: [
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