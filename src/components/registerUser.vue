<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm7 md5>
            <v-form v-on:submit.prevent v-model="valid" ref="form">
              <v-card class="elevation-12" :loading="enviando">
                <v-toolbar dense dark color="#19A08D">
                  <v-spacer></v-spacer>
                  <v-toolbar-title class="text-md-center"
                    >Register</v-toolbar-title
                  >
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-row>
                    <v-col style="display: flex; justify-content: center" cols="12">
                      <div class="avatar d-flex align-end">
                        <v-avatar color="surface-variant" size="128">
                          <v-icon v-if="!profilePhoto.img" style="font-size: 128px">
                            mdi mdi-account
                          </v-icon>
                          <v-img v-else :src="profilePhoto.img" cover></v-img>
                        </v-avatar>
                        <v-file-input
                          style="display: none"
                          id="file-picker"
                          type="file"
                          accept="image/png, image/jpeg, image/bmp"
                          hidden
                          label="Select image"
                          @change="filePicked"
                        ></v-file-input>
                        <v-btn
                          style="margin-left: -40px"
                          outlined
                          color="#19A08D"
                          :loading="enviando"
                          @click="pickFile"
                        >
                          <v-icon>mdi-camera</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>

                  <v-text-field
                    v-model="firstname"
                    class="w-100 px-2"
                    label="First name"
                    required
                    :rules="formRules"
                  ></v-text-field>

                  <v-text-field
                    v-model="lastname"
                    class="w-100 px-2"
                    label="Last name"
                    required
                    :rules="formRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    class="w-100 px-2"
                    label="Password"
                    type="password"
                    required
                    :rules="formRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    class="w-100 px-2"
                    label="Email"
                    required
                    :rules="formRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="organization"
                    class="w-100 px-2"
                    label="Organization"
                    required
                    :rules="formRules"
                  ></v-text-field>
                  <p class="errorMessage">{{ errorMessage }}</p>
                  <v-row justify="center">
                    <v-btn
                      color="#19A08D"
                      :disabled="!valid || enviando"
                      @click="submit()"
                      >save</v-btn
                    >
                  </v-row>

                  <!-- </v-row> -->
                </v-card-text>
              </v-card>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { service } from "../helpers/service.service";

export default {
  components: {},
  computed: {},

  data() {
    return {
      enviando: false,
      valid: false,
      profilePhoto: { img: null },
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      organization: "",
      errorMessage: "",
      formRules: [(v) => !!v || "Required"],
    };
  },

  methods: {
    async submit() {
      try {
        this.loading = true;
        const data = {
          method: "system.profile.create",
          profilePhoto: this.profilePhoto.file,
          firstname: this.firstname,
          lastname: this.lastname,
          password: this.password,
          email: this.email,
          organization: this.organization,
        };
        const serverResponse = await service(data);
        this.enviando = false;
        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        if (serverResponse.status == "success") this.$router.push("/Home");
      } catch (error) {
        this.enviando = false;
      }
    },
    async filePicked(target) {
      if (!target) return;
      const img = await this.getImgData(target);
      this.profilePhoto = { img, file: target };
    },
    getImgData(file) {
      if (!file) return Promise.resolve();

      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        const timer = setTimeout(reject, 5000);
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", function () {
          clearTimeout(timer);
          resolve(this.result);
        });
      });
    },
    pickFile() {
      document.querySelector("#file-picker").click();
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