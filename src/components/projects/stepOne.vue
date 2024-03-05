<template>
  <div>
    <v-container>
      <div style="height: 80% !important">
        <v-card>
          <v-row>
            <v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn style="margin-bottom: 10px" small color="#19A08D" @click="agregar = true" dark>
                  <v-icon dark> mdi-plus </v-icon> add item
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
          <v-data-table dense :headers="headers" :items="data1" item-key="alias" class="elevation-1">
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="`item-${index}`">
                  <td style="width: 50px">
                    <v-simple-checkbox
                      @click="actionStep(index, item.id)"
                      v-model="item.visible"
                    ></v-simple-checkbox>
                  </td>
                  <td style="text-align: center">{{ item.alias }}</td>
                  <td style="text-align: center">{{ item.url }}</td>
                  <td>
                    <div style="padding: 10px; display: flex; justify-content: center;">
                      <v-avatar color="#8AA7FF"></v-avatar>
                    </div>
                  </td>
                  <td>
                    <div style="padding: 10px; display: flex; justify-content: end">
                      <v-btn icon :disabled="loading" @click="editarFuncion(item)">
                        <v-icon small>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon :disabled="loading" @click="eliminar(item)">
                        <v-icon small>mdi-close</v-icon>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-container>
    <v-dialog v-model="agregar" scrollable max-width="800" color="#19A08D" persistent>
      <v-card class="overflow-y-auto">
        <v-toolbar dark color="#19A08D" style="display: flex; justify-content: center">
          <v-toolbar-title> Add alternative </v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-row no-gutters>
                <v-col style="display: flex; justify-content: center" cols="12">
                  <div class="avatar d-flex align-end">
                    <v-avatar color="surface-variant" size="128">
                      <v-icon v-if="!profilePhoto.img" style="font-size: 128px">
                        mdi mdi-account
                      </v-icon>
                      <v-img v-else :src="profilePhoto.img" cover></v-img>
                    </v-avatar>
                    <v-file-input
                      style="display: none"
                      id="file-picker"
                      type="file"
                      accept="image/png, image/jpeg, image/bmp"
                      hidden
                      @change="filePicked"
                    ></v-file-input>
                    <v-btn
                      style="margin-left: -40px"
                      outlined
                      color="#19A08D"
                      :loading="loading"
                      @click="pickFile"
                    >
                      <v-icon>mdi-camera</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col style="margin-right: 50px" cols="9">
                  <v-text-field
                    v-model="alias"
                    label="Alias"
                    required
                    :rules="rules"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-checkbox
                    v-model="visible"
                    color="success"
                    label="Visible"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="url"
                    label="URL (must start with http:// or https://)"
                    required
                    :rules="rules"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <p class="errorMessage">{{ errorMessage }}</p>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  small
                  dark
                  outlined
                  color="#19A08D"
                  class="ml-1"
                  @click="agregar = false, clearFields()"
                  >Cancel
                </v-btn>
                <v-btn
                  @click="guardar()"
                  small
                  color="#19A08D"
                  :disabled="!valid"
                  :loading="loading"
                >
                  save
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editar" scrollable max-width="800" color="#19A08D" persistent>
      <v-card class="overflow-y-auto">
        <v-toolbar dark color="#19A08D" style="display: flex; justify-content: center">
          <v-toolbar-title> Edit alternative </v-toolbar-title>
        </v-toolbar>
        <v-container>
          <v-form v-model="validEdit" ref="form">
            <v-container>
              <v-row no-gutters>
                <v-col style="display: flex; justify-content: center" cols="12">
                  <div class="avatar d-flex align-end">
                    <v-avatar color="surface-variant" size="128">
                      <v-icon v-if="!profilePhotoEdit.img" style="font-size: 128px">
                        mdi mdi-account
                      </v-icon>
                      <v-img v-else :src="itemEditar.img" cover></v-img>
                    </v-avatar>
                    <v-file-input
                      style="display: none"
                      id="file-pickerEdit"
                      type="file"
                      accept="image/png, image/jpeg, image/bmp"
                      hidden
                      @change="filePickedEdit"
                    ></v-file-input>
                    <v-btn
                      style="margin-left: -40px"
                      outlined
                      color="#19A08D"
                      :loading="loading"
                      @click="pickFileEdit"
                    >
                      <v-icon>mdi-camera</v-icon>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col style="margin-right: 50px" cols="9">
                  <v-text-field
                    v-model="itemEditar.alias"
                    label="Alias"
                    required
                    :rules="rulesEditar"
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-checkbox
                    v-model="itemEditar.visible"
                    color="success"
                    label="Visible"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="itemEditar.url"
                    label="URL"
                    required
                    :rules="rules"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <p class="errorMessageEditar">{{ errorMessageEditar }}</p>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  small
                  dark
                  outlined
                  color="#19A08D"
                  class="ml-1"
                  @click="editar = false, itemEditar = {}"
                  >Cancel
                </v-btn>
                <v-btn
                  @click="modificar()"
                  small
                  color="#19A08D"
                  :disabled="!validEdit"
                  :loading="loadingEditar"
                >
                  save
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { serviceToken } from "../../helpers/service.service";
export default {
  name: "step1",
  props: {
    selected: { type: Array, required: true },
  },
  data() {
    return {
      loading: false,
      loadingEditar: false,
      agregar: false,
      editar: false,
      valid: false,
      validEdit: false,
      alias: "",
      url: "",
      visible: false,
      itemEditar: {},
      rules: [(v) => !!v || "Title is required"],
      rulesEditar: [(v) => !!v || "Title is required"],
      errorMessage: "",
      errorMessageEditar: "",
      logo: "",
      headers: [
        { text: "", value: "check" },
        { text: "Alias", value: "alias", align: "center" },
        { text: "Url", value: "url", align: "center" },
        { text: "Logo", value: "logo", align: "center" },
        { text: "", value: "", align: "end" },
      ],
      data1: [],
      alternativesSelected: [1, 2],
      selectedData: [],
      profilePhoto: { img: null },
      profilePhotoEdit: { img: null },
    };
  },
  mounted() {
    this.loadAlternatives();
  },
  methods: {
    async funcion(data) {
      try {
        this.loading = true;
        const serverResponse = await serviceToken(data);
        this.loading = false;

        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        else return serverResponse;
      } catch (error) {
        this.loading = false;
        alert("Sorry, failed connection");
      }
    },
    async loadAlternatives() {
      try {
        this.loading = true;
        const data = {
          method: "project.alternatives.get",
          project: this.$route.params.id,
        };
        const serverResponse = await serviceToken(data);
        this.loading = false;
        if (serverResponse.status == "error")
          alert(`${serverResponse.message}`);
        else {
          if (serverResponse.length) {
            this.data1 = serverResponse;
            this.data1 = this.data1.map((c) => {
              let visible = false;
              //si el c tiene la opcion de seleccionada, entonces se pone en el exists true y se agregara a la lista de alternativesSelected
              if (c.visible) {
                let index = this.data1.findIndex((x) => x.id == c.id);
                this.selectedData.push(index);
                visible = true;
                this.alternativesSelected.push(c.id);
              }
              return { ...c, visible };
            });
            this.$emit("alternativesChanged", this.selectedData);
          }
        }
      } catch (error) {
        // console.log(error);
        this.loading = false;
      }
    },
    async actionStep(index, idItem) {
      
      this.itemEditar = this.data1[index];
      this.modificar();

      if (index && idItem && this.selectedData.includes(index)) {
        let i = this.selectedData.findIndex((i) => i == index);
        this.selectedData.splice(i, 1);
      } else if (index && idItem && !this.selectedData.includes(index)) {
        this.selectedData.push(index);
      }
      this.$emit("alternativesChanged", this.selectedData);
    },
    async eliminar(item) {
      var result = confirm(`Are you sure to delete ${item.alias}?`);
      if (result == true) {
        try {
          this.loading = true;
          const data = {
            method: "project.alternatives.delete",
            id: item.id,
          };
          const serverResponse = await serviceToken(data);
          this.loading = false;
          //TODO: al eliminar un item, se debe verificar que si estaba seleccionado, entonces de debe  eliminar de la lista de alternativesSelected
          if (serverResponse.status == "success") {
            let index = this.data1.findIndex((x) => x.id == item.id);
            if (item.visible) {
              if (index >= 0) this.selectedData.splice(index, 1);
            }

            if (index >= 0) this.data1.splice(index, 1);
          }
        } catch (error) {
          this.loading = false;
        }
      } else {
        return false;
      }
    },
    editarFuncion(item) {
      this.editar = true;
      this.itemEditar = item;
    },
    async guardar() {
      this.errorMessage = "";
      if (this.alias && this.url && this.profilePhoto.file &&
        this.visible != null
      ) {
        try {
          this.loading = true;
          const data = {
            method: "project.alternatives.add",
            project: parseInt(this.$route.params.id),
            alias: this.alias,
            url: this.url,
            visible: this.visible,
            logo: this.profilePhoto.file,
          };

          const serverResponse = await this.funcion(data);
          this.loading = false;
          if (serverResponse.status == "error") {
            this.errorMessage = serverResponse.message;
          } else {
            this.agregar = false;
            this.data1.push(data);
            if (this.visible) {
              this.selectedData.push(this.data1.length - 1);
            }
            this.$emit("alternativesChanged", this.selectedData);
            this.clearFields();
          }
        } catch (error) {
          this.agregar = false;
          this.loading = false;
          this.errorMessage = "Sorry, failed connection";
        }
      } else {
        this.errorMessage = "All fields are required";
      }
    },
    async filePicked(target) {
      if (!target) return;
      //  this.loading=true
      const img = await this.getImgData(target);

      this.profilePhoto = { img, file: target };
    },
    getImgData(file) {
      if (!file) return Promise.resolve();

      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        const timer = setTimeout(reject, 5000);
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", function () {
          clearTimeout(timer);
          resolve(this.result);
        });
      });
    },
    pickFile() {
      document.querySelector("#file-picker").click();
    },
    async filePickedEdit(target) {
      if (!target) return;
      //  this.loading=true
      const img = await this.getImgDataEdit(target);

      this.profilePhoto = { img, file: target };
    },
    getImgDataEdit(file) {
      if (!file) return Promise.resolve();

      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        const timer = setTimeout(reject, 5000);
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", function () {
          clearTimeout(timer);
          resolve(this.result);
        });
      });
    },
    pickFileEdit() {
      document.querySelector("#file-picker-edit").click();
    },
    async modificar() {
      this.errorMessage = "";
      if (this.itemEditar.alias && this.itemEditar.url) {
        try {
          this.loadingEditar = true;
          const data = {
            method: "project.alternatives.update",
            ...this.itemEditar,
          };
          const serverResponse = await this.funcion(data);
          this.loadingEditar = false;
          if (serverResponse.status == "error") {
            this.errorMessage = serverResponse.message;
          } else {

            this.editar = false;
            let index = this.data1.findIndex((x) => x.id == this.itemEditar.id);
            this.data1.splice(index, 1, this.itemEditar);

            if (serverResponse.itemModificado.visible) {
              let index2 = this.selectedData.findIndex((x) => x == index);
              if (index2 == -1)
                this.selectedData.push(this.itemEditar);
            }
            this.itemEditar = {};
          }
        } catch (error) {
          this.loading = false;
          this.errorMessage = "Sorry, failed connection";
        }
      } else {
        this.errorMessage = "All fields are required";
      }
    },
    clearFields() {
      this.alias = "";
      this.url = "";
      this.visible = null;
      this.profilePhoto = { img: null };
    },
  },
};
</script>

