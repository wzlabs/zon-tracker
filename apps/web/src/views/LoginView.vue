<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter, useRoute } from "vue-router";
// import { useField, useForm } from "vee-validate";

import validateEmail from "@/lib/utils";

export default defineComponent({
  components: {},
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
        await auth.login(context, actionPayload);
        const redirectUrl =
          "/" + (route.query.redirect ? route.query.redirect : "");
        router.replace(redirectUrl);
      } catch (err) {
        error.value = err.message || "Failed to authenticate, try later.";
      }

      this.isLoading = false;
    }

    const handleError = () => {
      error.value = null;
    };

    // Define a validation schema
    // const simpleSchema = {
    //   email(value) {
    //     // validate email value and return messages...
    //     console.log("oh yeah.....check email.....", value);
    //   },
    //   password(value) {
    //     // validate password value and return messages...
    //     console.log("oh yeah.....check password.....", value);
    //     return true;
    //   },
    // };
    // // Create a form context with the validation schema
    // useForm({
    //   validationSchema: simpleSchema,
    // });

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
});
</script>
<template>
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
      <p v-if="isLoading">Authenticating...</p>
      <p v-if="!!error">{{ error }}</p>
      <div class="flex">
        <div class="w-1/2">
          <default-button> Login </default-button>
        </div>
        <div class="w-1/2">
          <default-button type="button" mode="flat" :link="true" to="/signup"
            >Sign up</default-button
          >
        </div>
      </div>
      <div class="flex">
        <div class="w-full">
          <router-link to="/forgot-password">Forgot your password?</router-link>
        </div>
      </div>
    </form>
  </default-card>
</template>
