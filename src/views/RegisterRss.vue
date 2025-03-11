<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { RssFeed } from "../types/rssfeed.type";
import { useRouter } from "vue-router";

const router = useRouter();

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

  console.log(rssFeeds.value);
  router.push("/")
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-100 p-6 flex flex-col justify-center items-center"
  >
    <div class="w-full max-w-lg bg-white p-6 rounded-2xl shadow-lg">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
        Ajouter un Flux RSS
      </h2>

      <form @submit.prevent="addRssFeed" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium mb-2"
            >Titre du flux</label
          >
          <input
            v-model="title"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-2"
            >Lien du flux RSS</label
          >
          <input
            v-model="link"
            type="url"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Ajouter
        </button>
      </form>
    </div>
  </div>
</template>
