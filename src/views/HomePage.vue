<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import type { RssFeed } from "../types/rssfeed.type";
import RssFeedItem from "../components/RssFeedItem.vue";

const rssFeeds = ref<RssFeed[]>([]);
const router = useRouter();

onMounted(() => {
  const storedFeeds = localStorage.getItem("rssFeeds");
  rssFeeds.value = storedFeeds ? JSON.parse(storedFeeds) : [];
});

const deleteFeed = (index: number) => {
  rssFeeds.value.splice(index, 1);
  localStorage.setItem("rssFeeds", JSON.stringify(rssFeeds.value));
};

const modifyFeed = (index: number) => {
  router.push({ path: "/modify", query: { index } });
};
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
    <router-link
      to="/register"
      class="mb-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
    >
      ➕ Enregistrer un flux
    </router-link>

    <div class="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
      <h1 class="text-4xl font-extrabold text-gray-800 mb-6 text-center">
        📰 Liste des Flux RSS
      </h1>

      <div v-if="rssFeeds.length === 0" class="text-gray-500 text-center text-lg">
        📭 Aucun flux RSS enregistré.
      </div>

      <div v-else class="space-y-4">
        <RssFeedItem
          v-for="(feed, index) in rssFeeds"
          :key="index"
          :feed="feed"
          :index="index"
          @delete-feed="deleteFeed(index)"
          @modify-feed="modifyFeed(index)"
        />
      </div>
    </div>
  </div>
</template>
