<template>
  <v-dialog style="min-height: 800px" v-model="mostrar" color="#19A08D" persistent >
    <v-card>
      <v-toolbar dark color="#19A08D">
        <v-toolbar-title style="text-align: center;" dark>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
         <v-btn text small @click="$emit('cancelar')"> 
          <v-icon>mdi-close</v-icon>
          close
        </v-btn>
      </v-toolbar>

      <!-- <v-container> -->
       <!-- <v-row align="center" justify="center">
      <v-card-title>The System Usability Scale Standart Version</v-card-title>
       </v-row> -->
      <v-container>
       <v-row align="center" justify="center">
       <v-card min-width="800px">
        <v-data-table
          dense
          disable-sort
          :headers="headers"
          hide-default-footer
          :items="data"
          :items-per-page="-1"
          item-key="id"
          group-by="dimension"
        >
          <template v-slot:[`group.header`]="{items, isOpen, toggle}">
            <th colspan="2">
              <v-icon @click="toggle">{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
              {{ items[0].dimension }}
            </th>
          </template>
          <template v-slot:item="{ item }">
            <tr style="height: 60px !important">
              <td><strong>{{ item.quest }}</strong></td>
              <td style="text-align: center;">
                  <v-row align="center" justify="center">
                      <v-btn-toggle v-model="item.op" color="#19A08D" >
                        <v-btn :disabled="soloLectura">Anger</v-btn>
                        <v-btn :disabled="soloLectura">Frustration</v-btn>
                        <v-btn :disabled="soloLectura">Indifference</v-btn>
                        <v-btn :disabled="soloLectura">Joy</v-btn>
                        <v-btn :disabled="soloLectura">Happiness</v-btn>
                     
                      </v-btn-toggle>
                    </v-row>
                </td>
            </tr>
          </template>
        </v-data-table>
    <!-- ------------ -->
        <!-- <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
        :items-per-page="-1"
      >
         <template v-slot:body="{ items }">
            <tbody>
                <tr style="height: 60px" v-for="(item, index) in items" :key="`item-${index}`">
                  <td class="text-center" style="border-bottom: 0px;border-right: 1px solid rgb(235, 235, 235)"
                      v-if="((index) % 2 == 0)">
                      <span>{{ item.dimension }}</span>
                  </td>
                  <td v-else class="text-center" style="border-right: 1px solid rgb(235, 235, 235)" >
                  </td>
                <td>
                    {{ item.quest }}
                </td>
                <td style="text-align: center;">
                  <v-row align="center" justify="center">
                      <v-btn-toggle v-model="item.op" color="#19A08D" >
                        <v-btn :disabled="soloLectura">Anger</v-btn>
                        <v-btn :disabled="soloLectura">Frustration</v-btn>
                        <v-btn :disabled="soloLectura">Indifference</v-btn>
                        <v-btn :disabled="soloLectura">Joy</v-btn>
                        <v-btn :disabled="soloLectura">Happiness</v-btn>
                     
                      </v-btn-toggle>
                    </v-row>
                </td>
                </tr>
            </tbody>
        </template>
        </v-data-table> -->
       </v-card>
       </v-row>
        <!-- </v-container> -->
      </v-container>

    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "quest",
  props: ["mostrar", "soloLectura", "test"],

  data() {
    return {
      loading: false,
      title: "Quest",
      // menu2:false,
   
      headers: [
        { text: "Dimension", value: "dimension", align: "center", sortable:false },
        { text: "Question", value: "quest", align: "center",sortable:false },
        { text: "Option", align: "center", sortable:false },
      ],
      data: [
        {
          dimension: "Learning capacity. It is the “capacity of the product that allows the user to learn its application.”",
          quest: "What emotion does the ease of learning to use a web system generate in you?",
          op: undefined,
        },
        {
          dimension: "Learning capacity. It is the “capacity of the product that allows the user to learn its application.”",
          quest: "What emotion emerges in you when you use the web system again",
          op: undefined,
        },
         {
          dimension: "Capacity to be used. It is the “capacity of the product that allows the user to operate and control it with ease.”",
          quest: "What emotion does using the Web system generate in you?",
          op: undefined,
        },
   
        {
          dimension: "Capacity to be used. It is the “capacity of the product that allows the user to operate and control it with ease.”",
          quest: "What emotion does it make you to easily perform a task in the web system?",
          op: undefined,
        },
        {  
          dimension: "User error protection. It is the “ability of the system to protect users from making mistakes.”",
          quest: "What emotion emerges in you when the web system shows an error?",
          op: undefined,
        },
        {
          dimension: "User error protection. It is the “ability of the system to protect users from making mistakes.”",
          quest: "What emotion does the text in the error messages displayed by the web system generate in you?",
          op: undefined,
        },
        {
          dimension: "User interface aesthetics. It is the “ability of the user interface to please and satisfy the interaction with the user.”",
          quest: "What emotion emerges in you when using the different components such as buttons, links, forms, among others, of the web system?",
          op: undefined,
        },
        {
          dimension: "User interface aesthetics. It is the “ability of the user interface to please and satisfy the interaction with the user.”",
          quest: "What emotion does the distribution of different components such as buttons, links, forms, among others, of the web system generate in you?",
          op: undefined,
        },
        {
          dimension: "Accessibility. It is the “capacity of the product that allows it to be used by users with certain characteristics and disabilities.”",
          quest: "What emotion emerges in you, when using assistive technologies such as screen readers in the web system?",
          op: undefined,
        },
        {
          dimension: "Accessibility. It is the “capacity of the product that allows it to be used by users with certain characteristics and disabilities.”",
          quest: "What emotion does the readability of the texts, images and components in the web system generate in you?",
          op: undefined,
        },
        {
          dimension: "System adequacy. It is the “capacity of the product that allows the user to understand whether the software is suitable for their needs.”",
          quest: "When using the web system, what emotion emerges in you when you successfully complete a task?",
          op: undefined,
        },
        {
          dimension: "System adequacy. It is the “capacity of the product that allows the user to understand whether the software is suitable for their needs.”",
          quest: "What emotion emerges in you when using the different sections of the web system?",
          op: undefined,
        },
        
      ],
    };
  },
  computed: {},
  created() {
    if(this.test) {
      this.title = this.test.name;
    }
  },
  mounted() {},
  methods: {},
};
</script>
