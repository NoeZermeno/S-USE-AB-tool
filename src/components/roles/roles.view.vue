<template>
  <div style="width: 80%; margin: auto">
    <v-container fluid>
      <v-card :loading="loading" >
        <v-system-bar><v-spacer></v-spacer><b>Roles</b><v-spacer></v-spacer></v-system-bar>
      <v-row>
        <v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  small color="primary" disabled @click="agregar=true">
           <v-icon dark> mdi-plus </v-icon> add rol
          </v-btn>
        </v-card-actions>
        </v-col>
      </v-row>
      
      <v-col v-for="(item, i) in roles"  :key="i" cols="12">
          <v-card>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5">{{item}}</v-card-title>
              </div>
            </div>
          </v-card>
      </v-col>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name:"roles",
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  components:{  },
  
  data() {
    return {
      loading: false,
      agregar: false,
      roles:['See', 'Touch', 'Hear', 'Speak']
    }
  },
  //methods:{
    // async getProjects(){
    //   try {
    //     this.loading=true;
    //     const data = {
    //         "method":'project.get'
    //     }
    //       const serverResponse = await serviceToken(data);
    //       this.loading = false;

    //        if(serverResponse.status == 'error') alert(`${serverResponse.message}`); //TODO --> REVISAR QUE FUNCIONE ESTE ERROR
    //         else this.projects = serverResponse
    //   } catch (error) {
    //     console.log(error);
    //     this.loading = false;
    //     localStorage.removeItem("token");
    //     sessionStorage.removeItem("token");
    //     this.$store.dispatch("setSessionToken", null);
    //     this.$router.push("/login");
    //   }
    // },,

  //}
  
}
</script>