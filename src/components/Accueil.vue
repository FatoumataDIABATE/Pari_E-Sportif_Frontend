<template>
  <div>

    <!-- Hero Section -->
    <section class="pt-32 pb-24 text-center px-6">
      <h1 class="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
        Rejoignez l'arène e-sport
      </h1>
      <p class="text-lg md:text-xl opacity-80 mb-10 max-w-2xl mx-auto">
        Suivez les meilleurs tournois, résultats en direct et performances des équipes du monde entier.
      </p>
      <div class="flex justify-center gap-4">
        <RouterLink
          to="/matchs"
            class="px-6 py-3 bg-cyan-500 text-black text-lg rounded-xl hover:bg-cyan-400 transition font-semibold shadow-lg"
        >
          Explorer les matchs
        </RouterLink>
        <a
            href="#about"
            class="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition"
        >
          En savoir plus
        </a>
      </div>
    </section>

    <!-- Highlight Cards -->
    <section class="max-w-6xl mx-auto px-6 mb-28 grid md:grid-cols-3 gap-8">
      <div class="backdrop-blur-lg bg-white/10 border border-white/10 p-6 rounded-xl shadow-lg">
        <h3 class="font-semibold text-xl mb-2">Matchs en direct</h3>
        <p class="text-gray-300 text-sm">Suivez les performances de vos équipes en temps réel.</p>
      </div>
      <div class="backdrop-blur-lg bg-white/10 border border-white/10 p-6 rounded-xl shadow-lg">
        <h3 class="font-semibold text-xl mb-2">Pariez instantanément</h3>
        <p class="text-gray-300 text-sm">Une interface simple et rapide pour placer vos mises.</p>
      </div>
      <div class="backdrop-blur-lg bg-white/10 border border-white/10 p-6 rounded-xl shadow-lg">
        <h3 class="font-semibold text-xl mb-2">Suivi des gains</h3>
        <p class="text-gray-300 text-sm">Consultez vos gains et pertes directement dans votre tableau de bord.</p>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="text-center pb-24 px-6">
      <h2 class="text-3xl font-bold mb-4">Prêt à entrer dans l'arène ?</h2>
      <p class="opacity-80 mb-8 max-w-xl mx-auto">
        Crée un compte et commence à suivre tes équipes et joueurs favoris.
      </p>
      <a
          href="#register"
          class="px-6 py-3 bg-cyan-500 text-black text-lg rounded-xl hover:bg-cyan-400 transition font-semibold shadow-lg"
      >
        S'inscrire
      </a>
    </section>

  </div>
</template>