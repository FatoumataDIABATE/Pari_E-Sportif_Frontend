<template>
  <div>
    <!-- Header commun -->
    <header class="backdrop-blur-lg bg-white/10 border-b border-white/10 fixed top-0 left-0 w-full z-50 text-white">
      <nav class="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div class="text-2xl font-bold tracking-wide">
          <RouterLink to="/" class="text-white hover:text-cyan-400 transition">E-SPORT ARENA</RouterLink>
        </div>
        <ul class="hidden md:flex gap-8 text-xl font-medium">
          <li><RouterLink to="/matchs" class="text-white hover:text-cyan-400 transition">Matchs</RouterLink></li>
          <li><RouterLink to="/resultats" class="text-white hover:text-cyan-400 transition">Résultats</RouterLink></li>
          <li><RouterLink to="/gains-pertes" class="text-white hover:text-cyan-400 transition">Gains/Pertes</RouterLink></li>
        </ul>
        <div class="flex gap-2">
          <!-- Si l'utilisateur n'est pas connecté -->
          <template v-if="!isLoggedIn">
            <RouterLink
                to="/inscription"
                class="text-white px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-xl hover:text-cyan-400 transition"
            >
              Inscription
            </RouterLink>
            <RouterLink
                to="/connexion"
                class="text-white px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-xl hover:text-cyan-400 transition"
            >
              Connexion
            </RouterLink>
          </template>

          <!-- Si l'utilisateur est connecté -->
          <template v-else>
            <RouterLink
                to="/profil"
                class="text-white px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-xl hover:text-cyan-400 transition"
            >
              Profil
            </RouterLink>
            <button
                @click="logout"
                class="text-white px-4 py-2 bg-red-500/20 border border-red-400/30 rounded-xl hover:text-red-400 transition"
            >
              Déconnexion
            </button>
          </template>
        </div>
      </nav>
    </header>

    <!-- Contenu dynamique (page actuelle) -->
    <main class="pt-32">
      <router-view />
    </main>

    <!-- Footer commun -->
    <footer class="text-center opacity-60 py-6 text-sm">
      © 2025 E-SPORT ARENA. Tous droits réservés.
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

