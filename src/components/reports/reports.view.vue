<template>
  <div>
    <v-container fluid>
      <v-card style="padding-bottom: 20px" :loading="loading">
        <v-system-bar
          ><v-spacer></v-spacer><b class="text-h5">Usability Assessments</b><v-spacer></v-spacer
        ></v-system-bar>
        <v-card style="margin: 10px">
          <div style="background: #f5e642">
            <div style="padding: 10px; display: flex; justify-content: center">
              <v-avatar color="#8AA7FF"></v-avatar>
              <h2>Test Usability Assessments</h2>
              <v-spacer></v-spacer>
                 <v-tooltip left>
       <template v-slot:activator="{ on }">
        <v-icon v-on="on" @click="viewData()">mdi-eye</v-icon>
       </template>
       <span>more info</span>
       </v-tooltip>
             
            </div>
          </div>
          <template>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="biggerText">Destiataries</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2" color="success">11</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="biggerText">Experts</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2" color="#19A08D" style="color: white">4</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-divider style="margin: 20px 0px 20px 0px"></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="biggerText">NPS</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2">15/15</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="biggerText">SUS</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2">15/15</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="biggerText">UT</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2">15/15</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="biggerText">ACC</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2">4/4</v-chip>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-card>
      </v-card>
    </v-container>

    <dataView 
        v-if="see" 
        :mostrar="see" 
        @cancelar="see = false" 
    />
  </div>
</template>
<script>
// import { serviceToken } from '../../helpers/service.service'
import dataView from "./viewData.vue";
import { mapGetters } from "vuex";

// import { DateTime } from 'luxon';
export default {
  name: "projects",
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  components: { dataView },
  mounted() {},
  data() {
    return {
      loading: false,
      see: false,
    };
  },
  methods: {
    viewData() {
      this.see = true;
    },
  },
};
</script>

<style scoped>
.biggerText {
  font-size: 25px !important;
}
</style>