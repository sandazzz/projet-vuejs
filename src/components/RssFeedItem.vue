<script setup lang="ts">
import type { RssFeed } from "../types/rssfeed.type";

const props = defineProps<{ feed: RssFeed; index: number }>();
const emit = defineEmits<{
  (event: "delete-feed"): void;
  (event: "modify-feed"): void;
}>();
</script>

<template>
  <div class="bg-white p-5 rounded-xl shadow-md flex flex-col gap-4 border border-gray-200 hover:shadow-lg transition">
    <div>
      <h3 class="text-xl font-semibold text-gray-800">{{ props.feed.title }}</h3>
      <a
        :href="props.feed.link"
        target="_blank"
        class="text-blue-500 hover:underline break-words"
      >
        🔗 {{ props.feed.link }}
      </a>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        @click="emit('delete-feed')"
        class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
      >
        🗑️ Supprimer
      </button>
      <button
        @click="emit('modify-feed')"
        class="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
      >
        ✏️ Modifier
      </button>
      <router-link
        :to="`/news/${index}`"
        class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md text-center hover:bg-green-700 transition"
      >
        🔍 Voir les nouvelles
      </router-link>
    </div>
  </div>
</template>
