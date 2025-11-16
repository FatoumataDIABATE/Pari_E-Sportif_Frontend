<template>
  <section class="pt-32 px-6 pb-24 max-w-3xl mx-auto" v-if="user">
    <h1 class="text-4xl font-extrabold mb-8 text-center">Mon Profil</h1>

    <div class="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-8 shadow-lg flex flex-col md:flex-row gap-8 items-center">

      <!-- Avatar -->
      <div class="flex flex-col items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg"
             class="w-32 h-32 rounded-full border-2 border-cyan-400 bg-white/10 p-4 text-cyan-400"
             fill="currentColor"
             viewBox="0 0 24 24">
          <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
        </svg>

        <!--<button class="px-4 py-2 bg-cyan-500/80 hover:bg-cyan-400/90 rounded-xl font-semibold transition">
          Changer l'avatar
        </button>-->
      </div>


      <!-- Infos utilisateur -->
      <div class="flex-1 flex flex-col gap-4">
        <div class="flex flex-col">
          <label class="mb-2 font-semibold">Nom d'utilisateur</label>
          <input type="text" v-model="user.username" disabled
                 class="p-3 rounded-lg bg-white/10 border border-white/20
                        focus:outline-none focus:ring-2 focus:ring-cyan-400">
        </div>

        <div class="flex flex-col">
          <label class="mb-2 font-semibold">Email</label>
          <input type="email" v-model="user.email" disabled
                 class="p-3 rounded-lg bg-white/10 border border-white/20
                        focus:outline-none focus:ring-2 focus:ring-cyan-400">
        </div>

        <button @click="logout"
                class="mt-4 bg-red-500/80 hover:bg-red-400/90 py-3 rounded-xl font-semibold transition shadow-lg">
          Se déconnecter
        </button>
      </div>
    </div>
  </section>

  <!-- Si pas connecté -->
  <p v-else class="text-center mt-20 text-red-400 text-xl">
    Vous devez être connecté pour voir votre profil.
  </p>
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
