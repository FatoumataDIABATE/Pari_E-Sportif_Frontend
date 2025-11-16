<template>
  <section class="pt-2 px-6 pb-24 max-w-7xl mx-auto">
    <h1 class="page-title mb-20">Matchs disponibles ⚡</h1>

    <!-- MATCHS EN COURS -->
    <h2 class="section-title text-3xl font-bold text-white tracking-wide uppercase">
      Matchs en cours
    </h2>

    <div v-if="ongoingMatches.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
      <MatchCard
          v-for="match in ongoingMatches"
          :key="match.id"
          :match="match"
          @click="goToPari(match.id)"
      />
    </div>

    <!-- Message si aucun match en cours -->
    <p v-else class="text-gray-400 mt-4">
      Aucun match en cours pour le moment.
    </p>


    <!-- MATCHS À VENIR -->
    <h2 class="section-title text-3xl font-bold text-white tracking-wide uppercase mt-24">
      Matchs à venir
    </h2>

    <div v-if="upcomingMatches.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-6">
      <MatchCard
          v-for="match in upcomingMatches"
          :key="match.id"
          :match="match"
          @click="goToPari(match.id)"
      />
    </div>

    <!-- Message si aucun match à venir -->
    <p v-else class="text-gray-400 mt-4">
      Aucun match à venir.
    </p>

<p v-if="matches.length === 0" class="text-center text-gray-400 mt-8">
      Aucun match disponible pour le moment.
    </p>
  </section>


</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

import MatchCard from "./MatchCard.vue";



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
      odd_a: item.odd_a,
      odd_b: item.odd_b,

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
.section-title {
  position: relative;
  padding-bottom: 10px;
  display: inline-block;
}

/* Soulignement animé */
.section-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 60%;
  background: linear-gradient(90deg, #00eaff, #8b5cf6);
  border-radius: 9999px;
  transition: width 0.4s ease;
  box-shadow: 0 0 6px #00eaff80;
}

.section-title:hover::after {
  width: 100%;
}


</style>

