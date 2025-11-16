<template>
  <div class="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-x-hidden">

    <div class="absolute inset-0 pointer-events-none">
      <div class="w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(0,234,255,0.1),_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(139,92,246,0.1),_transparent_50%)] animate-pulse-slow"></div>
    </div>

    <header class="backdrop-blur-lg bg-white/5 border-b border-white/10 fixed top-0 left-0 w-full z-50">
      <nav class="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div class="text-2xl font-bold tracking-wide">
          <RouterLink to="/" class="text-white hover:text-cyan-400 transition-all duration-300 neon-text">E-SPORT ARENA</RouterLink>
        </div>
        <ul class="hidden md:flex gap-8 text-xl font-medium">
          <li><RouterLink to="/matchs" class="text-white hover:text-cyan-400 transition-all duration-300">Matchs</RouterLink></li>
          <li><RouterLink to="/resultats" class="text-white hover:text-cyan-400 transition-all duration-300">Résultats</RouterLink></li>
          <li><RouterLink to="/gains-pertes" class="text-white hover:text-cyan-400 transition-all duration-300">Gains/Pertes</RouterLink></li>
        </ul>
        <div class="flex gap-2">
          <template v-if="!isLoggedIn">
            <RouterLink
                to="/inscription"
                class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-xl hover:scale-105 transition transform shadow-lg text-sm"
            >Inscription</RouterLink>
            <RouterLink
                to="/connexion"
                class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-xl hover:scale-105 transition transform shadow-lg text-sm"
            >Connexion</RouterLink>
          </template>
          <template v-else>
            <RouterLink
                to="/profil"
                class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white rounded-xl hover:scale-105 transition transform shadow-lg text-sm"
            >Profil</RouterLink>
            <button
                @click="logout"
                class="px-4 py-2 bg-red-500/70 hover:bg-red-400/70 text-white rounded-xl transition transform shadow-lg text-sm"
            >Déconnexion</button>
          </template>
        </div>
      </nav>
    </header>

    <!-- Contenu dynamique -->
    <main class="pt-32 relative z-10">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="backdrop-blur-lg bg-white/5 border-t border-white/10 text-center py-6 text-sm mt-12 z-10 relative">
      <p class="opacity-70">© 2025 E-SPORT ARENA. Tous droits réservés.</p>
    </footer>

  </div>
</template>

<script setup>
import { useRouter, RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';

const router = useRouter();
const isLoggedIn = ref(false);

onMounted(() => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  isLoggedIn.value = !!user && !!token;
});

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  isLoggedIn.value = false;
  router.push("/connexion");
}
</script>

<style scoped>
/* Néon pour le texte */
.neon-text {
  text-shadow: 0 0 4px #00eaff, 0 0 8px #8b5cf6, 0 0 16px #00eaff;
}

/* Animation des particules background */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
</style>

