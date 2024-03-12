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
                          <router-link :to="'/project/' + variant.id + '/quizzes'" class="link">
                            {{ variant.name }}
                          </router-link>
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
  </div>
</template>
<script>
import { serviceToken } from "../../helpers/service.service";
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
          image: `https://lionware.dev/ari-dasci/webservice/?method=project.pic&id=${x.id}`
        };
      });
    },
  },
  components: {},
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
          method: "evaluations.projects.list",
        };
        const serverResponse = await serviceToken(data);
        this.loading = false;
        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        else this.projects = serverResponse;
      } catch (error) {
        this.loading = false;
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.$store.dispatch("setSessionToken", null);
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.biggerText {
  font-size: 18px !important;
}
</style>