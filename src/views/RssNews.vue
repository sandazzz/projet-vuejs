<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ArticleItem from "../components/ArticleItem.vue";
import ArticleModal from "../components/ArticleModal.vue";
import type { Article } from "../types/article.type";

const route = useRoute();
const router = useRouter();
const articles = ref<Article[]>([]);
const feedTitle = ref("");
const isLoading = ref(true);
const selectedArticle = ref<Article | null>(null);

// Articles favoris
const favoriteArticles = ref<Article[]>([]);

function loadFavorites() {
  const favs = localStorage.getItem("favoriteArticles");
  if (favs) {
    favoriteArticles.value = JSON.parse(favs);
  }
}

function saveFavorites() {
  localStorage.setItem(
    "favoriteArticles",
    JSON.stringify(favoriteArticles.value)
  );
}

const displayLimit = ref("10");

const displayedArticles = computed(() => {
  if (displayLimit.value === "all") {
    return articles.value;
  } else {
    return articles.value.slice(0, parseInt(displayLimit.value));
  }
});

onMounted(async () => {
  loadFavorites();
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

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "text/xml");

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
    } finally {
      isLoading.value = false;
    }
  } else {
    router.push("/");
  }
});

function addFavorite(article: Article) {
  if (!favoriteArticles.value.some((fav) => fav.link === article.link)) {
    favoriteArticles.value.push(article);
    saveFavorites();
    alert("Article ajouté aux favoris !");
  } else {
    alert("Cet article est déjà dans vos favoris.");
  }
}

function showArticle(article: Article) {
  selectedArticle.value = article;
}

function closeArticle() {
  selectedArticle.value = null;
}
</script>

<template>
  <div class="flex flex-col items-center min-h-screen bg-gray-100 px-4 py-6">
    <div
      class="w-full max-w-3xl bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-200"
    >
      <h1
        class="text-2xl md:text-3xl font-extrabold text-gray-800 mb-4 text-center"
      >
        📰 Articles de {{ feedTitle }}
      </h1>

      <!-- Sélecteur de limite d'affichage -->
      <div class="mb-4 text-center">
        <label for="limit" class="mr-2 font-medium">Afficher :</label>
        <select
          id="limit"
          v-model="displayLimit"
          class="border border-gray-300 rounded px-2 py-1"
        >
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="all">Tout</option>
        </select>
      </div>

      <div v-if="isLoading" class="text-gray-500 text-center text-lg mt-6">
        ⏳ Chargement des articles...
      </div>

      <div
        v-else-if="articles.length === 0"
        class="text-gray-500 text-center text-lg mt-6"
      >
        📭 Aucun article trouvé.
      </div>

      <ul v-else class="mt-6 space-y-4">
        <ArticleItem
          v-for="(article, index) in displayedArticles"
          :key="index"
          :article="article"
          @show-article="showArticle"
          @add-favorite="addFavorite"
        />
      </ul>
    </div>
    <ArticleModal
      v-if="selectedArticle"
      :article="selectedArticle"
      @close="closeArticle"
      @addFavorite="addFavorite"
    />
  </div>
</template>
