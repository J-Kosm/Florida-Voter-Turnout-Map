<template>
  <!-- <NavButton :imgSrc="imgUrl" text="Home"></NavButton> -->
  <NavBar></NavBar>
  
  <RouterView></RouterView>
</template>

<script>

// import NavBar from './components/NavBar.vue';
//import NavButton from './components/NavButton.vue';
//import imgUrl from './assets/home.svg';
import NavBar from './components/NavBar.vue';



export default {
  components: {
    /* NavButton */
    NavBar
  },
  data() {
    return {
      /* imgUrl: imgUrl */

    }
  },
  computed: {
    
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>
