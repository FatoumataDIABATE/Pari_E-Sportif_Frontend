<template>
  <div
      class="relative group cursor-pointer p-8 rounded-2xl bg-white/5 backdrop-blur-md
         border border-white/10 shadow-lg hover:shadow-cyan-500/20
         transition-all duration-300 w-full min-h-[240px]"
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
    <div class="relative z-10">

      <!-- Team vs Team -->
      <div class="flex justify-between items-center text-2xl font-bold mb-6 uppercase tracking-wider">
        <span>{{ match.teamA }}</span>
        <span class="vs mx-6">VS</span>
        <span>{{ match.teamB }}</span>
      </div>


      <!-- Info match -->
      <div class="text-sm text-gray-300 flex flex-col gap-2 mb-6">
        <p>📅 {{ new Date(match.date).toLocaleString() }}</p>
        <p>
          🔵 Cote A :
          <span class="text-cyan-300 font-semibold">{{ match.odd_a }}</span>
        </p>
        <p>
          🔴 Cote B :
          <span class="text-pink-300 font-semibold">{{ match.odd_b }}</span>
        </p>
      </div>

      <!-- CTA -->
      <button
          class="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 py-2 rounded-xl
               font-semibold text-white text-center shadow-lg
               transform transition duration-300 hover:scale-105"
      >
        Parier →
      </button>

    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({ match: Object });
</script>

<style scoped>
.vs {
  @apply text-rose-400 font-extrabold text-xl drop-shadow-[0_0_6px_#ff2d75];
}
</style>
