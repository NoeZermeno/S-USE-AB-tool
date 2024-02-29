<template>
  <v-dialog v-model="mostrar" max-width="800" color="#19A08D" persistent>
    <v-card class="overflow-y-auto">
      <v-toolbar dark color="#19A08D" style="display: flex; justify-content: center">
        <v-toolbar-title>Subscribe to a project</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12">
                <v-text-field
                  v-model="code"
                  label="Project code"
                  required
                  :rules="codeAndNameRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <p class="errorMessage">{{ errorMessage }}</p>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small dark outlined color="#19A08D" class="ml-1" @click="$emit('cancelar')">
                Cancel
              </v-btn>
              <v-btn @click="guardar()" small color="#19A08D" :disabled="!valid" :loading="loading">
                submit
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
// import { serviceToken } from "../../helpers/service.service";
// import { mapGetters } from "vuex";
export default {
  name: "form-project",
  props: ["mostrar", "editarProject"],

  data() {
    return {
      loading: false,
      valid: false,
      code: "",
      codeAndNameRules: [(v) => !!v || "Required"],
      errores: [],
      errorMessage: "",
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async guardar() {
      try {
        console.log("subscribirse");
        // this.loading = true;
        // const myDate = new Date();
        // const data = {
        //   method: "project.add",
        //   name: this.title,
        //   begin: myDate.toISOString(),
        //   end: myDate.toISOString(),
        //   pic: this.profilePhoto.file,
        // };
        // const serverResponse = await serviceToken(data);
        // this.loading = false;
        // if (serverResponse.status == "error")
        //   alert(`${serverResponse.message}`);
        // if (serverResponse.status == "success") {
        //   this.$emit("update");
        //   this.$emit("cancelar");
        // }
      } catch (error) {
        // console.log(error);
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