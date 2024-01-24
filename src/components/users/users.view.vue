<template>
    <div>
    <v-container fluid>
      <v-card :loading="loading" >
        <v-system-bar><v-spacer></v-spacer><b>Users</b><v-spacer></v-spacer></v-system-bar>
      <v-row>
        <v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  small color="#19A08D" @click="agregar=true">
           <v-icon dark> mdi-plus </v-icon> add user
          </v-btn>
        </v-card-actions>
        </v-col>
      </v-row>
            
            <v-card-title>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :loading="loading"
              :search="search"
              :items="usuarios"
              class="mx-3"
             
            >
            <template v-slot:body="{ items }">
              <tbody>
              <tr v-for="(item, index) in items" :key="`item-${index}`">
              <td>{{ item.name }}</td>
              <td>
                <div style="padding: 10px; display: flex; justify-content: end;">
                <v-btn icon :disabled="loading" @click="editar(item)"><v-icon small>mdi-pencil</v-icon> </v-btn>
                <v-btn icon :disabled="loading" @click="eliminar(item)"><v-icon small>mdi-close</v-icon> </v-btn>
                  </div>
              </td>

            </tr>
            </tbody>
            </template>
            </v-data-table>
        </v-card>
        </v-container>
        <form-usuario
          v-if="agregar"
          :mostrar="agregar"
          :usuario="modificarUsuario"
          @cancelar="agregar=false, modificarUsuario=null"
        />
          <!-- @update="obetenerUsuarios" -->

    </div>
</template>
<script>
import FormUsuario from './formUsers.vue'
import { mapGetters } from "vuex";
import {  serviceToken } from "../../helpers/service.service"

export default {
  name:"usuarios",
  components: { FormUsuario },
  computed: {
    ...mapGetters(["sessionToken"]),
    // usuariosList() {
    //   const usuarios = [];
    //   let contador = 1;

    //   if(this.ures.length>0){
    //     for (const usuario of this.usuarios) {
    //       let index = null
    //       if(usuario.ures!=null) index = this.ures.findIndex(x=>x.ureMaster==usuario.ures)
    //       let nuevoUsuario = { 
    //         numero: contador++, 
    //         ...usuario,
    //         ure: index != null ? this.ures[index].entidad : 'N/A'
    //       };
    //       usuarios.push(nuevoUsuario);
    //     }
    //   }
    //   return usuarios;
    // },
        
  },
  mounted(){
      // if(this.sessionToken) {
      //   this.obtenerUsuarios()
      // }
  },
  
  data() {
      return {
        loading:false,
        search: "",
        na:"N/A",
        headers: [
          { text: "Nombre", value: "name" },
          { text: "", value: "" },
        ],
        usuarios: [{name:"nombre de prueba"},{name:"nombre de prueba2"}],
        agregar: false,
        modificarUsuario:null
      }
    },
    methods:{
     
      async obtenerUsuarios(){
        try {
        this.loading=true;
        // const data = {
        //  "method":'project.get'
        // }
          // const serverResponse = await serviceToken(data);
          // this.loading = false;

          //  if(serverResponse.status == 'error') alert(`${serverResponse.message}`); //TODO --> REVISAR QUE FUNCIONE ESTE ERROR
          //   else this.usuarios = serverResponse
      } catch (error) {
        // console.log(error);
        this.loading = false;
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        this.$store.dispatch("setSessionToken", null);
        this.$router.push("/login");
      }
      },
      // actualizarUsuarios(data){
      //   console.log(data);
      //   // this.tipo=''
      //   // let index = this.usuarios.findIndex(x=>x._id == data._id)
      //   // if(index!=-1) this.usuarios.splice(index,1,data)
      //   // else this.usuarios.push(data)

      // },
      modificar(item){
        this.agregar=true
        this.modificarUsuario=item;
      },
      async eliminar(item){
      var result = confirm(`Are you sure to delete ${item.name}?`);
      if (result==true) {
        try {
          this.loading=true;
          const data = {
             // 'method':'project.delete',
              'id':item.id
          }
          const serverResponse = await serviceToken(data);
          this.loading = false;
          console.log(serverResponse);
          let index = this.data1.findIndex(x=>x.id==item.id)
          if (index >= 0) this.usuarios.splice(index, 1);
        } catch (error) {
          // console.log(error);
          this.loading = false;
        }
      } else {
        return false;
      }
    },
    async editar(item){
    this.modificarUsuario=item;
    this.agregar=true
   },
    }
}

</script>