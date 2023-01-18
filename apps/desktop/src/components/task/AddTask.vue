<script setup lang="ts">
import { ref } from "vue";
import type {} from "vue";
import { useUserStore } from "@/stores/user";
import { useTaskStore } from "@/stores/task";
import type { Task, NewTask } from "@/models/Task";

const auth = useUserStore();
const { createTask } = useTaskStore();

// const emit = defineEmits(["add-task"]);

const title = ref("");
const desc = ref("");

const addTask = async (title) => {
  const newTaskItem: NewTask = {
    user_id: auth.$state.user.userId,
    assignee_id: auth.$state.user.userId,
    title: title,
    desc: "",
  };

  console.log("addTask.........", auth.$state.user.userId);
  await createTask(newTaskItem);
  // emit("add-task", task);
  title = "";
};
</script>

<template>
  <form
    class="new-task relative inline-block"
    action="new-task"
    @submit.prevent="addTask(title)"
  >
    <div class="flex w-full">
      <input
        v-model="title"
        class="w-100 p-4 bg-gray-50 dark:text-gray-800 rounded-full"
        type="text"
        name="title"
        autofocus
        autocomplete="off"
        placeholder="What do you need to do?"
      />
    </div>
    <div class="flex w-full">
      <textarea
        v-model="desc"
        class="w-100 p-4 bg-gray-50 dark:text-gray-800 rounded-full"
        type="text"
        name="title"
        autofocus
        autocomplete="off"
        placeholder="Description"
      ></textarea>
    </div>
    <div class="flex w-full">
      <button
        class="btn place-items-center fill-white dark:fill-gray-200 flex"
        type="submit"
        :disabled="title.length < 1"
      >
        Add
      </button>
    </div>
  </form>
</template>
