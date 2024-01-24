<template>
  <div>
    <v-container fluid>
      <v-card style="padding-bottom: 20px" :loading="loading">
        <v-system-bar
          ><v-spacer></v-spacer><b>Usability Assessments</b><v-spacer></v-spacer
        ></v-system-bar>
        <v-card style="margin: 10px">
          <div style="background: #f5e642">
            <div style="padding: 10px; display: flex; justify-content: center">
              <v-avatar color="#8AA7FF"></v-avatar>
              <h2>Test Usability Assessments</h2>
              <v-spacer></v-spacer>
              <v-icon @click="viewData()">mdi mdi-eye-circle-outline</v-icon>
            </div>
          </div>
          <template>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Destiataries</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2" color="success">11</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Experts</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2" color="#19A08D">4</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-divider style="margin: 20px 0px 20px 0px"></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>NPS</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2">15/15</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>SUS</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2">15/15</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>UT</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ma-2">15/15</v-chip>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>ACC</v-list-item-title>
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