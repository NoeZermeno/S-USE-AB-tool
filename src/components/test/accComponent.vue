<template>
  <v-dialog v-model="mostrar" color="#19A08D" persistent width="600px">
    <v-card>
      <v-toolbar dark color="#19A08D">
        <v-toolbar-title style="text-align: center" dark>ACC</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text small @click="$emit('cancelar')">
          <v-icon>mdi-close</v-icon>
          close
        </v-btn>
      </v-toolbar>
      <v-container>
        <v-row align="center" justify="center">
          <v-card-title>
            What is the accessibility level ( A, AA, AAA ) for {{alternativeName}}
          </v-card-title>
        </v-row>
        <v-row align="center" justify="center">
          <v-card flat width="800px">
            <v-container style="display: flex; justify-content: space-evenly">
              <v-radio-group v-model="value" :disabled="soloLectura">
                <v-radio
                  v-for="(n, index) in array"
                  :key="n"
                  :label="`${array[index]}`"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-container>
          </v-card>
        </v-row>
        <v-row v-if="!soloLectura" justify="end">
          <v-card-actions>
            <v-btn small dark outlined color="#19A08D" class="ml-1" @click="$emit('cancelar')">Cancel
            </v-btn>
            <v-btn @click="saveAnswer()" small color="#19A08D" :disabled="loading" :loading="loading"> save </v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>

import { serviceToken } from "../../helpers/service.service";
export default {
  name: "acc",
  props: ["mostrar", "soloLectura", "alternativeId", "alternativeName"],

  data() {
    return {
      loading: false,
      value: "A",
      array: ["A", "AA", "AAA"],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async saveAnswer() {
      try {
        let answerAcc = 0;
        if(this.value == "AA") answerAcc = 1;
        if(this.value == "AAA") answerAcc = 2;
        const data = {
          method: "evaluations.tests.eval",
          project: this.$route.params.id,
          alternative: this.alternativeId,
          test: 3,
          index: 1,
          value: answerAcc,
        };
        await serviceToken(data);
        this.$emit('cancelar');
      } catch (error) {
        this.loading = false;
        alert("Sorry, failed connection");
      }
    },
  },
};
</script>
