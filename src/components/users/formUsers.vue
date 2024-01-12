<template>
  <v-dialog v-model="mostrar" max-width="800" persistent>
  <v-form v-model="valid" ref="form">
    <v-card>
      <v-toolbar color="primary" dark dense flat><h3>Users</h3></v-toolbar>
      <v-container>
        <v-row >
          <v-col cols="12">
            <v-text-field
              v-model="nombre"
              label="Nombre"
              color="blue-grey"
              outlined
              dense
              required 
              :rules="codeAndNameRules"
            ></v-text-field>
          </v-col>
           
          <v-col cols="12" v-if="!usuario">
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :loading="loading"
              :disabled="loading"
              color="blue-grey"
              outlined
              dense
              required 
              :rules="codeAndNameRules"
            ></v-text-field>
          </v-col>
       
        </v-row>
      
       <p class="errorMessage">{{ errorMessage }}</p>

      </v-container>
      <v-divider class="mx-3"></v-divider>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small dark outlined color="primary" class="ml-1" @click="$emit('cancelar')">Cancel
          </v-btn>
          <v-btn @click="guardar()" small color="primary" :disabled="!valid" :loading="loading"> save </v-btn>
      </v-card-actions>

    </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import {  serviceToken } from "../../helpers/service.service"

export default {
  props: ["mostrar","usuario" ],
  computed: {
    blockAceptar() {
      if (this.loading ) return true;
      if (this.nombreErrors.length == 0) return true;
      if (this.passwordErrors.length > 0) return true;
      return false;
    },
  },
  data() {
    return {
      loading: false,
      nombre: "",
      password:"",
      errorMessage:"",
      valid: false,
      codeAndNameRules: [
          v => !!v || 'Required',
      ],
    };
  },
  created(){
    if(this.usuario) {
      this.nombre = this.usuario.nombre
    }
  },
  methods: {
    async guardar() {
      try {
          this.loading=true;
          const data = {
              // 'method':'',
              
          }
          const serverResponse = await serviceToken(data);
          this.loading = false;
          console.log(serverResponse);
          if(serverResponse.status == 'error') alert(`${serverResponse.message}`);
          if(serverResponse.status == 'success') {
              this.$emit('update')
              this.$emit('cancelar')
              }
      
      } catch (error) {
          console.log(error);
          this.loading = false;
      }
          
    },
  },
};
</script>
<style>
.errorMessage {
  color: #FF0000
}
.invalid_input {
  border: 1px solid red;
}
</style>