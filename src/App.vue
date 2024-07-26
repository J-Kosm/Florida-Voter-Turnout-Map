<template>
  <div id="layout">
    <NavBar></NavBar>
    <component :is="currentView"></component>
    <!-- <RouterView></RouterView> -->
  </div>
</template>

<script>

import NavBar from './components/NavBar.vue';

import HomePage from './components/pages/HomePage.vue';
import AboutPage from './components/pages/AboutPage.vue';
import InvalidPage from './components/pages/InvalidPage.vue';

const routes = {
  '/': HomePage,
  '/about': AboutPage,
}

export default {
  components: {
    NavBar
  },
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || InvalidPage
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
		})
  }

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
