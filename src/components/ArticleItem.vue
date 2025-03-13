<script setup lang="ts">
import type { Article } from "../types/article.type";

defineProps<{ article: Article }>();
</script>

<template>
  <li
    class="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition border border-gray-300"
  >
    <h2 class="text-lg md:text-xl font-semibold text-gray-800">
      {{ article.title }}
    </h2>
    <p class="text-gray-600 text-sm mt-2 leading-relaxed">
      {{ article.description }}
    </p>
    <div class="mt-4 flex gap-2 flex-wrap">
      <a
        :href="article.link"
        target="_blank"
        class="text-blue-600 hover:text-blue-700 underline"
      >
        🔗 Lire l'article complet
      </a>
      <button
        @click="$emit('show-article', article)"
        class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Afficher l'article
      </button>
      <button
        @click="$emit('add-favorite', article)"
        class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Ajouter aux favoris
      </button>
    </div>
  </li>
</template>
