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

interface Decimal {
  id: number
  label: string
  odds: number
}

const loading = ref(true)
const error = ref<string | null>(null)
const matchs = ref<Match[] | null>(null)


async function loadMatch() {
  try {
    const res = await fetch(strapiEndpoint + "/api/matches?populate=*")

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
  <section class="pt-32 px-6 pb-24 max-w-7xl mx-auto">
    <h1 class="page-title">Résultats des matchs terminés ⚡</h1>

    <div v-if="loading" class="text-center text-gray-300 mt-12">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-400 mt-12">{{ error }}</div>
    <div v-else>
      <div v-if="!matchs || matchs.length === 0" class="text-center text-gray-400 mt-12">
        Aucun match terminé pour le moment.
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        <!-- Result Card -->
        <div
            v-for="m in matchs"
            :key="m.id"
            class="relative group cursor-pointer p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg
                 hover:shadow-cyan-500/20 transition-all duration-300"
        >
          <!-- Bordure lumineuse animée -->
          <div
              class="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100
                   transition duration-500"
              style="
              background: linear-gradient(135deg, rgba(0,234,255,0.6), rgba(139,92,246,0.6));
              filter: blur(18px);
            "
          ></div>

          <!-- Contenu -->
          <div class="relative z-10 flex flex-col gap-4">
            <!-- Team vs Team -->
            <div class="flex justify-between font-bold text-lg mb-2 uppercase tracking-wider">
              <span class="flex-1 text-left min-w-[100px]">{{ m.teamA }}</span>
              <span class="mx-4 vs">VS</span>
              <span class="flex-1 text-right min-w-[100px]">{{ m.teamB }}</span>
            </div>

            <!-- Date et scores -->
            <div class="text-sm text-gray-300 flex justify-between mb-4">
              <span>📅 {{ new Date(m.date).toLocaleString() }}</span>
              <span>🔹 {{ m.scoreA ?? '-' }} - {{ m.scoreB ?? '-' }} 🔴</span>
            </div>

            <!-- Gagnant ou match nul -->
            <div v-if="m.resultat === 'A'" class="text-green-400 font-semibold text-lg flex items-center gap-2">
              🏆 Gagnant : {{ m.teamA }}
            </div>
            <div v-else-if="m.resultat === 'B'" class="text-green-400 font-semibold text-lg flex items-center gap-2">
              🏆 Gagnant : {{ m.teamB }}
            </div>
            <div v-else-if="m.resultat === 'N'" class="text-yellow-400 font-semibold text-lg flex items-center gap-2">
              🤝 Match Nul
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-title {
  @apply text-5xl font-extrabold text-center text-white tracking-wide mb-12;
  text-shadow: 0 0 8px rgba(0, 234, 255, 0.65),
  0 0 16px rgba(139, 92, 246, 0.5);
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