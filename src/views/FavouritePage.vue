<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import ArticleModal from "../components/FavouriteArticleModal.vue";
import type { Article } from "../types/article.type";

const favoriteArticles = ref<Article[]>([]);
const selectedArticle = ref<Article | null>(null);
const searchQuery = ref("");

function loadFavorites() {
  const favs = localStorage.getItem("favoriteArticles");
  if (favs) {
    favoriteArticles.value = JSON.parse(favs);
  }
}

function removeFavorite(article: Article) {
  favoriteArticles.value = favoriteArticles.value.filter(
    (a) => a.link !== article.link
  );
  localStorage.setItem(
    "favoriteArticles",
    JSON.stringify(favoriteArticles.value)
  );
}

function showArticle(article: Article) {
  selectedArticle.value = article;
}

function closeArticle() {
  selectedArticle.value = null;
}

onMounted(() => {
  loadFavorites();
});

const filteredFavorites = computed(() => {
  if (!searchQuery.value) {
    return favoriteArticles.value;
  }
  const query = searchQuery.value.toLowerCase();
  return favoriteArticles.value.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query)
  );
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="mx-auto p-4 max-w-md md:max-w-lg">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">
        ⭐ Mes Favoris
      </h1>
      <!-- Champ de recherche pour filtrer les favoris -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Filtrer par titre ou contenu"
        class="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <div
        v-if="filteredFavorites.length === 0"
        class="text-center text-gray-500"
      >
        Aucun article ne correspond à votre recherche.
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="(article, index) in filteredFavorites"
          :key="index"
          class="flex items-center justify-between bg-white rounded-lg shadow p-4"
        >
          <button
            @click="showArticle(article)"
            class="flex-1 text-left text-base md:text-lg font-medium text-gray-800 truncate cursor-pointer"
            title="Afficher le détail de l'article"
          >
            {{ article.title }}
          </button>
          <button
            @click="removeFavorite(article)"
            class="ml-4 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded cursor-pointer"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
    <ArticleModal
      v-if="selectedArticle"
      :article="selectedArticle"
      @close="closeArticle"
    />
  </div>
</template>
