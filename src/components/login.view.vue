<template>
  <v-app style="width: 100%; margin: auto" id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm7 md5>
            <v-form v-on:submit.prevent>
              <v-card class="elevation-12" :loading="enviando">
                <v-toolbar dense dark color="#19A08D">
                  <v-spacer></v-spacer>
                  <v-toolbar-title class="text-md-center">Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-img src="/data/Logo-USE-AB-tool.png" style="margin:auto; width: 60%; margin-top: 10px !important" ></v-img>
                <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field 
                      :prepend-icon="'mdi-account'" 
                      label="User"
                      v-model="codigo" 
                      color="blue-grey"
                      required 
                      :rules="rulesLogin"
                      >
                    </v-text-field>
                    <v-text-field 
                      prepend-icon="mdi-lock"
                      label="Password" 
                      type="password"
                      color="blue-grey" 
                      v-model="password"
                      required 
                      :rules="rulesLogin"
                    >
                    </v-text-field>
                    <p class="errorMessage">{{ errorMessage }}</p>
                    <v-card-actions style="justify-content:center">
                    <v-btn type="submit" color="#19A08D" @click="submit()" dark :disabled=" enviando"
                    :loading="enviando"
                    >SIGN IN</v-btn>
                    </v-card-actions> 
                  </v-col>
                </v-row>
                </v-card-text>
                <v-card-text class="text-center">Don't have account?
                  <router-link to="/sign-up">SIGN UP</router-link>
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
// import { validationMixin } from 'vuelidate'
// import { required, minLength } from '/lib/validators'
import { service } from '../helpers/service.service'
import { mapGetters } from 'vuex'
export default {
  name:'login',
  // mixins: [validationMixin],
  components: {
    ...mapGetters(["sessionToken"])
  },
  computed: {
  },

  created(){
    if(sessionStorage.getItem("token") ){
      this.$store.dispatch("setSessionToken", sessionStorage.getItem("token"));
      this.$router.push('/home');
    }
    if(localStorage.getItem("token") ){
      this.$store.dispatch("setSessionToken", localStorage.getItem("token"));
      this.$router.push('/home');
    }
  },
  data() {
    return {
      enviando: false,
      codigo: '',
      password: "",
      errorMessage: '',
      valid: false,
      rulesLogin: [
          v => !!v || 'Required',
      ],
    }
  },

  methods: {
    async submit() {
      try {
        this.errorMessage = ""
        this.loading = true;
        const data = {
          "method":'system.login',
          "username": this.codigo,
          "password": this.password
        }
        const serverResponse = await service(data);
        this.loading = false;
        // console.log(serverResponse);
        if(serverResponse.status == 'error') this.errorMessage= serverResponse.message;
        if(serverResponse.status == 'success') {
          this.$store.dispatch("setSessionToken", serverResponse.ari_dasci_uid);
          localStorage.setItem("token", serverResponse.ari_dasci_uid);
          this.$router.push('/home');
        }
          
      } catch (error) {
          // console.log(error);
          this.loading = false;
          this.errorMessage = error.response.data.message
        }
      }
    },
  }

</script>

<style>
.errorMessage {
  color: #FF0000
}
.invalid_input {
  border: 1px solid red;
}
</style>