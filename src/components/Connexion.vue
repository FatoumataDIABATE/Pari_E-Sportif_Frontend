<template>
  <section class="pt-32 px-6 pb-24 max-w-md mx-auto">
    <h1 class="text-4xl font-extrabold mb-8 text-center">Connexion</h1>

    <form @submit.prevent="loginUser"
          class="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-8 shadow-lg flex flex-col gap-6">

      <!-- Email -->
      <div class="flex flex-col">
        <label class="mb-2 font-semibold text-left">Email</label>
        <input v-model="email" type="email" placeholder="exemple@mail.com"
               class="p-3 rounded-lg bg-white/10 border border-white/20
                 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full">
      </div>

      <!-- Password -->
      <div class="flex flex-col">
        <label class="mb-2 font-semibold text-left">Mot de passe</label>
        <input v-model="password" type="password" placeholder="Mot de passe"
               class="p-3 rounded-lg bg-white/10 border border-white/20
                 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full">
      </div>

      <button type="submit"
              class="mt-4 bg-cyan-500/80 hover:bg-cyan-400/90 py-3 rounded-xl font-semibold transition shadow-lg">
        Se connecter
      </button>

      <p v-if="message" class="text-center mt-4 text-cyan-400 font-semibold">{{ message }}</p>
      <p v-if="errorMessage" class="text-center mt-4 text-red-500 font-semibold">{{ errorMessage }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const message = ref('');
const errorMessage = ref('');

// Fonction de connexion
async function loginUser() {
  if (!email.value || !password.value) {
    errorMessage.value = "⚠️ Tous les champs sont obligatoires.";
    return;
  }

  try {
    const res = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        identifier: email.value,
        password: password.value
      })
    });

    const data = await res.json();

    if (!res.ok) {
      errorMessage.value = "❌ " + (data.error?.message || "Identifiants incorrects");
      return;
    }

    // Stockage dans localStorage
    localStorage.setItem("token", data.jwt);
    localStorage.setItem("user", JSON.stringify(data.user));

    message.value = `Bienvenue ${data.user.username} 🎉`;

    // Redirection
    setTimeout(() => {
      router.push("/Profil");
    }, 1000);

  } catch (err) {
    console.error(err);
    errorMessage.value = "❌ Impossible d'accéder au serveur.";
  }
}
</script>
