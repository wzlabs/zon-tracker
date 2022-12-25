<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter, useRoute } from "vue-router";

const auth = useUserStore();
const router = useRouter();
const route = useRoute();

const error = ref<string | null>(null);

try {
  auth.logout();
  const redirectUrl = "/" + (route.query.redirect ? route.query.redirect : "");
  router.replace(redirectUrl);
} catch (err) {
  error.value = err.message || "Failed to authenticate, try later.";
}
</script>
<template>
  <p v-if="!!error">{{ error }}</p>
</template>
