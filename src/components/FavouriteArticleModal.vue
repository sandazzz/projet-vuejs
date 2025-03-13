<script setup lang="ts">
import type { Article } from "../types/article.type";

defineProps<{ article: Article }>();
const emit = defineEmits<{
  (event: "close"): void;
}>();

function close() {
  emit("close");
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">
        {{ article.title }}
      </h2>
      <p class="text-gray-600 mb-4">{{ article.description }}</p>
      <a
        :href="article.link"
        target="_blank"
        class="block text-blue-500 underline mb-4 cursor-pointer"
      >
        Lire l'article complet
      </a>
      <button
        @click="close"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded cursor-pointer"
      >
        Fermer
      </button>
    </div>
  </div>
</template>
