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
  <div class="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-4 py-10">
    <div class="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl border border-gray-200">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        ✏️ Modifier un Flux RSS
      </h1>
<button
        @click="router.push('/')"
        class="w-full md:w-auto bg-gray-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-gray-700 transition focus:ring-2 focus:ring-gray-500 focus:outline-none"
      >
        ⬅️ Retour
      </button>
      <div class="space-y-6">
        <div>
          <label class="block text-gray-700 font-medium mb-1">Titre</label>
          <input
            v-model="feedTitle"
            type="text"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1">Lien</label>
          <input
            v-model="feedLink"
            type="url"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <button
          @click="updateFeed"
          class="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          💾 Enregistrer les modifications
        </button>
      </div>
    </div>
  </div>
</template>
