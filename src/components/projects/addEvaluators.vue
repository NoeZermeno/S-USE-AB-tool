<template>
  <div>
    <v-card flat>
      <v-row>
        <v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn style="margin-bottom: 10px" small color="#19A08D" @click="agregar = true, type = types[0]" dark>
              <v-icon dark> mdi-plus </v-icon> add user
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-data-table
        style="max-height: 70%; overflow-y: scroll"
        dense
        :headers="headers"
        :items="usersSelected"
        item-key="alias"
        class="elevation-1"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="`item-${index}`">
              <td style="text-align: center">ID:{{item.user}} - {{ item.role }}</td>
                  <!-- <td style="text-align: center">{{ item.role }}</td> -->
              <td style="text-align: center">{{ item.fullname }}</td>
              <td>
                <div style="padding: 10px; display: flex; justify-content: center;">
                  <v-avatar color="#8AA7FF">
                    <v-img :src="item.image" cover></v-img>
                  </v-avatar>
                </div>
              </td>
              <td>
                <div style="padding: 10px; display: flex; justify-content: end">
                  <v-btn icon :disabled="loading" @click="eliminar(item)">
                    <v-icon small>mdi-close</v-icon>
                  </v-btn>
                </div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="agregar" scrollable max-width="800" color="#19A08D" persistent>
      <v-card class="overflow-y-auto">
        <v-toolbar dark color="#19A08D" style="display: flex; justify-content: center">
          <v-toolbar-title> Add user </v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row no-gutters>
                <v-col>
                  <v-select
                    v-model="type"
                    :items="types"
                    >
                  </v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user"
                    label="Search user"
                    @keyup="searchUsers"
                  ></v-text-field>
                  
                  <v-card  min-height="160" max-height="260" style="overflow: scroll" tile :disabled="loading" >
                    <v-card-subtitle v-if="usersArray.length==0">No data text</v-card-subtitle>
                       <v-list-item-group v-else v-model="settings" color="#19A08D">
                    <v-list-item v-for="(item, index) in usersArray" :key="`-${index}`">
                      <v-list-item-content>
                           <v-list-item-content @click="saveUser(item)">
                              <v-list-item-title>{{item.name}}</v-list-item-title>
                              <v-list-item-subtitle>ID: {{item.id}} - {{item.email}}</v-list-item-subtitle>
                            </v-list-item-content>
                      </v-list-item-content>
                    </v-list-item>
                       </v-list-item-group>
                  </v-card>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small dark outlined color="#19A08D" class="ml-1" @click="clearFields()">
                  Close
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
import { serviceToken } from "../../helpers/service.service";
export default {
  name: "step1",
  data() {
    return {
      loading: false,
      agregar: false,
      type: "",
      user: "",
      valid: false,
      headers: [
        { text: "Type", value: "role", align: "center", width: "20%" },
        { text: "User", value: "fullname", align: "center", width: "50%" },
        {text: "Image", value:"image",align: "center",},
        {text:""}
      ],
      // usersArray: ['athziri1','athziri2','athziri3'],
      usersArray: [],
      usersSelected: [],
      types: ['USER', 'EXPERT'],
      settings:-1,
    };
  },
  mounted() {
    this.loadUsers();
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
    async loadUsers() {
      const data = { method: "project.evaluators", project: this.$route.params.id };
      const serverResponse = await this.funcion(data);
      this.loading = false;
      if (serverResponse.length) {
        this.usersSelected = serverResponse;
        this.usersSelected = this.usersSelected.map((c) => {
          let image = `https://lionware.dev/ari-dasci/webservice/?method=config.users.pic&id=${c.user}`;
          return { ...c, image };
        });
      }
    },
    async eliminar(item) {

      var result = confirm(`Are you sure to delete ${item.fullname}?`);
      if (result == true) {
        const data = { method: "project.unenroll", project: parseInt(this.$route.params.id), user: item.user };
        const serverResponse = await this.funcion(data);
        if (serverResponse.status == "success") {
          let index = this.usersSelected.findIndex((x) => x.user == item.user);
          if (index >= 0) this.usersSelected.splice(index, 1);
        }
      } else {
        return false;
      }
    },
    async saveUser(item) {
      const data = {
        method: "project.enroll",
        project: parseInt(this.$route.params.id),
        user: item.id,
        role: this.type,
      };
      const serverResponse = await this.funcion(data);
      if (serverResponse.status == "error") {
        this.errorMessage = serverResponse.message;
      } else {
        this.loadUsers();
        let index = this.usersArray.findIndex((x) => x.id == item.id);
        if (index != -1) this.usersArray.splice(index, 1);
      }
      
    },
    async searchUsers() {
      if(this.user!=''){
        this.usersArray = []
      const data = {
        method: "system.users.lookup",
        string: this.user,
      };
      const serverResponse = await this.funcion(data);

      if (serverResponse.status == "error") {
        this.errorMessage = serverResponse.message;
      } else {
         serverResponse.forEach(element => {
          let index = this.usersSelected.findIndex((x) => x.user == element.id);
          if(index == -1)this.usersArray.push(element)  
        });
      }
      }
      else this.usersArray = []
    },
    clearFields() {
      this.agregar = false;
      this.type = "";
      this.user = "";
      this.usersArray=[];
    },

  },
};
</script>