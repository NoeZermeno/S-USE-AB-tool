<template>
  <div>
    <v-container fluid>
      <v-card :loading="loading">
        <v-system-bar
          ><v-spacer></v-spacer><b>test</b><v-spacer></v-spacer
        ></v-system-bar>
        <v-row>
          <v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small color="#19A08D" @click="add = true">
                <v-icon dark> mdi-plus </v-icon> add test
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col>
            <v-container>
              <v-row align="center" justify="center">
                <v-col cols="6">
                  <v-card @click="seeSUS = true" outlined>
                    <v-toolbar dense dark color="#19A08D">
                      <v-spacer></v-spacer>
                      <v-toolbar-title class="text-md-center">
                        SUS Questionnaire
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text
                      >The System Usability Scale (SUS) provides a “quick and
                      dirty”, reliable tool for measuring the usability. It
                      consists of a 10 item questionnaire with five response
                      options for respondents; from Strongly agree to Strongly
                      disagree. Originally created by John Brooke in 1986, it
                      allows you to evaluate a wide variety of products and
                      services, including hardware, software, mobile devices,
                      websites and applications.
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card @click="seeNPS = true" outlined>
                    <v-toolbar dense dark color="#19A08D">
                      <v-spacer></v-spacer>
                      <v-toolbar-title class="text-md-center">
                        NPS
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text
                      >The Net Promoter Score or NPS is a tool that helps you measure customer satisfaction with a single question, giving you an indicator of growth for your company or product. The NPS evaluates the degree to which a person recommends a certain company, product or service to friends, family or colleagues. The idea is very simple: if you like using a product or doing business with a particular company, you are willing to share that experience with others.
                    </v-card-text
                    >
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-card @click="seeACC = true">
                    <v-toolbar dense dark color="#19A08D">
                      <v-spacer></v-spacer>
                      <v-toolbar-title class="text-md-center">
                        ACC
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text
                      >"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum."
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card @click="seeFour = true">
                    <v-toolbar dense dark color="#19A08D">
                      <v-spacer></v-spacer>
                      <v-toolbar-title class="text-md-center">
                        Usability test
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text
                      >"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum."
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="6">
                  <v-card @click="seeQuest = true">
                    <v-toolbar dense dark color="#19A08D">
                      <v-spacer></v-spacer>
                      <v-toolbar-title class="text-md-center">
                        Quest
                      </v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text
                      >"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum."
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <sus-component v-if="seeSUS" :mostrar="seeSUS" :soloLectura="true" @cancelar="seeSUS = false" />
    <nps-component v-if="seeNPS" :mostrar="seeNPS" :soloLectura="true" @cancelar="seeNPS = false" />
    <acc-component v-if="seeACC" :mostrar="seeACC" :soloLectura="true" @cancelar="seeACC = false" />
    <seeFourComponent v-if="seeFour" :mostrar="seeFour" :soloLectura="true" @cancelar="seeFour = false"/>
    <questComponent v-if="seeQuest" :mostrar="seeQuest" :soloLectura="true" @cancelar="seeQuest = false"/>
    <add-component :mostrar="add" @cancelar="add = false" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import susComponent from "./susComponent.vue";
import npsComponent from "./npsComponent.vue";
import accComponent from "./accComponent.vue";
import seeFourComponent from "./card4.vue";
import questComponent from "./quest.vue";
import addComponent from "./formTest.vue";
export default {
  name: "roles",
  computed: {
    ...mapGetters(["sessionToken"]),
  },
  components: {
    susComponent,
    npsComponent,
    accComponent,
    seeFourComponent,
    questComponent,
    addComponent,
  },

  data() {
    return {
      loading: false,
      agregar: false,
      seeSUS: false,
      seeNPS: false,
      seeACC: false,
      seeFour: false,
      seeQuest: false,
      add: false,
    };
  },
};
</script>