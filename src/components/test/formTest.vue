<template>
    <v-dialog v-model="mostrar" scrollable max-width="800" color="#19A08D" persistent>
        <v-card class="overflow-y-auto">
            <v-toolbar dark color="#19A08D" style="display: flex;justify-content: center;">
                <v-toolbar-title>add test</v-toolbar-title>
            </v-toolbar>
            <v-container>
                <p style="font-size: 10px">Test/Add Test</p>
                <v-form v-model="valid" ref="form">
                <v-container>
                    <v-row no-gutters v-for="(n,index) in preguntas" :key="index">
                        <v-col cols="12">
                            <v-text-field 
                             v-model="n.pregunta" 
                             label="Question" 
                             required 
                             outlined 
                             :append-outer-icon="'mdi-close'"
                             @click:append-outer="eliminarPregunta"
                             :rules="preguntasRules"
                          ></v-text-field>
                        </v-col>
                    </v-row> 
                    <!-- <v-row v-if="errorMessage">
                        <p class="errorMessage">{{ errorMessage }}</p>
                    </v-row> -->
                    <v-row  justify="end">
                        <v-tooltip top>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="agregarPregunta()"><v-icon>mdi-plus</v-icon></v-btn>
                            </template>
                            <span>add question</span>
                        </v-tooltip>
                    </v-row>
                    <v-row justify="end">
                        <v-card-actions>
                            <v-btn small dark outlined color="#19A08D" class="ml-1" @click="cancelar()">Cancel
                            </v-btn>
                            <v-btn @click="guardar()" small color="#19A08D" :disabled="!valid" :loading="loading"> save </v-btn>
                        </v-card-actions>
                    </v-row>
                </v-container>
                </v-form>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
import {  serviceToken } from "../../helpers/service.service"
export default {
    name:"form-test",
    props: ["mostrar", "editarProject"],
    
    data() {
        return {
            loading: false,
            valid: false,
            preguntasRules: [
                v => !!v || 'Required',
            ],
            title: "",
            errorMessage: "",
            preguntas:[{pregunta:''}],
            show: false,
        }
    },
    computed:{
    

    },
    created() {
       
    },
    mounted(){
    },
    methods: {
        agregarPregunta(){
            this.preguntas.push({pregunta:''})
        },
        eliminarPregunta(){
            this.preguntas.pop()
        },
        async guardar() {
            try {
                this.loading=true;
          
                const data = {
                    'method':'project.add',
                   
                }
                const serverResponse = await serviceToken(data);
                this.loading = false;
                // console.log(serverResponse);
                if(serverResponse.status == 'error') alert(`${serverResponse.message}`);
                if(serverResponse.status == 'success') {
                    this.$emit('update')
                    this.$emit('cancelar')
                    }
            
            } catch (error) {
                // console.log(error);
                this.loading = false;
            }
          
        },
        cancelar(){
            this.preguntas=[{pregunta:''}]
            this.$emit('cancelar')
        }

    }
}
</script>
<style>
.errorMessage {
    color: #FF0000
}

.invalid_input {
    border: 1px solid red;
}
</style>