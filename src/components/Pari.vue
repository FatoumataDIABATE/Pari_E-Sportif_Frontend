<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const strapiEndpoint = import.meta.env.VITE_STRAPI_API_URL;

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
    const res = await fetch(`${strapiEndpoint}/api/matches?populate=*`)
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
    const res = await fetch(strapiEndpoint + "/api/bets", {
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
  <section class="pt-32 px-6 pb-24 max-w-3xl mx-auto">

    <!-- TITRE PRINCIPAL -->
    <h1 class="text-4xl font-extrabold mb-8 text-center drop-shadow-neon">
      Parier sur un match ⚡
    </h1>

    <div v-if="loading" class="text-center text-gray-300">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-400">{{ error }}</div>

    <!-- CARD PRINCIPALE -->
    <div
        v-else
        class="bet-card relative group p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
    >

      <!-- GLOW BACKGROUND -->
      <div
          class="absolute inset-0 rounded-2xl opacity-40 group-hover:opacity-60 transition"
          style="
          background: linear-gradient(135deg, #00eaff, #8b5cf6);
          filter: blur(40px);
        "
      ></div>

      <!-- CONTENU -->
      <div class="relative z-10">

        <!-- TEAMS VS -->
        <div class="text-center text-2xl font-bold mb-6 uppercase tracking-wider">
          <span class="team-name">{{ match!.teamA.name }}</span>
          <span class="vs px-4">VS</span>
          <span class="team-name">{{ match!.teamB.name }}</span>
        </div>

        <!-- COTES -->
        <div class="flex justify-between text-gray-300 mb-6 text-lg">
          <p>🔵 Cote {{ match!.teamA.name }} :
            <span class="text-cyan-300 font-semibold">{{ oddsTeamA }}</span>
          </p>

          <p>🔴 Cote {{ match!.teamB.name }} :
            <span class="text-pink-300 font-semibold">{{ oddsTeamB }}</span>
          </p>
        </div>

        <p class="text-center text-gray-400 mb-6 text-lg">
          ⚪ Match nul :
          <span class="text-purple-300 font-semibold">{{ oddsDraw }}</span>
        </p>

        <!-- FORM -->
        <form class="flex flex-col gap-6">

          <!-- MONTANT -->
          <div>
            <label class="font-semibold text-white">Montant du pari (€)</label>
            <input
                type="number"
                v-model="betAmount"
                placeholder="Ex: 50"
                class="mt-2 w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <!-- OPTIONS DE PARI -->
          <label class="font-semibold text-white">Sélectionner un pronostic</label>
          <div class="grid grid-cols-3 gap-4">

            <label class="bet-option">
              <input type="radio" name="team" value="teamA" v-model="selectedTeam" />
              {{ match!.teamA.name }}
            </label>

            <label class="bet-option">
              <input type="radio" name="team" value="draw" v-model="selectedTeam" />
              Match nul
            </label>

            <label class="bet-option">
              <input type="radio" name="team" value="teamB" v-model="selectedTeam" />
              {{ match!.teamB.name }}
            </label>

          </div>

          <!-- GAIN POTENTIEL -->
          <div class="text-center mt-6 text-cyan-300 font-semibold text-2xl">
            Gain potentiel : {{ potentialGain }} €
          </div>

          <!-- BOUTON -->
          <button
              type="button"
              @click="placeBet"
              class="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2 rounded-xl
               font-semibold text-white text-center shadow-lg
               transform transition duration-300 hover:scale-105">
            Placer le pari
          </button>



          <!-- MESSAGES -->
          <p v-if="message" class="text-center mt-4 text-cyan-400 font-semibold">
            {{ message }}
          </p>
          <p v-if="errorMessage" class="text-center mt-4 text-red-500 font-semibold">
            {{ errorMessage }}
          </p>
        </form>

      </div>
    </div>
  </section>
</template>

<style scoped>
.page-title {
  @apply text-5xl font-extrabold text-center text-white tracking-wide;
  text-shadow: 0 0 10px #00eaff, 0 0 20px #8b5cf6;
}

.vs {
  @apply text-rose-400 font-extrabold text-2xl;
  filter: drop-shadow(0 0 6px #ff2d75);
}

.team-name {
  @apply text-white;
}

/* Style des options de pari */
.bet-option {
  @apply p-4 bg-white/10 border border-white/20 rounded-xl text-center
  cursor-pointer transition hover:bg-cyan-500/20 text-white;
}

.bet-option input {
  @apply mr-2;
}

/* CTA */
.bet-btn {
  @apply w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500
  py-3 rounded-xl font-semibold text-white text-center shadow-xl
  hover:scale-105 transition transform;
}

/* Carte */
.bet-card {
  transition: transform 0.3s;
}

.bet-card:hover {
  transform: translateY(-4px);
}
</style>

