<template>
  <div class="bg-gray-900 text-white min-h-screen">

    <!-- Hero Section -->
    <section class="pt-32 pb-24 text-center px-6 relative">
      <h1 class="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-[0_0_20px_cyan] neon-title">
        Rejoignez l'arène e-sport ⚡
      </h1>
      <p class="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto">
        Suivez les meilleurs tournois, résultats en direct et performances des équipes du monde entier.
      </p>
      <div class="flex justify-center gap-6">
        <RouterLink
            to="/matchs"
            class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-lg rounded-xl
                 hover:scale-105 transition transform font-semibold shadow-lg"
        >
          Explorer les matchs
        </RouterLink>
        <a
            href="#about"
            class="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition font-semibold"
        >
          En savoir plus
        </a>
      </div>
    </section>

    <!-- Highlight Cards -->
    <section class="max-w-6xl mx-auto px-6 mb-28 grid md:grid-cols-3 gap-8">
      <div
          class="relative group cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl
               hover:shadow-cyan-500/30 transition-all duration-300"
      >
        <div
            class="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500"
            style="background: linear-gradient(135deg, rgba(0,234,255,0.6), rgba(139,92,246,0.6)); filter: blur(18px);"
        ></div>
        <div class="relative z-10">
          <h3 class="font-semibold text-xl mb-2">Matchs en direct</h3>
          <p class="text-gray-300 text-sm">Suivez les performances de vos équipes en temps réel.</p>
        </div>
      </div>

      <div
          class="relative group cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl
               hover:shadow-cyan-500/30 transition-all duration-300"
      >
        <div
            class="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500"
            style="background: linear-gradient(135deg, rgba(0,234,255,0.6), rgba(139,92,246,0.6)); filter: blur(18px);"
        ></div>
        <div class="relative z-10">
          <h3 class="font-semibold text-xl mb-2">Pariez instantanément</h3>
          <p class="text-gray-300 text-sm">Une interface simple et rapide pour placer vos mises.</p>
        </div>
      </div>

      <div
          class="relative group cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl
               hover:shadow-cyan-500/30 transition-all duration-300"
      >
        <div
            class="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500"
            style="background: linear-gradient(135deg, rgba(0,234,255,0.6), rgba(139,92,246,0.6)); filter: blur(18px);"
        ></div>
        <div class="relative z-10">
          <h3 class="font-semibold text-xl mb-2">Suivi des gains</h3>
          <p class="text-gray-300 text-sm">Consultez vos gains et pertes directement dans votre tableau de bord.</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="text-center pb-24 px-6">
      <h2 class="text-3xl font-bold mb-4 drop-shadow-[0_0_12px_cyan]">Prêt à entrer dans l'arène ?</h2>
      <p class="opacity-80 mb-8 max-w-xl mx-auto">
        Crée un compte et commence à suivre tes équipes et joueurs favoris.
      </p>
      <RouterLink
          to="/inscription"
          class="px-6 py-3 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white text-lg rounded-xl
               hover:scale-105 transition transform font-semibold shadow-lg"
      >
        S'inscrire
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.neon-title {
  text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff, 0 0 32px #8b5cf6;
}
</style>
<script setup lang="ts">
</script>