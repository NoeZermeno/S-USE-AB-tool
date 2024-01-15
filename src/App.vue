<template>
  <div><router-view></router-view></div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="postcss" scoped>
/deep/ .container{
    max-width: 100% !important;
  }
</style>