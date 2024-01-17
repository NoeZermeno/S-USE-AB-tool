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
      <v-container>
       <v-row align="center" justify="center">
       <v-card max-width="800px">
        <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        :items-per-page="-1"
      >
         <template v-slot:body="{ items }">
            <tbody>
                <tr v-for="(item, index) in items" :key="`item-${index}`">
                <td>
                    {{item.task}}
                </td>
                <td>
                    {{ item.list }}
                </td>
                <td style="width: 200px">
                <v-text-field
                  label="Select time"
                  :model-value="item.time"
                  type="time"
                ></v-text-field>
                  <!-- suffix="___" -->
                </td>
                <td style="text-align: center;">
                  <v-row align="center" justify="center">
                      <v-btn-toggle v-model="item.op" color="primary">
                        <v-btn> <v-icon>mdi-numeric-1-box-outline</v-icon></v-btn>
                        <v-btn> <v-icon>mdi-numeric-2-box-outline</v-icon></v-btn>
                        <v-btn> <v-icon>mdi-numeric-3-box-outline</v-icon></v-btn>
                        <v-btn> <v-icon>mdi-numeric-4-box-outline</v-icon></v-btn>
                        <v-btn> <v-icon>mdi-numeric-5-box-outline</v-icon></v-btn>
                      </v-btn-toggle>
                    </v-row>
                </td>
                </tr>
            </tbody>
        </template>
        </v-data-table>
       </v-card>
       </v-row>
        </v-container>
      </v-container>

    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "card4",
  props: ["mostrar"],

  data() {
    return {
      loading: false,
      // menu2:false,
   
      headers: [
        { text: "Task Category", value: "task", sortable:false },
        { text: "Task List", value: "list", align: "center",sortable:false },
        { text: "Time", value: "time", sortable:false },
        { text: "Option", sortable:false },
        
       
      ],
      data: [
        {
          task: "Log in to the platform",
          list: "1. Login to Moodle",
          time:'00:00:00',
          op: undefined,
        },
        {
          task: "Log in to the platform",
          list: "2. Find a course",
          time:'00:00:00',
          op: undefined,
        },
         {
          task: "Log in to the platform",
          list: "3. Access into the course",
          time:'00:00:00',
          op: undefined,
        },
   
        {
          task:"Technical support access",
          list: "4. Find technical support documentation (manual, FAQ)",
          time:'00:00:00',
          op: undefined,
        },
        {  
          task:"Technical support access",
          list: "5. Fill the technical support contact form",
          time:'00:00:00',
          op: undefined,
        },
        {
            task:"Technical support access",
          list: "6. Switch site language",
         time:'00:00:00',
          op: undefined,
        },
        {
         task:"User account management",
          list: "7. Edit your profile",
          time:'00:00:00',
          op: undefined,
        },
        {
          task:"User account management",
          list: "8. Upload/Update profile photo",
         time:'00:00:00',
          op: undefined,
        },
        {
          task:"Access to information and resources/content",
          list: "9. Read news items in what's new",
          time:'00:00:00',
          op: undefined,
        },
        {
         task:"Access to information and resources/content",
          list: "10. Download a file",
          time:'00:00:00',
          op: undefined,
        },
        {
         task:"Access to information and resources/content",
          list: "11. Download a file from resource Directory",
          time:'00:00:00',
          op: undefined,
        },
          {
          task:"Access to information and resources/content",
          list: "12. Track a URL link external to the platform resources/content",
          time:'00:00:00',
          op: undefined,
        },
        {
       task:"Access to information and resources/content",
          list: "13. Display an embedded video",
         time:'00:00:00',
          op: undefined,
        },
        {
         task:"Access to information and resources/content",
          list: "14. View a Page resource",
          time:'00:00:00',
          op: undefined,
        },
         {  
          task:"Access to information and resources/content",
          list: "15. Fill the technical support contact form",
          time:'00:00:00',
          op: undefined,
        },
        {
            task:"Access to information and resources/content",
          list: "16. Switch site language",
         time:'00:00:00',
          op: undefined,
        },
        {
         task:"Access to information and resources/content",
          list: "17. Edit your profile",
          time:'00:00:00',
          op: undefined,
        },
        {
          task:"Communication",
          list: "18. Upload/Update profile photo",
         time:'00:00:00',
          op: undefined,
        },
        {
          task:"Communication",
          list: "19. Read news items in what's new",
          time:'00:00:00',
          op: undefined,
        },
        {
         task:"Communication",
          list: "20. Download a file",
          time:'00:00:00',
          op: undefined,
        },
        {
         task:"Communication",
          list: "21. Download a file from resource Directory",
          time:'00:00:00',
          op: undefined,
        },
          {
          task:"Communication",
          list: "22. Track a URL link external to the platform resources/content",
          time:'00:00:00',
          op: undefined,
        },
        {
       task:"Communication",
          list: "23. Display an embedded video",
         time:'00:00:00',
          op: undefined,
        },
        {
         task:"Accomplishment of course activities ",
          list: "24. View a Page resource",
          time:'00:00:00',
          op: undefined,
        },
          {
          task:"Accomplishment of course activities",
          list: "25. Track a URL link external to the platform resources/content",
          time:'00:00:00',
          op: undefined,
        },
        {
       task:"Accomplishment of course activities ",
          list: "26. Display an embedded video",
         time:'00:00:00',
          op: undefined,
        },
        {
         task:"Accomplishment of course activities ",
          list: "27. View a Page resource",
          time:'00:00:00',
          op: undefined,
        },
         {
         task:"Accomplishment of course activities ",
          list: "28. View a Page resource",
          time:'00:00:00',
          op: undefined,
        },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
