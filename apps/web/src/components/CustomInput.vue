<script setup lang="ts">
import { useField } from "vee-validate";
import { toRef } from "vue";
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
});

const isTypePassword = props.type === "password" ? true : false;

function isRequired(value) {
  if (value && value.trim()) {
    return true;
  }
  return "This is required";
}
// make sure to convert the name prop to a ref to maintain its reactivity
// this way vee-validate can react to the field name changing
const nameRef = toRef(props, "name");
const { errorMessage, value } = useField(nameRef, isRequired);
</script>

<template>
  <div class="cool">
    <input v-if="isTypePassword" v-model="value" type="password" />
    <input v-else v-model="value" type="text" />
    <span>{{ errorMessage }}</span>
  </div>
</template>
