<template>
  <div id="layout">
    <NavBar></NavBar>
    <RouterView></RouterView>
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
#layout {

}
</style>
