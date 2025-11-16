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
const bets = ref<Bet[] | null>(null)




async function loadMatch() {
  try {
    const res = await fetch(`http://localhost:1337/api/bets?populate[match][populate][teamA]=true&populate[match][populate][teamB]=true`)
    const data = await res.json()

    // Mapper mes données
    bets.value = data.data.map(item => ({
      id: item.id,
      montant: item.amount,
      montant_final: item.amount_final,
      match: item.match,
      etat: item.etat,
    }));

    console.log("bets values : ", bets)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadMatch)

</script>


<template>
  <section class="pt-32 px-6 pb-24 max-w-4xl mx-auto">
    <h1 class="page-title">Mes Paris ⚡</h1>

    <div v-if="loading" class="text-center text-gray-400">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-400">{{ error }}</div>

    <div class="grid grid-cols-1 gap-6 mt-6">
      <div
          v-for="b in bets"
          :key="b.id"
          class="w-full max-w-3xl mx-auto relative group cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
      >
        <!-- Bordure lumineuse animée -->
        <div
            class="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500"
            style="background: linear-gradient(135deg, rgba(0,234,255,0.6), rgba(139,92,246,0.6)); filter: blur(18px);"
        ></div>

        <!-- Contenu -->
        <div class="relative z-10 flex justify-between items-center">
          <div class="flex flex-col gap-2">
            <span class="font-semibold text-lg">{{ b.match?.teamA?.name }} <span class="text-rose-400 font-extrabold">VS</span> {{ b.match?.teamB?.name }}</span>
            <span class="text-gray-300 text-sm">Montant parié: {{b.montant}}€</span>
            <span class="text-gray-300 text-sm">Cote: {{b.match.odd_a}} - {{b.match.odd_b}}</span>
            <span v-if="b.etat === 'won'" class="text-green-400 font-semibold">Gains: {{b.montant_final}}€</span>
            <span v-else-if="b.etat === 'lost'" class="text-red-400 font-semibold">Perte: {{b.montant_final}}€</span>
            <span v-else class="text-yellow-400 font-semibold">En attente fin du match</span>
          </div>

          <div class="text-right">
            <span v-if="b.etat === 'won'" class="text-gray-300 text-sm">Statut: Gagné</span>
            <span v-else-if="b.etat === 'lost'" class="text-gray-300 text-sm">Statut: Perdu</span>
            <span v-else class="text-gray-300 text-sm">Statut: En attente</span>
          </div>
        </div>
      </div>

    </div>
    <p v-if="!bets || bets.length === 0" class="text-center text-gray-400 mt-8">Vous n'avez placé aucun pari pour le moment.</p>
  </section>
</template>

<style scoped>
.page-title {
  @apply text-5xl font-extrabold text-center text-white tracking-wide mb-12;
  text-shadow: 0 0 8px rgba(0, 234, 255, 0.65),
  0 0 16px rgba(139, 92, 246, 0.5);
  letter-spacing: 2px;
  position: relative;
}
.page-title::after {
  content: "";
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, #00eaff, #8b5cf6);
  display: block;
  margin: 16px auto 0 auto;
  border-radius: 9999px;
  box-shadow: 0 0 10px #00eaff80;
}
.vs {
  @apply text-rose-400 font-extrabold text-xl drop-shadow-[0_0_6px_#ff2d75];
}
</style>