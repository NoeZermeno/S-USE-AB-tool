<template>
    <v-footer app color="grey lighten-1">
        <v-spacer></v-spacer>
        <span class="overline">&copy; {{ new Date().getFullYear() }} </span>
    </v-footer>
</template>

<script>
export default {
   
    data: () => ({
        loading: false,
    })
}
</script>