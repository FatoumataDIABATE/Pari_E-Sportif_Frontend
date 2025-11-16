<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const message = ref('');
const errorMessage = ref('');

const token = localStorage.getItem("token")
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null

const props = defineProps<{ id: string }>()

interface Team {
  id: number
  name: string
}

interface Decimal {
  id: number
  label: string
  odds: number
}

const loading = ref(true)
const error = ref<string | null>(null)
const matchs = ref<Match[] | null>(null)

// computed values
/*const scoreTeamA = computed(() => match.value?.score_a ?? 0)
const scoreTeamB = computed(() => match.value?.score_b ?? 0)
const etat  = computed(() => match.value?.etat ?? 0)
const resultat  = computed(() => match.value?.resultat ?? 0)*/

// Déterminer la cote réelle choisie
/*const selectedOdds = computed(() => {
  if (!match.value) return 0

  if (selectedTeam.value === "teamA") return match.value.odd_a?.odds ?? 0
  if (selectedTeam.value === "teamB") return match.value.odd_b?.odds ?? 0
  if (selectedTeam.value === "draw")  return match.value.odd_n?.odds ?? 0

  return 0
})

// Calcul du gain potentiel
const potentialGain = computed(() => {
  if (!betAmount.value || selectedOdds.value === 0) return 0

  return Number((betAmount.value * selectedOdds.value).toFixed(2))
})*/

async function loadMatch() {
  try {
    const res = await fetch(`http://localhost:1337/api/matches?populate=*`)

    const data = await res.json();

    // Mapper mes données
    matchs.value = data.data
        .filter(item => item.etat === 'TERMINE')
        .map(item => ({
        id: item.id,
        title: item.title,
        date: item.date,
        etat: item.etat,
        scoreA: item.score_a,
        scoreB: item.score_b,
        resultat: item.resultat,

        // Récupération correcte du nom des équipes
        teamA: item.teamA?.name,
        teamB: item.teamB?.name,
      }));
    console.log(matchs.value)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadMatch)

</script>


<template>
  <section class="pt-32 px-6 pb-24 max-w-6xl mx-auto">
    <h1 class="text-4xl font-extrabold mb-8 text-center">Résultats des matchs terminés</h1>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      <!-- Result Card -->
      <div v-for="m in matchs" class="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-6 shadow-lg flex flex-col justify-between">
        <div class="flex justify-between font-semibold mb-2">
          <span>{{ m.teamA }}</span>
          <span>VS</span>
          <span>{{ m.teamB}}</span>
        </div>
        <div class="text-gray-300 text-sm mb-4">Date: {{ new Date(m.date).toLocaleString() }}</div>
        <div v-if="m.resultat === 'A'" class="text-green-400 font-semibold text-lg">Gagnant: {{m.teamA}}</div>
        <div v-else-if="m.resultat === 'B'" class="text-green-400 font-semibold text-lg">Gagnant: {{m.teamB}}</div>
        <div v-else-if="m.resultat === 'N'" class="text-yellow-400 font-semibold text-lg">Match Nul</div>
      </div>

    </div>
  </section>
</template>
