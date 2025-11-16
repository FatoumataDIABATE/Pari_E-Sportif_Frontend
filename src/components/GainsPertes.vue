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
    <h1 class="text-4xl font-extrabold mb-8 text-center">Mes Paris</h1>

    <div class="grid md:grid-cols-1 gap-6">
      <!-- Bet Card -->
      <div v-for="b in bets" class="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-6 shadow-lg flex justify-between items-center">
        <div class="flex flex-col gap-2">
          <span class="font-semibold">{{ b.match?.teamA?.name }} VS {{ b.match?.teamB?.name }}</span>
          <span class="text-gray-300 text-sm">Montant parié: {{b.montant}}€</span>
          <span class="text-gray-300 text-sm">Cote: {{b.match.odd_a}} - {{b.match.odd_b}}</span>
          <span v-if="b.etat === 'won'" class="text-green-400 font-semibold">Gains: {{b.montant_final}}€</span>
          <span v-else-if="b.etat === 'lost'" class="text-red-400 font-semibold">Perte: {{b.montant_final}}€</span>
          <span v-else class="text-red-400 font-semibold">Gains/Pertes: En attente fin du match</span>
        </div>
        <div v-if="b.etat === 'won'" class="text-right">
          <span class="text-gray-300 text-sm">Statut: Gagné</span>
        </div>
        <div v-else-if="b.etat === 'lost'" class="text-right">
          <span class="text-gray-300 text-sm">Statut: Perdu</span>
        </div>
        <div v-else class="text-right">
          <span class="text-gray-300 text-sm">Statut: En attente fin du match</span>
        </div>
      </div>


    </div>
  </section>
</template>
