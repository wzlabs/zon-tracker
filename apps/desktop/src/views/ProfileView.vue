<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { useUserStore } from "@/stores/user";
import type { AxiosInstance } from "axios/index.d";
const auth = useUserStore();

let axios: any = inject("axios");
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex flex-row w-full">
      <div class="w-1/2">First Name</div>
      <div class="w-1/2">{{ auth.currentUser.firstName }}</div>
    </div>
    <div class="flex flex-row w-full">
      <div class="w-1/2">Last Name</div>
      <div class="w-1/2">{{ auth.currentUser.lastName }}</div>
    </div>
  </div>
</template>
