<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  props: {
    message: String,
  },
  components: {},
  setup(props, context) {
    props.message; // <-- type: string

    const auth = useUserStore();
    const router = useRouter();
    const route = useRoute();

    const email = ref("");
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    async function submitForm() {
      error.value = null;
      if (this.email === "" || !this.email.includes("@")) {
        error.value = "Email is not valid";
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
      };

      try {
        await auth.resetPassword(context, actionPayload);
        const redirectUrl =
          "/" + (route.query.redirect ? route.query.redirect : "");
        router.replace(redirectUrl);
      } catch (err) {
        error.value =
          err.message || "Failed to send the reset password, try later.";
      }

      this.isLoading = false;
    }

    const handleError = () => {
      error.value = null;
    };

    return {
      email,
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
        <div class="my-2 mx-0">
          <label for="email" class="font-bold mb-2 block">E-Mail</label>
          <input
            type="email"
            id="email"
            v-model.trim="email"
            class="w-full block border border-solid border-gray-300"
          />
        </div>
        <p v-if="isLoading">Sending...</p>
        <p v-if="!!error">{{ error }}</p>
        <div class="flex">
          <div class="w-full">
            <default-button> Reset Password </default-button>
          </div>
        </div>
        <div class="flex">
          <div class="w-full">
            <router-link to="/login">Sign In</router-link>
          </div>
        </div>
      </form>
    </default-card>
  </div>
</template>
