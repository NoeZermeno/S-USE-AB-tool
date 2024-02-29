<template>
  <div>
    <v-container fluid>
      <v-card :loading="loading" >
        <v-system-bar><v-spacer></v-spacer><b class="text-h5">Roles</b><v-spacer></v-spacer></v-system-bar>
      <v-row>
        <v-col>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  large color="#19A08D" disabled @click="agregar=true">
           <v-icon dark> mdi-plus </v-icon> add rol
          </v-btn>
        </v-card-actions> -->
        </v-col>
      </v-row>
      
      <v-row>
        <v-col v-for="(item, i) in roles"  :key="i" cols="6">
            <v-card>
              <div style="text-align: center" class="">
                <div>
                  <v-card-title style="display: block" class="text-h5">{{item.title}}</v-card-title>
                  <v-icon size="250">{{item.icon}}</v-icon>
                </div>
              </div>
            </v-card>
        </v-col>
      </v-row>
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
      roles:[
        {title: 'See', icon: "mdi mdi-eye-off-outline"}, 
        {title: 'Touch', icon: "mdi mdi-hand-back-right-off-outline"}, 
        {title: 'Hear', icon: "mdi mdi-ear-hearing-off"}, 
        {title: 'Speak', icon: "mdi mdi-account-voice-off"}
      ]
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