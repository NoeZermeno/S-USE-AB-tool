<template>

  <v-app style="background-color: #eceff1">
   
    <v-app-bar color="#19A08D" app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
         
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer>
      <v-btn small icon outlined @click="cerrarSesion()"><v-icon>mdi-power</v-icon></v-btn>
      -->
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :expand-on-hover="false"
      :mini-variant="false"
      app
      style="background-color: #faf8f5;"

    >
    <left-menu :menu="menu" @cerrarMenu="drawer = false" />

    </v-navigation-drawer>

    <main-content/>
    <main-footer />

  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import LeftMenu from "./leftMenu";
import MainFooter from "./mainFooter";
import MainContent from './mainContent.vue';
// import { serviceToken} from "../../helpers/service.service"
export default {
  components: { LeftMenu, MainFooter, MainContent },
  computed: {
     ...mapGetters(["sessionToken"]),
  },
  data: () => ({
    drawer: false,
    loading: false,
    menu: [
        {route:'/projects',title:'Projects', icon:"/data/SVG/Projects.svg"},
        {route:'/test',title:'Test', icon:"/data/SVG/Testing.svg"},
        {route:'/users',title:'Users'},
        {route:'/roles',title:'Roles'},
        {route:'/reports',title:'Reports', icon:"/data/SVG/REports.svg"}
    ],
  }),
  async created() {
    //TODO no podemos enviarlo al menú a menos de que tengamos algo para validar que el token este válido
    if (sessionStorage.getItem("token")) this.$store.dispatch("setSessionToken", sessionStorage.getItem("token"));
    if (localStorage.getItem("token")) this.$store.dispatch("setSessionToken", localStorage.getItem("token"));   
    if (!this.sessionToken) this.$router.push("/login");

  },
  methods: {
    // async cerrarSesion() {
    // try {
    //       this.loading = true;
    //       const data = {
    //         "method":'system.logout',
    //         "username": this.codigo,
    //         "password": this.password
    //     }
    //       const serverResponse = await serviceToken(data);
    //       this.loading = false;
    //        if(serverResponse.status == 'error') alert(`${serverResponse.message}`);
    //        if(serverResponse.status == 'success') {
    //             localStorage.removeItem("token");
    //             sessionStorage.removeItem("token");
    //             this.$store.dispatch("setSessionToken", null);
    //             this.$router.push("/login");
    //        }
    //     } catch (error) {
    //       this.loading = false;
    //       localStorage.removeItem("token");
    //       sessionStorage.removeItem("token");
    //       this.$store.dispatch("setSessionToken", null);
    //       this.$router.push("/login");
    //     }
    // },
  },
};
</script>