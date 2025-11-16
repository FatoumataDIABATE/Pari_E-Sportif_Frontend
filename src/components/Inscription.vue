<template>
  <!-- SECTION PRINCIPALE DU FORMULAIRE D'INSCRIPTION -->
  <section class="relative pt-32 px-6 pb-24 max-w-lg mx-auto z-10">

    <!-- Fond animé derrière le formulaire -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="w-full h-full
                  bg-[radial-gradient(circle_at_20%_30%,_rgba(0,234,255,0.1),_transparent_50%),
                      radial-gradient(circle_at_80%_70%,_rgba(139,92,246,0.1),_transparent_50%)]
                  animate-pulse-slow rounded-xl"></div>
    </div>

    <h1 class="text-4xl font-extrabold mb-8 text-center drop-shadow-neon">
      Créer un compte
    </h1>

    <form @submit.prevent="registerUser"
          class="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg flex flex-col gap-6">

      <div class="flex flex-col">
        <label class="mb-2 font-semibold text-left">Nom d'utilisateur</label>
        <input v-model="username" type="text" placeholder="Ex: gamer123"
               class="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full transition duration-300 hover:scale-[1.02]"/>
      </div>

      <div class="flex flex-col">
        <label class="mb-2 font-semibold text-left">Email</label>
        <input v-model="email" type="email" placeholder="exemple@mail.com"
               class="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full transition duration-300 hover:scale-[1.02]"/>
      </div>

      <div class="flex flex-col">
        <label class="mb-2 font-semibold text-left">Mot de passe</label>
        <input v-model="password" type="password" placeholder="Mot de passe"
               class="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300 hover:scale-[1.02]"/>
      </div>

      <div class="flex flex-col">
        <label class="mb-2 font-semibold text-left">Confirmer le mot de passe</label>
        <input v-model="confirmPassword" type="password" placeholder="Confirmer le mot de passe"
               class="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300 hover:scale-[1.02]"/>
      </div>

      <button type="submit"
              class="mt-4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition transform">
        S'inscrire
      </button>

      <p v-if="message" class="text-center mt-4 text-cyan-400 font-semibold drop-shadow-neon">
        {{ message }}
      </p>
    </form>
  </section>
</template>

<style scoped>
/* Néon sur titres et messages */
.drop-shadow-neon {
  text-shadow: 0 0 4px #00eaff, 0 0 8px #8b5cf6, 0 0 16px #00eaff;
}

/* Animation fond */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}
</style>


<script setup lang="ts">
import { username, email, password, confirmPassword, message, registerUser } from './Inscription';
</script>


<!--
<script setup>
import { ref } from 'vue'; // Import du système réactif de Vue 3

// Déclaration des variables réactives (liées au formulaire)
const username = ref('');          // Nom d'utilisateur
const email = ref('');             // Adresse e-mail
const password = ref('');          // Mot de passe
const confirmPassword = ref('');   // Confirmation du mot de passe
const message = ref('');           // Message d'information (succès ou erreur)

// Fonction appelée lors de la soumission du formulaire
async function registerUser() {

  // Vérification 1 : les mots de passe doivent être identiques
  if (password.value !== confirmPassword.value) {
    message.value = "❌ Les mots de passe ne correspondent pas.";
    return; // on stoppe la fonction ici
  }

  // Vérification 2 : aucun champ ne doit être vide
  if (!username.value || !email.value || !password.value) {
    message.value = "⚠️ Tous les champs sont obligatoires.";
    return;
  }

  // --- Envoi des données à Strapi via fetch ---
  try {
    // Requête POST vers l’API de Strapi pour enregistrer un nouvel utilisateur
    const res = await fetch('http://localhost:1337/api/auth/local/register', {
      method: 'POST', // méthode HTTP
      headers: {
        'Content-Type': 'application/json', // le corps sera au format JSON
      },
      body: JSON.stringify({ // transformation de nos données en JSON
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });

    // Lecture de la réponse JSON renvoyée par le serveur
    const data = await res.json();

    // Vérifie si la requête a échoué (par exemple, email déjà utilisé)
    if (!res.ok) {
      // Si Strapi retourne une erreur liée à l’email
      if (data.error?.message?.includes("Email")) {
        message.value = "❌ Cet email est déjà utilisé.";
      } else {
        // Autre erreur
        message.value = "⚠️ Erreur : " + (data.error?.message || "Vérifie tes informations");
      }
      return;
    }

    // Si tout s'est bien passé
    console.log("✅ Utilisateur créé :", data);
    message.value = `✅ Inscription réussie ! Bienvenue ${data.user.username}`;

    // Option : redirection après quelques secondes
    // setTimeout(() => router.push('/connexion'), 2000);

  } catch (error) {
    // Si la requête échoue à cause d’un problème réseau ou serveur
    console.error('Erreur réseau :', error);
    message.value = "❌ Erreur de connexion au serveur.";
  }
}
</script>
-->