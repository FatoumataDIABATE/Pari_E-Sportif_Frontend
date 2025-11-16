<template>
  <section class="pt-32 px-6 pb-24 max-w-6xl mx-auto">
    <h1 class="text-4xl font-extrabold mb-8 text-center">Matchs disponibles</h1>

    <h2>Matchs en cours</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Carte de match -->
      <div
          v-for="match in ongoingMatches"
          :key="match.id"
          class="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-6 shadow-lg flex flex-col justify-between"
      >
        <!-- Match Card -->
          <div class="flex justify-between font-semibold mb-2">
            <span>{{ match.teamA }}</span>
            <span>VS</span>
            <span>{{ match.teamB }}</span>
          </div>
          <div class="flex text-gray-300 text-sm mb-4 gap-4">
            <span>scoreA : {{ match.scoreA }}</span>
            <span>{{ new Date(match.date).toLocaleString() }}</span>
            <span>scoreB : {{ match.scoreB }}</span>
            <span></span>
          </div>
          <button
              @click="goToPari(match.id)"
              class="mt-auto w-full bg-cyan-500/80 hover:bg-cyan-400/90 py-2 rounded-lg font-semibold transition"
          >
            Parier
          </button>
        </div>
      </div>

    <h2>Matchs à venir</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Carte de match -->
      <div
          v-for="match in upcomingMatches"
          :key="match.id"
          class="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-6 shadow-lg flex flex-col justify-between"
      >
        <!-- Match Card -->
        <div class="flex justify-between font-semibold mb-2">
          <span>{{ match.teamA }}</span>
          <span>VS</span>
          <span>{{ match.teamB }}</span>
        </div>
        <div class="flex text-gray-300 text-sm mb-4 gap-4">
          <span>scoreA : {{ match.scoreA }}</span>
          <span>{{ new Date(match.date).toLocaleString() }}</span>
          <span>scoreB : {{ match.scoreB }}</span>
          <span></span>
        </div>
        <button
            @click="goToPari(match.id)"
            class="mt-auto w-full bg-cyan-500/80 hover:bg-cyan-400/90 py-2 rounded-lg font-semibold transition"
        >
          Parier
        </button>
      </div>
    </div>

    <!-- Message si aucun match -->
    <p v-if="matches.length === 0" class="text-center text-gray-400 mt-8">
      Aucun match disponible pour le moment.
    </p>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";


const matches = ref([]);

const ongoingMatches = computed(() =>
    matches.value.filter(m => m.etat === "EN_COURS")
);
const upcomingMatches = computed(() =>
    matches.value.filter(m => m.etat === "A_VENIR")
);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:1337/api/matches?populate=*");
    if (!res.ok) throw new Error("Erreur lors de la récupération des matchs");

    const data = await res.json();

    // Mapper mes données
    matches.value = data.data.map(item => ({
      id: item.id,
      title: item.title,
      date: item.date,
      etat: item.etat,
      scoreA: item.score_a,
      scoreB: item.score_b,

      // Récupération correcte du nom des équipes
      teamA: item.teamA?.name,
      teamB: item.teamB?.name,
    }));

  } catch (error) {
    console.error("Erreur fetch matches:", error);
  }
});


const router = useRouter();

function goToPari(matchId) {
  // Redirige vers la page pari avec l'ID du match en paramètre
  router.push({ name: "Pari", params: { id: matchId } });
}
</script>

<style scoped>
/* Tu peux ajouter des styles spécifiques ici si besoin */
</style>
