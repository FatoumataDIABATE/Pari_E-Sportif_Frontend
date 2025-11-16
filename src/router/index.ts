import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../components/Accueil.vue';
import ConsultationMatch from '../components/ConsultationMatch.vue';
import Inscription from "../components/Inscription.vue";
import Connexion from "../components/Connexion.vue";
import Profil from "../components/Profil.vue";
import Pari from "../components/Pari.vue";
import GainsPertes from "../components/GainsPertes.vue";
import Resultats from "../components/Resultats.vue";

const routes = [
    { path: '/', name: 'Accueil', component: Accueil },
    { path: '/matchs', name: 'matchs', component: ConsultationMatch },
    {path: '/inscription', name: 'Inscription', component: Inscription},
    {path: '/connexion', name: 'Connexion', component: Connexion},
    {path: '/profil', name: 'Profil', component: Profil, meta: { requiresAuth: true }},
    {path: '/pari/:id', name: 'Pari', component: Pari, props: true, meta: { requiresAuth: true }},
    {path: '/gains-pertes', name: 'gains-pertes', component: GainsPertes , meta: { requiresAuth: true }},
    {path: '/resultats', name: 'resultats', component: Resultats , meta: { requiresAuth: true }}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 🔥 Garde global pour protéger les pages réservées
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token')

    if (to.meta.requiresAuth && !isLoggedIn) {
        // L'utilisateur n'est pas connecté → redirection vers Connexion
        return next('/connexion')
    }

    next()
})

export default router


