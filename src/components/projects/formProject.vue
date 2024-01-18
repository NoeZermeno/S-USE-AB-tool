<template>
    <v-dialog v-model="mostrar" scrollable max-width="800" color="primary" persistent>
        <v-card class="overflow-y-auto">
            <v-toolbar dark color="primary" style="display: flex;justify-content: center;">
                <v-toolbar-title>
                    <!-- {{ !convocatoria ? "Añadir " : "Modificar " }} -->
                    project </v-toolbar-title>
            </v-toolbar>
            <v-container>
                <v-form v-model="valid" ref="form">
                <v-container>
                    
                <v-row no-gutters>
                    <v-col cols="12">
                    <div >
                    <v-avatar color="surface-variant" size="128" class="mx-n6">
                        <v-img :src="profilePhoto.img" cover></v-img>
                    </v-avatar>
                    <v-file-input
                        id="file-picker"
                        type="file"
                        accept="image/png, image/jpeg, image/bmp"
                        hidden
                        @change="filePicked"
                    ></v-file-input>
                    </div>
                    </v-col>
                </v-row >
                <v-row no-gutters>
                    <v-col cols="12">
                        <v-text-field v-model="title" label="Title" required :rules="codeAndNameRules"></v-text-field>
                    </v-col>
                </v-row> 
                <v-row no-gutters>
                    <v-menu  ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="fecha"
                        transition="scale-transition"
                        offset-y
                        min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="fecha" label="Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker  no-title
                            scrollable v-model="fecha" ><v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(fecha)"
                            >
                                OK
                            </v-btn></v-date-picker>
                    </v-menu>
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
// import { mapGetters } from "vuex";
// import { DateTime } from "luxon";
export default {
    name:"form-project",
    props: ["mostrar", "editarProject"],
    
    data() {
        return {
            loading: false,
            valid: false,
            hoy: new Date().toISOString().slice(0,10),
            title: '',
            fecha:'',
            codeAndNameRules: [
                v => !!v || 'Required',
            ],
            errores: [],
            errorMessage: "",
            menu: false,
              profilePhoto :{img: null},

        }
    },
    computed:{
       
        // dateRangeText () {
        // return this.fechas.join(' ~ ')
    //   },

    },
    created() {
        if(this.editarProject){
            console.log(this.editarProject);
             this.title = this.editarProject.name;
            var partesFecha = this.editarProject.inicio.split("-");
            this.fecha = partesFecha[2] + "-" + partesFecha[1] + "-" + partesFecha[0];
        }
    },
    mounted(){
    },
    methods: {
        async guardar() {
            try {
                this.loading=true;
                const myDate = new Date();
                const data = {
                    'method':'project.add',
                    'name':this.title,
                    'begin':myDate.toISOString(),
                    'end':myDate.toISOString(),
                    'pic': this.profilePhoto.file
                }
                const serverResponse = await serviceToken(data);
                this.loading = false;
                console.log(serverResponse);
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
        async filePicked(target){
            console.log(target);
        
            if (!target) return;
        //  this.loading=true
            const img = await this.getImgData(target);
        
        this.profilePhoto = {img, file: target};
        console.log(this.profilePhoto);
        },
        getImgData (file) {
            if (!file) return Promise.resolve();

            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                const timer = setTimeout(reject, 5000);
                fileReader.readAsDataURL(file);
                fileReader.addEventListener('load', function () {
                    clearTimeout(timer);
                    resolve(this.result);
                });
            });
        },
//    pickFile() {
//     document.querySelector('#file-picker').click();
// }
    //     asignarfecha(){
    //     this.fecha = this.temp
    //     this.menu=false
    //     }
    
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