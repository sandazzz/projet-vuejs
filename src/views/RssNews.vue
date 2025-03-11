<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const articles = ref<{ title: string; link: string; description: string }[]>([]);
const feedTitle = ref("");
const isLoading = ref(true);

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
          item.querySelector("description")?.textContent || "Pas de description",
      }));
    } catch (error) {
      console.error("Erreur de chargement du flux RSS", error);
    } finally {
      isLoading.value = false;
    }
  } else {
    router.push("/");
  }
});
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 px-4 py-6">
    <div class="w-full max-w-3xl bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-200">
      <h1 class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 text-center">
        📰 Articles de {{ feedTitle }}
      </h1>

      <button
        @click="router.push('/')"
        class="w-full md:w-auto bg-gray-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-gray-700 transition focus:ring-2 focus:ring-gray-500 focus:outline-none"
      >
        ⬅️ Retour
      </button>

      <div v-if="isLoading" class="text-gray-500 text-center text-lg mt-6">
        ⏳ Chargement des articles...
      </div>

      <div v-else-if="articles.length === 0" class="text-gray-500 text-center text-lg mt-6">
        📭 Aucun article trouvé.
      </div>

      <ul v-else class="mt-6 space-y-4">
        <li
          v-for="(article, index) in articles"
          :key="index"
          class="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition border border-gray-300"
        >
          <a
            :href="article.link"
            target="_blank"
            class="text-blue-600 hover:text-blue-700 text-lg md:text-xl font-semibold flex items-center gap-2 transition"
          >
            🔗 {{ article.title }}
          </a>
          <p class="text-gray-600 text-sm mt-2 leading-relaxed">
            {{ article.description }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

