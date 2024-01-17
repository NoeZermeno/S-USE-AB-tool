<template>
    <v-dialog v-model="mostrar" scrollable max-width="800" color="primary" persistent>
        <v-card class="overflow-y-auto">
            <v-toolbar dark color="primary" style="display: flex;justify-content: center;">
                <v-toolbar-title>add test</v-toolbar-title>
            </v-toolbar>
            <v-container>
                <v-form v-model="valid" ref="form">
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-text-field v-model="title" label="" required :rules="codeAndNameRules"></v-text-field>
                        </v-col>
                    </v-row> 
                    <v-row no-gutters>
                       
                    </v-row>

                       
                    <v-row>
                        <p class="errorMessage">{{ errorMessage }}</p>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn small dark outlined color="primary" class="ml-1" @click="$emit('cancelar')">Cancel
                        </v-btn>
                        <v-btn @click="guardar()" small color="primary" :disabled="!valid" :loading="loading"> save </v-btn>
                    </v-card-actions>
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
            codeAndNameRules: [
                v => !!v || 'Required',
            ],
            title: "",
            errorMessage: "",
        }
    },
    computed:{
    

    },
    created() {
       
    },
    mounted(){
    },
    methods: {
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
                console.log(error);
                this.loading = false;
            }
          
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