<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter, useRoute } from "vue-router";

import { validateEmail } from "@/lib/utils";
import axios from "axios";

export default defineComponent({
  components: {},
  setup(_, context) {
    const auth = useUserStore();
    const router = useRouter();
    const route = useRoute();

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const formIsValid = ref(true);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    async function submitForm() {
      this.formIsValid = true;
      error.value = null;

      if (!validateEmail(this.email) || this.password.length < 6) {
        this.formIsValid = false;
        error.value =
          "Please enter a valid email and password (must be at least 6 characters long).";
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };

      try {
        const createdUser = await auth.signUp(actionPayload);
        if (createdUser && createdUser.isActive) {
          await auth.login(actionPayload);
          const redirectUrl =
            "/" + (route.query.redirect ? route.query.redirect : "tracking");
          router.replace(redirectUrl);
        } else if (
          createdUser &&
          !createdUser.isActive &&
          !createdUser.verifiedEmail
        ) {
          // Go to page that show how to verify email
          router.replace("/home");
        } else {
          router.replace("/login");
        }
      } catch (err) {
        error.value = err.message || "Failed to authenticate, try later.";
      }

      this.isLoading = false;
    }

    const handleError = () => {
      error.value = null;
    };

    return {
      firstName,
      lastName,
      email,
      password,
      formIsValid,
      isLoading,
      error,
      submitForm,
      handleError,
    };
  },
});
</script>
<template>
  <div>
    <default-card>
      <form @submit.prevent="submitForm" class="m-4 p-4">
        <div class="flex flex-row">
          <div class="my-2 mx-0 w-1/2 mr-2">
            <label for="firstName" class="font-bold mb-2 block"
              >First Name</label
            >
            <input
              type="text"
              id="firstName"
              v-model.trim="firstName"
              class="w-full block border border-solid border-gray-300"
            />
          </div>
          <div class="my-2 mx-0 w-1/2 ml-2">
            <label for="lastName" class="font-bold mb-2 block">Last Name</label>
            <input
              type="text"
              id="lastName"
              v-model.trim="lastName"
              class="w-full block border border-solid border-gray-300"
            />
          </div>
        </div>

        <div class="my-2 mx-0">
          <label for="email" class="font-bold mb-2 block">E-Mail</label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            class="w-full block border border-solid border-gray-300"
          />
        </div>
        <div class="my-2 mx-0">
          <label for="password" class="font-bold mb-2 block">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            class="w-full block border border-solid border-gray-300"
          />
        </div>
        <p v-if="isLoading">Authenticating...</p>
        <p v-if="!!error">{{ error }}</p>
        <div class="flex">
          <div class="w-full">
            <default-button> Sign Up </default-button>
          </div>
        </div>
      </form>
    </default-card>
    <div class="max-w-2xl">
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>
