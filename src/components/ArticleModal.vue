<script setup lang="ts">
import type { Article } from "../types/article.type";
const props = defineProps<{ article: Article }>();
const emit = defineEmits<{
  (event: "close"): void;
  (event: "addFavorite", article: Article): void;
}>();

function onClose() {
  emit("close");
}

function onAddFavorite() {
  emit("addFavorite", props.article);
}
</script>

<template>
  <div
    class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 class="text-xl font-bold mb-2">{{ article.title }}</h2>
      <p class="mb-4">{{ article.description }}</p>
      <a
        :href="article.link"
        target="_blank"
        class="text-blue-600 underline mb-4 block"
      >
        Lire l'article complet
      </a>
      <button
        @click="onAddFavorite"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full mb-2"
      >
        Ajouter aux favoris
      </button>
      <button
        @click="onClose"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Fermer
      </button>
    </div>
  </div>
</template>
