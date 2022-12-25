<script lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter, useRoute } from "vue-router";
import validateEmail from "@/lib/utils";

export default {
  // emits: ["close"],
  setup(_, context) {
    const auth = useUserStore();
    const router = useRouter();
    const route = useRoute();

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
        email: this.email,
        password: this.password,
      };

      try {
        await auth.signUp(context, actionPayload);
        const redirectUrl = "/login";
        router.replace(redirectUrl);
      } catch (err) {
        error.value = err.message || "Failed to authenticate";
      }

      this.isLoading = false;
    }

    const handleError = () => {
      error.value = null;
    };

    return {
      email,
      password,
      formIsValid,
      isLoading,
      error,
      submitForm,
      handleError,
    };
  },
};
</script>
<template>
  <div>
    <default-card>
      <form @submit.prevent="submitForm" class="m-4 p-4">
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
        <p v-if="isLoading">Registering...</p>
        <p v-if="!!error">{{ error }}</p>
        <div class="flex">
          <div class="w-1/2">
            <default-button> Sign up </default-button>
          </div>
          <div class="w-1/2">
            <default-button type="button" mode="flat" :link="true" to="/login"
              >Login</default-button
            >
          </div>
        </div>
      </form>
    </default-card>
  </div>
</template>
