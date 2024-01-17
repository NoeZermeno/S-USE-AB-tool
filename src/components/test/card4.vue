<template>
  <v-dialog v-model="mostrar" fullscreen color="primary" persistent >
    <v-card>
      <v-toolbar
        dark
        color="primary"
        
      >
        <v-btn icon dark @click="$emit('cancelar')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title style="text-align: center;">four</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container>
       <v-row align="center" justify="center">
      <v-card-title>The System Usability Scale Standart Version</v-card-title>
       </v-row>
       <v-row align="center" justify="center">
       <v-card>
      <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
      >
         <template v-slot:body="{ items }">
            <tbody>
                <tr v-for="(item, index) in items" :key="`item-${index}`">
                <td style="text-align: center; width: 10px">
                    {{item.task}}
                </td>
                <td style=" width:400px">
                    {{ item.list }}
                </td>
                <td >
                   <template>
                    <v-menu
                        ref="menu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="item.time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                        >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            v-model="item.time"
                            label="Select time"
                            readonly
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-time-picker
                        v-if="menu2"
                        v-model="item.time"
                        @click:minute="$refs.menu.save(item.time)"
                        ></v-time-picker>
                    </v-menu>
                   </template>

                </td>
                <td style="text-align: center; width: 10px">
                  <v-checkbox disabled v-model="item.op1"></v-checkbox>
                </td>
                  <td style="text-align: center; width: 10px">
                  <v-checkbox disabled v-model="item.op2"></v-checkbox>
                </td>
                  <td style="text-align: center; width: 10px">
                  <v-checkbox disabled v-model="item.op3"></v-checkbox>
                </td>
                  <td style="text-align: center; width: 10px">
                  <v-checkbox disabled v-model="item.op4"></v-checkbox>
                </td>
                  <td style="text-align: center; width: 10px">
                  <v-checkbox disabled v-model="item.op5"></v-checkbox>
                </td>
                </tr>
            </tbody>
        </template>
        </v-data-table>
       </v-card>
       </v-row>
      </v-container>
       
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "dataView",
  props: ["mostrar"],

  data() {
    return {
      loading: false,
      menu2:false,
      time:null,
      headers: [
        { text: "Task Category", value: "task", sortable:false },
        { text: "Task List", value: "list", align: "center",sortable:false },
        { text: "Time", value: "time", sortable:false },
        { text: "1", value: "op1", sortable:false },
        { text: "2", value: "op2", sortable:false },
        { text: "3", value: "op3", sortable:false },
        { text: "4", value: "op4", sortable:false },
        { text: "5", value: "op5", sortable:false }
       
      ],
      data: [
        {
          task: "Log in to the platform",
          list: "1. Login to Moodle",
          time:null,
          op1: true,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
        },
    //     {
    //       task:"Log in to the platform",
    //       list: "2. Find a course",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {
    //       task:"Log in to the platform",
    //       list: "3. Access into the course",
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {
    //       task:"Technical support access",
    //       list: "4. Find technical support documentation (manual, FAQ)",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {  
    //       task:"Technical support access",
    //       list: "5. Fill the technical support contact form",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {
    //         task:"Technical support access",
    //       list: "6. Switch site language",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {
    //      task:"User account management",
    //       list: "7. Edit your profile",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {
    //       task:"User account management",
    //       list: "8. Upload/Update profile photo",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {
    //       task:"Access to information and resources/content",
    //       list: "9. Read news items in what's new",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {
    //      task:"Access to information and resources/content",
    //       list: "10. Download a file",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {
    //      task:"Access to information and resources/content",
    //       list: "11. Download a file from resource Directory",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //       {
    //       task:"Access to information and resources/content",
    //       list: "12. Track a URL link external to the platform resources/content",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {
    //    task:"Access to information and resources/content",
    //       list: "13. Display an embedded video",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
    //     {
    //      task:"Access to information and resources/content",
    //       list: "14. View a Page resource",
    //       time:null,
    //       op1: false,
    //       op2:false,
    //       op3:false,
    //       op4:false,
    //       op5:false,
    //     },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
