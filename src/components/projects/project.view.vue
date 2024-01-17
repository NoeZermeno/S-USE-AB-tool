<template>
  <div style="width: 80%; margin: auto">
    <v-container fluid>
      <v-card :loading="loading" >
        <v-system-bar><v-spacer></v-spacer><b>Projects</b><v-spacer></v-spacer></v-system-bar>
      <v-row>
        <v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  small color="primary" @click="agregar=true">
           <v-icon dark> mdi-plus </v-icon> add project
          </v-btn>
        </v-card-actions>
        </v-col>
      </v-row>
      
      <v-row align="center" justify="center">
        <v-col
          v-for="(variant, i) in proyectosList"
          :key="i"
          cols="auto"
        >
        <v-card class="mx-auto" outlined >
        <v-list-item three-line>
          <v-list-item-content>
           
            <v-list-item-title class="text-h5 mb-1">
            <router-link :to="'/project/'+variant.id+'/wizard'" class="link">{{ variant.name}} </router-link>
            </v-list-item-title>
            <v-list-item-subtitle>Begin: {{variant.inicio}} </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar
            tile
            size="80"
            color="grey"
          ></v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn text @click="editar(variant)"><v-icon dark> mdi-table-edit </v-icon> edit </v-btn>
            <v-btn text @click="eliminar(variant.id)"><v-icon dark> mdi-delete </v-icon> delete </v-btn>
      
          </v-card-actions>
       
        </v-card>
       
      </v-col>
    </v-row>
    </v-card>
    </v-container>
    <form-project
      v-if="agregar"
      :mostrar="agregar"
      :editarProject="editarProject"
      @update="getProjects()"
      @cancelar="agregar=false, editarProject=null"
      />
      <!-- :convocatoria="editarConvocatoria" 
      @actualizarConvocatorias="actualizarConvocatorias"
      -->

  </div>
</template>
<script>
import { serviceToken } from '../../helpers/service.service'
import formProject from './formProject.vue'
import { mapGetters } from "vuex"

import { DateTime } from 'luxon'
export default {
  name:"projects",
  computed: {
    ...mapGetters(["sessionToken" ]),
    proyectosList(){
      return this.projects.map(x=> {
        return {id:x.id,name:x.name, inicio: DateTime.fromISO(x.begin).toFormat('dd-MM-yyyy')}
      })
    }
  },
  components:{ formProject },
  mounted(){

   if(this.sessionToken)  this.getProjects()
  },
  data() {
    return {
      loading: false,
      agregar: false,
      projects:[],
      editarProject:null
    }
  },
  methods:{
    async getProjects(){
      try {
        this.loading=true;
        const data = {
            "method":'project.get'
        }
          const serverResponse = await serviceToken(data);
          this.loading = false;

           if(serverResponse.status == 'error') alert(`${serverResponse.message}`); //TODO --> REVISAR QUE FUNCIONE ESTE ERROR
            else this.projects = serverResponse
      } catch (error) {
        // console.log(error);
        this.loading = false;
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.$store.dispatch("setSessionToken", null);
        this.$router.push("/login");
      }
    },
   async eliminar(id){
      var result = confirm("Are you sure to delete?");
      if (result==true) {
        try {
          this.loading=true;
          const data = {
              'method':'project.delete',
              'id':id
          }
          const serverResponse = await serviceToken(data);
          this.loading = false;
          console.log(serverResponse);
          let index = this.projects.findIndex(x=>x.id==id)
          if (index >= 0) this.projects.splice(index, 1);
        } catch (error) {
          // console.log(error);
          this.loading = false;
        }
      } else {
        return false;
      }
   },
   editar(item){
    this.agregar=true,
    this.editarProject=item
   },
   
  }
}
</script>