<template>
  <v-dialog v-model="mostrar" :scrim="false" fullscreen color="primary">
    <v-card>
      <v-toolbar
        dark
        color="primary"
        style="display: flex; justify-content: center"
      >
        <v-toolbar-title>Test</v-toolbar-title>
        <!-- <v-btn style="margin-rigth: 0px" icon dark @click="$emit('cancelar')">
            <v-icon>mdi-close</v-icon>
        </v-btn> -->
      </v-toolbar>
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
      <v-card-actions class="justify-end">
        <v-spacer></v-spacer>
        <v-btn
          small
          dark
          outlined
          color="primary"
          class="ml-1"
          @click="$emit('cancelar')"
          >Close
        </v-btn>
      </v-card-actions>
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