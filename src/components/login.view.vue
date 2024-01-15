<template>
  <v-app style="width: 80%; margin: auto" id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm7 md5>
            <v-form v-on:submit.prevent>
              <v-card class="elevation-12" :loading="enviando">
                <v-toolbar dense dark color="primary">
                  <v-spacer></v-spacer>
                  <v-toolbar-title class="text-md-center">Login</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-row>
             <v-col cols="12">
                      <v-text-field 
                        :prepend-icon="'mdi-account'" 
                        label="User"
                        v-model="codigo" 
                        color="blue-grey" 
                        >
                        <!-- :error-messages="codigoErrors" 
                        @input="$v.codigo.$touch()"
                        @blur="$v.codigo.$touch()" -->
                      </v-text-field>
                      <v-text-field 
                        prepend-icon="mdi-lock"
                        label="Password" 
                        type="password"
                        color="blue-grey" 
                        v-model="password" 
                      >
                      </v-text-field>
                        <!-- :error-messages="passwordErrors"
                        @input="$v.password.$touch()" 
                        @blur="$v.password.$touch()"> -->
                      <p class="errorMessage">{{ errorMessage }}</p>
                      <v-card-actions style="justify-content:center">
                      <v-btn type="submit" color="primary" @click="submit()" dark :disabled="enviando">SIGN IN</v-btn>
                       </v-card-actions> 
             </v-col>
                    
                  </v-row>
                </v-card-text>
                       <v-card-text class="text-center">
                Don't have account?
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
    // codigoErrors() {
    //   const errors = []
    //   if (!this.$v.codigo.$dirty) return errors;
    //   !this.$v.codigo.minLength && errors.push("Mínimo 4 caracteres.");
    //   !this.$v.codigo.required && errors.push('Campo requerido.')
    //   return errors
    // },
    // passwordErrors() {
    //   const errors = []
    //   if (!this.$v.password.$dirty) return errors;
    //   !this.$v.password.required && errors.push('Campo requerido.')
    //   return errors
    // },
  },
  // validations: {
  //   codigo: { required, minLength: minLength(4) },
  //   password: { required, minLength: minLength(5) },
  // },
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
    }
  },

  methods: {
    async submit() {
      // this.$v.$touch();
      // if(!this.$v.codigo.$invalid && !this.$v.password.$invali){
         try {
          this.loading = true;
          const data = {
            "method":'system.login',
            "username": this.codigo,
            "password": this.password
        }
          const serverResponse = await service(data);
          this.loading = false;
          console.log(serverResponse);
           if(serverResponse.status == 'error') alert(`${serverResponse.message}`);
           if(serverResponse.status == 'success') {
              this.$store.dispatch("setSessionToken", serverResponse.ari_dasci_uid);
              localStorage.setItem("token", serverResponse.ari_dasci_uid);
              this.$router.push('/home');
           }
            
        } catch (error) {
          console.log(error);
          this.loading = false;
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