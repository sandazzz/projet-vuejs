import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../views/HomePage.vue";
import RegisterRss from "../views/RegisterRss.vue";
import ModifyRss from "../views/ModifyRss.vue";
import RssNews from "../views/RssNews.vue";
import FavouritePage from "../views/FavouritePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/register", component: RegisterRss },
  { path: "/modify/", component: ModifyRss },
  { path: "/news/:id", component: RssNews },
  { path: "/preference", component: FavouritePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
