<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm7 md5>
            <v-form v-on:submit.prevent  v-model="valid" ref="form">
              <v-card class="elevation-12" :loading="enviando">
                <v-toolbar dense dark color="primary">
                  <v-spacer></v-spacer>
                  <v-toolbar-title class="text-md-center">Register</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                <v-row >
                <v-col cols="10" >
                <div class="avatar d-flex align-end">
                <v-avatar color="surface-variant" size="128" class="mx-n6">
                    <v-img :src="profilePhoto.img" cover></v-img>
                </v-avatar>
                <v-file-input
                    id="file-picker"
                    type="file"
                    accept="image/png, image/jpeg, image/bmp"
                    hidden
                    label="Select image"
                    @change="filePicked"
                ></v-file-input>
                <v-btn outlined color="primary" :loading="enviando" @click="pickFile">
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
                    v-model=" email"
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
                  <v-btn color="primary" :disabled="!valid || enviando" @click="submit()" >save</v-btn>
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
import { service } from '../helpers/service.service'

export default {
  components: {
  },
  computed: {
   
  },

  data() {
    return {
      enviando: false,
      valid:false,
      profilePhoto :{img: null},
      firstname:"",
      lastname:"",
      password: '',
      email:"",
      organization:"",
      errorMessage: '',
      formRules: [v => !!v || 'Required'],
    }
  },

  methods: {
    async submit() {
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
          if(serverResponse.status == 'error') alert(`${serverResponse.message}`);
          if(serverResponse.status == 'success') this.$router.push('/Home');    
        } catch (error) {
          this.enviando = false;
        }
    },
    async filePicked(target){
      if (!target) return;
      const img = await this.getImgData(target);
      this.profilePhoto = {img, file: target};
      
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