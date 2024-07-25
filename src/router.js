import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./components/pages/HomePage.vue";
import AboutPage from "./components/pages/AboutPage.vue";
import InvalidPage from "./components/pages/InvalidPage.vue";

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/about', name: 'About', component: AboutPage },
    { path: '/:pathMatch(.*)*', name: 'InvalidPage', component: InvalidPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router