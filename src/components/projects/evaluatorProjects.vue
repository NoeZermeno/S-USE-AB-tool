<template>
  <div>
    <v-container fluid>
      <v-card flat style="margin-bottom: 50px" :loading="loading">
        <v-row align="center" justify="center">
          <v-col>
            <v-container>
              <v-row>
                <v-col v-for="(variant, i) in proyectosList" :key="i" sm="6" md="4" lg="4">
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-h5 mb-1">
                          <a @click="selectRole(variant)">{{variant.name}} </a>
                        </v-list-item-title>
                        <v-list-item-subtitle class="biggerText">
                          Begin: {{ variant.inicio }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-avatar tile size="80">
                        <v-avatar style="width: 80px; height: 80px" color="#8AA7FF">
                          <v-img :src="variant.image" cover></v-img>
                        </v-avatar>
                      </v-list-item-avatar>
                    </v-list-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <roleSelectorComponent
      v-if="roleSelection"
      :mostrar="roleSelection"
      :rolesSelectable="rolesSelectable"
      :idProject="idProject"
      @goToQuizzes="changeView"
      @cancelar="roleSelection = false"
    />
  </div>
</template>
<script>
import { serviceToken } from "../../helpers/service.service";
import { mapGetters } from "vuex";
import roleSelectorComponent from "./roleSelector.vue";

import { DateTime } from "luxon";
export default {
  name: "projects",
  computed: {
    ...mapGetters(["sessionToken"]),
    proyectosList() {
      return this.projects.map((x) => {
        return {
          id: x.id,
          name: x.name,
          inicio: DateTime.fromISO(x.begin).toFormat("dd-MM-yyyy"),
          image: `https://lionware.dev/ari-dasci/webservice/?method=project.pic&id=${x.id}`
        };
      });
    },
  },
  components: { roleSelectorComponent },
  mounted() {
    if (this.sessionToken) this.getProjects();
  },
  data() {
    return {
      loading: false,
      agregar: false,
      subscribir: false,
      projects: [],
      roleSelection: false,
      rolesSelectable: [],
      idProject: null,
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
    async getProjects() {
        const data = { method: "evaluations.projects.list" };
        this.projects = await serviceToken(data);
    },
    async selectRole(variant) {
      const data = { method: "evaluations.roles.selectable", project: variant.id};
      this.rolesSelectable = await serviceToken(data);
      this.idProject = variant.id;
      this.roleSelection = true;
    },
    changeView(route){
      this.roleSelection = false;
      this.$router.push(route);
    }
  },
};
</script>

<style scoped>
.biggerText {
  font-size: 18px !important;
}
</style>