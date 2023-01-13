<template>
  <div>
    <HeaderVue/>
  </div>
</template>


<script>
  import HeaderVue from './components/Header/Header.vue';
  export default{
    name: "App",
    components: {
      HeaderVue
    }
  }
</script>

<style >
  *{
    padding: 0;
    margin: 0;
  }
</style>
