<template>
    <v-footer app color="#19A08D">
        <div style="display: flex; justify-content: space-between; width: 100%">
            <div>
            <v-img style="width: 400px; height: 80px;" src="/data/DaSCI_logo_horizontal.png" ></v-img>
            </div>
            <v-spacer></v-spacer>
            <div>
            <v-img style="width: 80px" src="/data/UGR-MARCA-01-color corporativo.png"></v-img>
            </div>
        </div>
        <!-- <span class="overline">&copy; {{ new Date().getFullYear() }} </span> -->

    </v-footer>
</template>

<script>
export default {
   
    data: () => ({
        loading: false,
    })
}
</script>