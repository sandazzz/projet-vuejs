<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { RssFeed } from "../types/rssfeed.type";

const route = useRoute();
const router = useRouter();

const rssFeeds = ref<RssFeed[]>([]);
const feedIndex = ref<number | null>(null);
const feedTitle = ref("");
const feedLink = ref("");

onMounted(() => {
  const storedFeeds = localStorage.getItem("rssFeeds");
  rssFeeds.value = storedFeeds ? JSON.parse(storedFeeds) : [];

  const index = route.query.index
    ? parseInt(route.query.index as string)
    : null;
  if (index !== null && rssFeeds.value[index]) {
    feedIndex.value = index;
    feedTitle.value = rssFeeds.value[index].title;
    feedLink.value = rssFeeds.value[index].link;
  } else {
    router.push("/"); 
  }
});

const updateFeed = () => {
  if (feedIndex.value !== null) {
    rssFeeds.value[feedIndex.value] = {
      title: feedTitle.value,
      link: feedLink.value,
    };
    localStorage.setItem("rssFeeds", JSON.stringify(rssFeeds.value));
    router.push("/"); 
  }
};
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Modifier un Flux RSS
      </h1>

      <div class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium">Titre</label>
          <input
            v-model="feedTitle"
            type="text"
            class="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium">Lien</label>
          <input
            v-model="feedLink"
            type="url"
            class="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <button
          @click="updateFeed"
          class="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </div>
</template>
