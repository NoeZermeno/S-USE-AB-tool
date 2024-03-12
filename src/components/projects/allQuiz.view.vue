<template>
  <div>
    <v-container fluid>
      <v-card>
        <h1>[Under construction]</h1>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { serviceToken } from "../../helpers/service.service";
export default {
  name: "step1",
  props: {
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
  },
  methods: {
    async funcion(data) {
      try {
        this.loading = true;
        const serverResponse = await serviceToken(data);
        this.loading = false;

        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        else return serverResponse;
      } catch (error) {
        this.loading = false;
        alert("Sorry, failed connection");
      }
    },
  },
};
</script>

