<script setup lang="ts">
import type { RssFeed } from "../types/rssfeed.type";
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ feed: RssFeed; index: number }>();
const emit = defineEmits<{
  (event: "delete-feed"): void;
  (event: "modify-feed"): void;
}>();
</script>

<template>
  <div
    class="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col justify-between items-start gap-3"
  >
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ props.feed.title }}</h3>
      <a
        :href="props.feed.link"
        target="_blank"
        class="text-blue-500 hover:underline break-words"
      >
        {{ props.feed.link }}
      </a>
    </div>
    <button
      @click="emit('delete-feed')"
      class="text-red-600 hover:text-red-800 transition px-4 py-2 border border-red-600 rounded-md"
    >
      Supprimer
    </button>
    <button
      @click="emit('modify-feed')"
      class="text-gray-300 hover:text-red-800 transition px-4 py-2 border border-red-600 rounded-md"
    >
      Modifier
    </button>
    <router-link
      :to="`/news/${index}`"
      class="text-green-600 hover:text-green-800 transition px-4 py-2 border border-green-600 rounded-md text-center w-full"
    >
      Voir les nouvelles
    </router-link>
  </div>
</template>
