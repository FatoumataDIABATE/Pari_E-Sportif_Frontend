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


interface Match {
  id: number
  teamA: Team
  teamB: Team
  odd_a?: number | null
  odd_b?: number | null
  odd_n?: number | null
}

const loading = ref(true)
const error = ref<string | null>(null)
const match = ref<Match | null>(null)
const betAmount = ref<number | null>(null)
const selectedTeam = ref<string | null>(null)

// computed cotes
const oddsTeamA = computed(() => match.value?.odd_a ?? 0)
const oddsTeamB = computed(() => match.value?.odd_b ?? 0)
const oddsDraw  = computed(() => match.value?.odd_n ?? 0)

// Déterminer la cote réelle choisie
const selectedOdds = computed(() => {
  if (!match.value) return 0

  if (selectedTeam.value === "teamA") return match.value.odd_a ?? 0
  if (selectedTeam.value === "teamB") return match.value.odd_b ?? 0
  if (selectedTeam.value === "draw")  return match.value.odd_n ?? 0

  return 0
})

// Calcul du gain potentiel
const potentialGain = computed(() => {
  if (!betAmount.value || selectedOdds.value === 0) return 0

  return Number((betAmount.value * selectedOdds.value).toFixed(2))
})

async function loadMatch() {
  try {
    const res = await fetch(`http://localhost:1337/api/matches?populate=*`)
    const data = await res.json()

    const found = data.data.find((m: any) => m.id.toString() === props.id)
    if (!found) throw new Error("Match non trouvé")

    match.value = found
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadMatch)

// envoyer le pari au backend
async function placeBet() {
  if (!user || !token) {
    message.value = "Vous devez être connecté pour placer un pari."
    return
  }

  if (!betAmount.value || !selectedTeam.value) {
    errorMessage.value = "Veuillez sélectionner une équipe et un montant."
    return
  }

  // Déterminer la betOption associée
  let pronostic = null
  if (selectedTeam.value === "teamA") pronostic = "A"
  if (selectedTeam.value === "teamB") pronostic = "B"
  if (selectedTeam.value === "draw")  pronostic = "N"

  if (!pronostic) {
    errorMessage.value = "Aucune cote disponible pour cette sélection."
    return
  }

  console.log(match.value!.documentId)

  const payload = {
    data: {
      amount: betAmount.value,
      user: user.id,
      match: match.value!.documentId,
      pronostic: pronostic,
      placed_at: new Date().toISOString(),
    }
  }

  try {
    const res = await fetch("http://localhost:1337/api/bets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    const result = await res.json()

    if (res.ok) {
      message.value = "✅ Pari placé avec succès !"

      // Redirection
      setTimeout(() => {
        router.push("/matchs");
      }, 1000);

    } else {
      console.error(result)
      errorMessage.value = "Erreur : " + result.error?.message
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = "Erreur lors du placement du pari."
  }
}
</script>


<template>
  <section class="pt-32 px-6 pb-24 max-w-2xl mx-auto">
    <h1 class="text-4xl font-extrabold mb-8 text-center">Parier sur un match</h1>

    <div v-if="loading" class="text-center">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-400">{{ error }}</div>

    <div v-else class="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-8 shadow-lg flex flex-col gap-6">
      <div class="text-center font-semibold text-xl mb-4">
        Team {{ match!.teamA.name }} VS Team {{ match!.teamB.name }}
      </div>

      <div class="flex justify-between text-gray-300 mb-4 gap-20">
        <span>Cote Team {{ match!.teamA.name }} :
          {{ oddsTeamA !== '-' ? oddsTeamA : 'pas de cotes' }}
        </span>
        <span>Cote Team {{ match!.teamB.name }} :
          {{ oddsTeamB !== '-' ? oddsTeamB : 'pas de cotes' }}
        </span>
      </div>

      <div class="text-center text-gray-400 mb-4">
        Match nul : {{ oddsDraw !== '-' ? oddsDraw : 'pas de cotes' }}

      </div>

      <form class="flex flex-col gap-4">
        <label for="betAmount" class="font-semibold">Montant du pari (€)</label>
        <input type="number"
               id="betAmount"
               v-model="betAmount"
               placeholder="Ex: 50" class="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400">

        <label class="font-semibold">Choisir l'équipe gagnante</label>
        <div class="flex gap-4">
          <label class="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-cyan-500/30 transition text-center">
            <input type="radio" name="team" value="teamA" v-model="selectedTeam" class="mr-2"> Team {{ match!.teamA.name }}
          </label>
          <label class="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-cyan-500/30 transition text-center">
            <input type="radio" name="team" value="draw" v-model="selectedTeam" class="mr-2">
            Match nul
          </label>
          <label class="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-cyan-500/30 transition text-center">
            <input type="radio" name="team" value="teamB" v-model="selectedTeam" class="mr-2"> Team {{ match!.teamB.name }}
          </label>

        </div>

        <div class="text-center mt-6 text-cyan-300 font-semibold text-xl">
          Gain potentiel : {{ potentialGain }} €
        </div>


        <button
          type="button"
          @click="placeBet"
          class="mt-4 bg-cyan-500/80 hover:bg-cyan-400/90 py-3 rounded-xl font-semibold transition shadow-lg"
        >
          Placer le pari
        </button>
        <p v-if="message" class="text-center mt-4 text-cyan-400 font-semibold">{{ message }}</p>
        <p v-if="errorMessage" class="text-center mt-4 text-red-500 font-semibold">{{ errorMessage }}</p>
      </form>
    </div>
  </section>
</template>
