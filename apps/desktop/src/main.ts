import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
// import "./registerServiceWorker";
import router from "./router";
import { setBaseUrl, setContentType } from "./axios";
import config from "./config/config";
import { useUserStore } from "@/stores/user";

import "./style.css";

import DefaultButton from "@/ui/DefaultButton.vue";
import DefaultCard from "@/ui/DefaultCard.vue";
import AppIcon from "@/ui/AppIcon.vue";

const app = createApp(App);
app.use(createPinia());
app.use(router);
// app.use(axios, {
//   baseUrl: config.apiUrl,
// });
app.component("default-button", DefaultButton);
app.component("default-card", DefaultCard);
app.component("app-icon", AppIcon);
app.mount("#app");

// console.log(
//   "app.config.globalProperties.axios.....",
//   typeof app.config.globalProperties.$axios,
//   app.config.globalProperties.$axios
// );
// app.provide("axios", app.config.globalProperties.axios); // provide 'axios'
// // app.provide("axios", "cool"); // provide 'axios'

console.log("config.apiUrl.........", config.apiUrl);
// Check before each page load whether the page requires authentication/
// if it does check whether the user is signed into the web app or
// redirect to the sign-in page to enable them to sign-in
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const auth = useUserStore();
  if (requiresAuth && !auth.$state.isLoggedIn) {
    next("/login");
  } else if (requiresAuth && auth.$state.isLoggedIn) {
    next();
  } else {
    next();
  }
});
