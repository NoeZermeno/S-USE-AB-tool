<template>
  <v-dialog v-model="mostrar" max-width="800" color="#19A08D" persistent>
    <v-card class="overflow-y-auto">
      <v-toolbar dark color="#19A08D" style="display: flex; justify-content: center">
        <v-toolbar-title>Select a rol to start</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12">
              <v-select v-model="roleSelected" :items="roles" label="Select role">
                <template v-slot:selection="{ item }">
                    {{ item.title }}
                </template>
                <template v-slot:item="{ item }">
                    <img :src="item.icon">{{ item.title }}
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small dark outlined color="#19A08D" class="ml-1" @click="$emit('cancelar')">
              Cancel
            </v-btn>
            <v-btn @click="guardar()" small color="#19A08D" :disabled="loading" :loading="loading">
              save
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
import { serviceToken } from "../../helpers/service.service";
// import { mapGetters } from "vuex";
export default {
  name: "role-selector",
  props: ["mostrar", "rolesSelectable", "idProject"],

  data() {
    return {
      loading: false,
      roles: [],
      roleSelected: null,
    };
  },
  computed: {},
  created() {
    this.roles = this.rolesSelectable.map((x) => {
        return { 
          ...x,
          icon: `https://lionware.dev/ari-dasci/webservice/?method=config.roles.pic&id=${x.id}`
        };
      });
    this.roleSelected = this.roles[0];
  },
  mounted() {},
  methods: {
    async guardar() {
      try {
        this.loading = true;
        const data = {
          method: "evaluations.roles.set",
          project: this.idProject,
          role: this.roleSelected.id,
        };
        const serverResponse = await serviceToken(data);
        this.loading = false;
        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        if (serverResponse.status == "success") {
          const route = '/project/' + this.idProject + '/quizzes/' + this.roleSelected.id;
          this.$emit("goToQuizzes", route);

        }
      } catch (error) {
        this.loading = false;
      }
    },
  },
};
</script>
<style>
.errorMessage {
  color: #ff0000;
}

.invalid_input {
  border: 1px solid red;
}
</style>