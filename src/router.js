import { createRouter, createWebHistory } from "vue-router";

const HomePage = () => import('./components/pages/HomePage.vue')
const AboutPage = () => import('./components/pages/AboutPage.vue')
const InvalidPage = () => import('./components/pages/InvalidPage.vue')

const routes = [
    { path: '/Florida-Voter-Turnout-Map/', name: 'Home', component: HomePage },
    { path: '/Florida-Voter-Turnout-Map/about', name: 'About', component: AboutPage },
    { path: '/:pathMatch(.*)*', name: 'InvalidPage', component: InvalidPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router