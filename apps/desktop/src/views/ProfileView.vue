<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const auth = useUserStore();
async function doLogout() {
  await auth.logout();
  router.replace("/login");
}
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex flex-row w-full">
      <div class="w-1/2">First Name</div>
      <div class="w-1/2">
        {{ auth.currentUser ? auth.currentUser.firstName : "" }}
      </div>
    </div>
    <div class="flex flex-row w-full">
      <div class="w-1/2">Last Name</div>
      <div class="w-1/2">
        {{ auth.currentUser ? auth.currentUser.lastName : "" }}
      </div>
    </div>
    <div class="flex flex-row w-full">
      <default-button @click="doLogout"> Logout </default-button>
    </div>
  </div>
</template>
