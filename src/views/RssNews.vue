<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const articles = ref<{ title: string; link: string; description: string }[]>(
  []
);
const feedTitle = ref("");

onMounted(async () => {
  const storedFeeds = localStorage.getItem("rssFeeds");
  const rssFeeds = storedFeeds ? JSON.parse(storedFeeds) : [];

  const index = route.params.id ? parseInt(route.params.id as string) : null;

  if (index !== null && rssFeeds[index]) {
    const feed = rssFeeds[index];
    feedTitle.value = feed.title;

    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(feed.link)}`
      );
      const data = await response.json();
      const xmlText = data.contents;

      // Convertir XML en DOM
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");

      // Extraire les articles (<item>)
      const items = xmlDoc.querySelectorAll("item");
      articles.value = Array.from(items).map((item) => ({
        title: item.querySelector("title")?.textContent || "Sans titre",
        link: item.querySelector("link")?.textContent || "#",
        description:
          item.querySelector("description")?.textContent ||
          "Pas de description",
      }));
    } catch (error) {
      console.error("Erreur de chargement du flux RSS", error);
    }
  }
});
</script>

<template>
  <div class="flex flex-col items-center min-h-screen">
    <div class="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">
        Articles de {{ feedTitle }}
      </h1>
      <button
        @click="$router.push('/')"
        class="mt-6 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
      >
        Retour
      </button>
      <div v-if="articles.length === 0" class="text-gray-500 text-center">
        Aucun article trouvé.
      </div>

      <ul class="space-y-4">
        <li
          v-for="(article, index) in articles"
          :key="index"
          class="border-b pb-2"
        >
          <a
            :href="article.link"
            target="_blank"
            class="text-blue-600 hover:underline text-lg font-semibold"
          >
            {{ article.title }}
          </a>
          <p class="text-gray-600 text-sm">{{ article.description }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
