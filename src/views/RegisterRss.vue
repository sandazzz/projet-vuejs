<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { RssFeed } from "../types/rssfeed.type";

const title = ref<string>("");
const link = ref<string>("");
const rssFeeds = ref<RssFeed[]>([]);

onMounted(() => {
  const storedFeeds = localStorage.getItem("rssFeeds");
  rssFeeds.value = storedFeeds ? JSON.parse(storedFeeds) : [];
});

const addRssFeed = () => {
  if (!title.value || !link.value) return;

  const newFeed: RssFeed = { title: title.value, link: link.value };
  rssFeeds.value.push(newFeed);
  localStorage.setItem("rssFeeds", JSON.stringify(rssFeeds.value));

  title.value = "";
  link.value = "";
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-10"
  >
    <div
      class="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl border border-gray-200"
    >
      <h2 class="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        ➕ Ajouter un Flux RSS
      </h2>
      <form @submit.prevent="addRssFeed" class="space-y-6">
        <div>
          <label for="title" class="block text-gray-700 font-medium mb-2">
            📌 Titre du flux
          </label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="Ex: Actualités Tech"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        <div>
          <label for="link" class="block text-gray-700 font-medium mb-2">
            🔗 Lien du flux RSS
          </label>
          <input
            id="link"
            v-model="link"
            type="url"
            placeholder="https://exemple.com/rss"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          📥 Ajouter
        </button>
      </form>
    </div>
  </div>
</template>
