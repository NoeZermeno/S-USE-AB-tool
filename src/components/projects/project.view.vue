<template>
  <div>
    <v-container fluid>
      <v-card style="margin-bottom: 50px" :loading="loading">
        <v-system-bar
          ><v-spacer></v-spacer><b class="text-h5">Own projects</b
          ><v-spacer></v-spacer
        ></v-system-bar>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn larger color="#19A08D" @click="agregar = true" dark>
                <v-icon> mdi-plus </v-icon> add project
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col>
            <v-container>
              <v-row>
                <v-col v-for="(variant, i) in proyectosList" :key="i" sm="6" md="4" lg="4">
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-h5 mb-1">
                          <router-link :to="'/project/' + variant.id + '/wizard'" class="link">
                            {{ variant.name }}
                          </router-link>
                        </v-list-item-title>
                        <v-list-item-subtitle class="biggerText">
                          Begin: {{ variant.inicio }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn text @click="editar(variant)">
                        <v-icon dark> mdi-table-edit </v-icon> edit
                      </v-btn>
                      <v-btn text @click="eliminar(variant.id)">
                        <v-icon dark> mdi-delete </v-icon> delete
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>

      <v-card style="margin-bottom: 50px" :loading="loading">
        <v-system-bar
          ><v-spacer></v-spacer><b class="text-h5">User projects</b
          ><v-spacer></v-spacer
        ></v-system-bar>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn larger color="#19A08D" @click="subscribir = true" dark>
                <v-icon> mdi-plus </v-icon> subscribe
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col>
            <v-container>
              <v-row>
                <v-col v-for="(variant, i) in proyectosList" :key="i" sm="6" md="4" lg="4">
                  <v-card class="mx-auto" outlined>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <v-list-item-title class="text-h5 mb-1">
                          <router-link :to="'/project/' + variant.id + '/wizard'" class="link">
                            {{ variant.name }}
                          </router-link>
                        </v-list-item-title>
                        <v-list-item-subtitle class="biggerText">
                          Begin: {{ variant.inicio }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-btn text @click="editar(variant)">
                        <v-icon dark> mdi-table-edit </v-icon> edit
                      </v-btn>
                      <v-btn text @click="eliminar(variant.id)">
                        <v-icon dark> mdi-delete </v-icon> delete
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <form-project
      v-if="agregar"
      :mostrar="agregar"
      :editarProject="editarProject"
      @update="getProjects()"
      @cancelar="(agregar = false), (editarProject = null)"
    />
    <subscribeProject
      v-if="subscribir"
      :mostrar="subscribir"
      @update="getProjects()"
      @cancelar="subscribir = false"
    />
  </div>
</template>
<script>
import { serviceToken } from "../../helpers/service.service";
import formProject from "./formProject.vue";
import subscribeProject from "./subscribeProject.vue";
import { mapGetters } from "vuex";

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
        };
      });
    },
  },
  components: { formProject, subscribeProject },
  mounted() {
    if (this.sessionToken) this.getProjects();
  },
  data() {
    return {
      loading: false,
      agregar: false,
      subscribir: false,
      projects: [],
      editarProject: null,
    };
  },
  methods: {
    async getProjects() {
      try {
        this.loading = true;
        const data = {
          method: "project.get",
        };
        const serverResponse = await serviceToken(data);
        this.loading = false;

        if (serverResponse.status == "error")
          alert(
            `${serverResponse.message}`
          ); //TODO --> REVISAR QUE FUNCIONE ESTE ERROR
        else this.projects = serverResponse;
      } catch (error) {
        // console.log(error);
        this.loading = false;
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.$store.dispatch("setSessionToken", null);
        this.$router.push("/login");
      }
    },
    async eliminar(id) {
      var result = confirm("Are you sure to delete?");
      if (result == true) {
        try {
          this.loading = true;
          const data = {
            method: "project.delete",
            id: id,
          };
          await serviceToken(data);
          this.loading = false;
          let index = this.projects.findIndex((x) => x.id == id);
          if (index >= 0) this.projects.splice(index, 1);
        } catch (error) {
          // console.log(error);
          this.loading = false;
        }
      } else {
        return false;
      }
    },
    editar(item) {
      (this.agregar = true), (this.editarProject = item);
    },
  },
};
</script>

<style scoped>
.biggerText {
  font-size: 18px !important;
}
</style>