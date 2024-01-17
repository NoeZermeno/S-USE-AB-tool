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
        <v-toolbar-title style="text-align: center;">SUS Questionnaire</v-toolbar-title>
        <v-spacer></v-spacer>
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
                <tr v-for="(item, index) in items" :key="`item-${index}`">
                <td style="text-align: center; width: 10px">
                    {{item.number}}
                </td>
                <td style=" width:400px">
                    {{ item.question }}
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
      headers: [
        { text: "", value: "number", sortable:false },
        { text: "question", value: "question", align: "center",sortable:false },
        { text: "1", value: "op1", sortable:false },
        { text: "2", value: "op2", sortable:false },
        { text: "3", value: "op3", sortable:false },
        { text: "4", value: "op4", sortable:false },
        { text: "5", value: "op5", sortable:false }
       
      ],
      data: [
        {
          number: "1",
          question:"I think that I would like to use this sytem frequently.",
          op1: true,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
        },
        {
           number: "2",
          question:"I found the system unnecessarily complex.",
          op1: false,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
        },
        {
           number: "3",
          question:"I thought the system was easy to use.",
          op1: false,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
        },
        {
           number: "4",
          question:" I think that I would need the support of a technical person to be able to use this system.",
          op1: false,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
        },
        {
          number: "5",
          question:"I found the various functions in this system were well integrated.",
          op1: false,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
        },
        {
          number: "6",
          question:"I thought there was too much inconsistency in this system.",
          op1: false,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
        },
        {
          number: "7",
          question:"I would imagine that most people would learn to use this system very quickly.",
          op1: false,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
        },
        {
          number: "8",
          question:"I found the system very awkward to use.",
          op1: false,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
        },
        {
          number: "9",
          question:"I felt very confident using the system.",
          op1: false,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
        },
        {
          number: "10",
          question:"I needed to learn a lot of things before I could get going with this system.",
          op1: false,
          op2:false,
          op3:false,
          op4:false,
          op5:false,
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
