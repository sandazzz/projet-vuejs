<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

interface Article {
  title: string;
  link: string;
  description: string;
}

const route = useRoute();
const router = useRouter();
const articles = ref<Article[]>([]);
const feedTitle = ref("");
const isLoading = ref(true);
const selectedArticle = ref<Article | null>(null);

// Réactive pour les articles favoris
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
    } finally {
      isLoading.value = false;
    }
  } else {
    router.push("/");
  }
});

function addFavorite(article: Article) {
  // Vérifier si l'article est déjà dans les favoris
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
        <li
          v-for="(article, index) in articles"
          :key="index"
          class="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition border border-gray-300"
        >
          <h2 class="text-lg md:text-xl font-semibold text-gray-800">
            {{ article.title }}
          </h2>
          <p class="text-gray-600 text-sm mt-2 leading-relaxed">
            {{ article.description }}
          </p>
          <div class="mt-4 flex gap-2 flex-wrap">
            <a
              :href="article.link"
              target="_blank"
              class="text-blue-600 hover:text-blue-700 underline"
            >
              🔗 Lire l'article complet
            </a>
            <!-- Bouton pour afficher les détails dans une modal -->
            <button
              @click="showArticle(article)"
              class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Afficher l'article
            </button>
            <!-- Bouton pour ajouter aux favoris -->
            <button
              @click="addFavorite(article)"
              class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              Ajouter aux favoris
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal d'affichage de l'article sélectionné -->
    <div
      v-if="selectedArticle"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-2">
          {{ selectedArticle.title }}
        </h2>
        <p class="mb-4">
          {{ selectedArticle.description }}
        </p>
        <a
          :href="selectedArticle.link"
          target="_blank"
          class="text-blue-600 underline mb-4 block"
        >
          Lire l'article complet
        </a>
        <!-- Bouton dans la modal pour ajouter aux favoris -->
        <button
          @click="addFavorite(selectedArticle)"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full mb-2"
        >
          Ajouter aux favoris
        </button>
        <button
          @click="closeArticle"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>
