<template>
    <v-dialog v-model="mostrar" scrollable max-width="800" color="#19A08D" persistent>
        <v-card class="overflow-y-auto">
            <v-toolbar dark color="#19A08D" style="display: flex;justify-content: center;">
                <v-toolbar-title>Add test</v-toolbar-title>
            </v-toolbar>
            <v-container>
                <p style="font-size: 10px">Test/Add Test</p>
                <v-form v-model="valid" ref="form">
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    v-model="type"
                                    :items="types"
                                    label="Outlined style"
                                    dense
                                    outlined
                                    :rules="fieldsRules"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field 
                                v-model="alias" 
                                label="Alias" 
                                required 
                                outlined
                                :rules="fieldsRules"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field 
                                v-model="name" 
                                label="Name" 
                                required 
                                outlined
                                :rules="fieldsRules"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field 
                                v-model="instructions" 
                                label="Instructions" 
                                required 
                                outlined 
                                :rules="fieldsRules"
                            ></v-text-field>
                            </v-col>
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
    props: [
        "mostrar",
        "test"
    ],
    data() {
        return {
            loading: false,
            alias: "",
            name: "",
            instructions: "",
            type: "",
            types: ['QUESTIONNAIRE', 'TEST'],
            valid: false,
            fieldsRules: [
                v => !!v || 'Required',
            ],
            errorMessage: "",
            show: false,
        }
    },
    computed:{
    },
    created() {
    },
    mounted(){
        if(this.test) {
            this.alias = this.test.alias;
            this.name = this.test.name;
            this.instructions = this.test.instructions;
        }
    },
    methods: {
        async guardar() {
            try {
                this.loading=true;
          
                const data = {
                    method: 'config.tests.set',
                    alias: this.alias, 
                    name: this.name, 
                    instructions: this.instructions,
                    type: this.type
                }
                if(this.test) {
                    data.method = 'config.tests.update';
                    data.id = this.test.id;
                }
                const serverResponse = await serviceToken(data);
                this.loading = false;
                if(serverResponse.status == 'error') alert(`${serverResponse.message}`);
                if(serverResponse.status == 'success') {
                    this.$emit('testAdded')
                    this.cancelar();
                }
            
            } catch (error) {
                this.loading = false;
            }
          
        },
        cancelar(){
            this.alias = "";
            this.name = "";
            this.instructions = "";
            this.type = "";
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