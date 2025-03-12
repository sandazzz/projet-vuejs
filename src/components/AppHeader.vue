<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 w-full bg-gray-100 shadow-lg py-2 md:static md:py-4"
  >
    <div class="flex justify-around items-center container mx-auto">
      <router-link
        to="/"
        class="w-1/3 flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition"
      >
        <span class="text-xl">📃</span>
        <span class="text-sm font-medium">Flux</span>
      </router-link>

      <router-link
        to="/register"
        class="w-1/3 flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition"
      >
        <span class="text-xl">➕</span>
        <span class="text-sm font-medium">Enregistrer</span>
      </router-link>

      <router-link
        to="/preference"
        class="w-1/3 flex flex-col items-center gap-1 text-gray-700 hover:text-blue-600 transition"
      >
        <span class="text-xl">⚙️</span>
        <span class="text-sm font-medium">Préférences</span>
      </router-link>
    </div>
  </nav>
</template>
