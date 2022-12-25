import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import config from "./config/config";

import "./assets/main.css";

import DefaultButton from "./components/ui/DefaultButton.vue";
import DefaultCard from "./components/ui/DefaultCard.vue";

// Initialize Firebase
const firebaseApp = initializeApp(config.firebase);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("default-button", DefaultButton);
app.component("default-card", DefaultCard);

app.mount("#app");

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

// Check before each page load whether the page requires authentication/
// if it does check whether the user is signed into the web app or
// redirect to the sign-in page to enable them to sign-in
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !user) {
    next("/login");
  } else if (requiresAuth && user) {
    next();
  } else {
    next();
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
    console.log("sign-in uid......", uid, user);
  } else {
    // User is signed out
    // ...
    console.log("User is signed out");
  }
});
