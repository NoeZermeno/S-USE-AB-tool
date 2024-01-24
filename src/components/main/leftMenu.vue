<template>
<div style="height: 100% !important">
  <!-- <v-list> -->
    <div style="height: 20% !important">
    <v-img src="/data/Logo-USE-AB-tool.png" style="margin:10px" ></v-img>
    </div>
    <v-divider></v-divider>
  <div style="height: 80% !important">

    <div class="divhijo1">
      <v-list>
        <v-list-item style="color: #19A08D !important; font-size: 25px" v-for="(item, index) in menu" :key="`${index}`" link @click="redirect(item.route)"><div style="width:35px;height:35px;"><v-img :src="item.icon"></v-img></div>{{item.title}}</v-list-item>
      </v-list>
    </div>
    <div class="divhijo2">
      <v-list>
      <v-list-item style="color: #19A08D !important; font-size: 25px" link @click="cerrarSesion()">Log out</v-list-item>
      </v-list>
    </div>
  </div>
  </div>
   
  <!-- </div> -->
</template>

<script>
import { mapGetters } from "vuex";
import { serviceToken} from "../../helpers/service.service"

export default {
  props:['menu'],
  computed: {
      ...mapGetters(["sessionToken"]),
  },
  data () {
    return {
    }
  },
  created(){
  },
  methods:{
    redirect(route){
      if( this.$route.path != route )
        this.$router.push(route);
      else
        this.$emit('cerrarMenu');
    },
    async cerrarSesion() {
    try {
          this.loading = true;
          const data = {
            "method":'system.logout',
            "username": this.codigo,
            "password": this.password
        }
          const serverResponse = await serviceToken(data);
          this.loading = false;
           if(serverResponse.status == 'error') alert(`${serverResponse.message}`);
           if(serverResponse.status == 'success') {
                localStorage.removeItem("token");
                sessionStorage.removeItem("token");
                this.$store.dispatch("setSessionToken", null);
                this.$router.push("/login");
           }
        } catch (error) {
          this.loading = false;
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          this.$store.dispatch("setSessionToken", null);
          this.$router.push("/login");
        }
    },
  }
}
</script>
<style >
.v-list-item{
  color: "#19A08D" !important
}
.divpadre{
  height: 80% !important;
}
.divhijo1{
  height: 50% !important;
}
.divhijo2{
  height: 50% !important;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  width: 100%;
}
</style>