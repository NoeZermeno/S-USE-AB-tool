<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm7 md5>
            <v-form v-on:submit.prevent>
              <v-card class="elevation-12" :loading="enviando">
                <v-toolbar dense dark color="primary">
                  <v-spacer></v-spacer>
                  <v-toolbar-title class="text-md-center">Register</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-row>
              <v-col cols="12">
                <div class="avatar d-flex justify-center align-end ma-4">
                <v-avatar color="surface-variant" size="128" class="mx-n6">
                    <v-img :src="profilePhoto.img" cover></v-img>
                </v-avatar>
          

                <v-file-input
                    id="file-picker"
                    type="file"
                    accept="image/png, image/jpeg, image/bmp"
                    hidden
                    @change="filePicked"
                ></v-file-input>
                <v-btn color="primary" :loading="enviando" @click="pickFile">
                  <v-icon>mdi-camera</v-icon>
                </v-btn>
                </div>
                <v-text-field
                    v-model="firstname"
                    class="w-100 px-2"
                    label="First name"
                    
                ></v-text-field>
                <v-text-field
                    v-model="lastname"
                    class="w-100 px-2"
                    label="Last name"
                    
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    class="w-100 px-2"
                    label="Password"
                    type="password"
                   
                ></v-text-field>
              

                <v-text-field
                    v-model=" email"
                    class="w-100 px-2"
                    label="Email"
                   
                ></v-text-field>
                <v-text-field
                    v-model="organization"
                    class="w-100 px-2"
                    label="Organization"
                   
                ></v-text-field>
                      <p class="errorMessage">{{ errorMessage }}</p>|
                      <v-btn type="submit" color="primary" @click="submit()" dark :disabled="enviando">save</v-btn>
             </v-col>
                    
                  </v-row>
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

export default {
  // mixins: [validationMixin],
  components: {
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
  data() {
    return {
      enviando: false,
        profilePhoto :{img: null},
        firstname:"",
        lastname:"",
        password: '',
        // confirmPassword: '',
        email:"",
        organization:"",
        // profilePhoto:"",
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
            "method":  "system.profile.create",
            "profilePhoto":  this.profilePhoto.file,
            "firstname":  this.firstname,
            "lastname":  this.lastname,
            "password":  this.password,
            "email":  this.email,
            "organization": this.organization,
        }
          const serverResponse = await service(data);
          this.enviando = false;
          console.log(serverResponse);
           if(serverResponse.status == 'error') alert(`${serverResponse.message}`);
           if(serverResponse.status == 'success') this.$router.push('/Home');
            
        } catch (error) {
          this.enviando = false;
        }
      },
    async filePicked(target){
      console.log(target);
    
        if (!target) return;
      //  this.loading=true
        const img = await this.getImgData(target);
      
      this.profilePhoto = {img, file: target};
      console.log(this.profilePhoto);
    },
   getImgData (file) {
    if (!file) return Promise.resolve();

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        const timer = setTimeout(reject, 5000);
        fileReader.readAsDataURL(file);
        fileReader.addEventListener('load', function () {
            clearTimeout(timer);
            resolve(this.result);
        });
    });
   },
   pickFile() {
    document.querySelector('#file-picker').click();
}
}
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