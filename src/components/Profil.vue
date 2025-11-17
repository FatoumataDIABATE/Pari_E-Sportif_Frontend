<template>
  <section class="pt-32 px-6 pb-24 max-w-3xl w-1/2 mx-auto">
    <h1 class="text-4xl font-extrabold mb-8 text-center drop-shadow-neon">
      Mon Profil
    </h1>

    <div v-if="user"
         class="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg flex flex-col md:flex-row gap-8 items-center hover:shadow-cyan-500/30 transition-all duration-300">

      <!-- Avatar -->
      <div class="flex flex-col items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="w-32 h-32 rounded-full border-2 border-cyan-400 bg-white/10 p-4 text-cyan-400 shadow-lg"
             fill="currentColor"
             viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>
      </div>

      <!-- Infos utilisateur -->
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="mb-2 font-semibold text-gray-300">Nom d'utilisateur</label>
          <input type="text" v-model="user.username" disabled
                 class="p-3 rounded-lg bg-white/10 border border-white/20
                        focus:outline-none focus:ring-2 focus:ring-cyan-400
                        text-white placeholder-gray-400 transition duration-300 hover:scale-[1.01]"/>
        </div>

        <div class="flex flex-col">
          <label class="mb-2 font-semibold text-gray-300">Email</label>
          <input type="email" v-model="user.email" disabled
                 class="p-3 rounded-lg bg-white/10 border border-white/20
                        focus:outline-none focus:ring-2 focus:ring-cyan-400
                        text-white placeholder-gray-400 transition duration-300 hover:scale-[1.01]"/>
        </div>

        <button @click="logout"
                class="mt-4 bg-red-500/80 hover:bg-red-400/90 py-3 rounded-xl font-semibold shadow-lg
                       transition transform hover:scale-105">
          Se déconnecter
        </button>
      </div>
    </div>

    <!-- Si pas connecté -->
    <p v-else class="text-center mt-20 text-red-400 text-xl drop-shadow-neon">
      Vous devez être connecté pour voir votre profil.
    </p>
  </section>
</template>



<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref<any | null>(null);

onMounted(() => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) {
    router.push("/connexion");
    return;
  }

  user.value = JSON.parse(userData);
});

// Déconnexion
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/connexion");
}
</script>

<style scoped>
.drop-shadow-neon {
  text-shadow: 0 0 6px #00eaff, 0 0 12px #8b5cf6, 0 0 24px #00eaff;
}
</style>
