<template>
  <v-dialog v-model="mostrar" color="#19A08D" persistent >

 

       <v-card>
      <v-toolbar dark color="#19A08D">
        <v-toolbar-title style="text-align: center;" dark>SUS Questionnaire</v-toolbar-title>
        <v-spacer></v-spacer>
         <v-btn text small @click="$emit('cancelar')"> 
          <v-icon>mdi-close</v-icon>
          close
        </v-btn>
      </v-toolbar>

      <v-container>
       <v-row align="center" justify="center">
      <v-card-title>The System Usability Scale Standart Version</v-card-title>
       </v-row>
       <v-row align="center" justify="center">
       <v-card width="800px">
      <v-data-table
        :headers="headers"
        :items="data"
        hide-default-footer
      >
         <template v-slot:body="{ items }">
            <tbody>
                <tr v-for="(item, index) in items" :key="`item-${index}`" style="height:100px;">
                <td style="text-align: center; width: 10px; font-size: 18px">
                    {{item.number}}
                </td>
                <td style="width:400px; font-size: 18px">
                    {{ item.question }}
                </td>
                <td style="text-align: center;">
                <v-btn-toggle v-model="item.op" color="#19A08D">
                  <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-1 </v-icon></v-btn>
                  <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-2 </v-icon></v-btn>
                  <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-3 </v-icon></v-btn>
                  <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-4 </v-icon></v-btn>
                  <v-btn :disabled="soloLectura"> <v-icon>mdi-numeric-5 </v-icon></v-btn>
                </v-btn-toggle>
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
  props: ["mostrar", "soloLectura"],

  data() {
    return {
      loading: false,
      headers: [
        { text: "", value: "number", sortable:false },
        { text: "Question", value: "question", align: "center",sortable:false },
        { text: "Responses", align: "center", value: "op", sortable:false },
       
      ],
      data: [
        {
          number: "1",
          question:"I think that I would like to use this sytem frequently.",
          op:undefined,
        },
        {
           number: "2",
          question:"I found the system unnecessarily complex.",
          op:undefined,
        },
        {
           number: "3",
          question:"I thought the system was easy to use.",
          op:undefined,
        },
        {
           number: "4",
          question:" I think that I would need the support of a technical person to be able to use this system.",
          op:undefined,
        },
        {
          number: "5",
          question:"I found the various functions in this system were well integrated.",
          op:undefined,
        },
        {
          number: "6",
          question:"I thought there was too much inconsistency in this system.",
         op:undefined,
        },
        {
          number: "7",
          question:"I would imagine that most people would learn to use this system very quickly.",
          op:undefined,
        },
        {
          number: "8",
          question:"I found the system very awkward to use.",
         op:undefined,
        },
        {
          number: "9",
          question:"I felt very confident using the system.",
         op:undefined,
        },
        {
          number: "10",
          question:"I needed to learn a lot of things before I could get going with this system.",
         op:undefined,
        }
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
