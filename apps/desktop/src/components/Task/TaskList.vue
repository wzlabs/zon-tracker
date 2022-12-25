<script setup lang="ts">
import type { Task } from "@/models/Task";
import { computed, ref, onMounted } from "vue";
import type { PropType } from "vue";
import { useTaskStore } from "@/stores/task";
import { useUserStore } from "@/stores/user";
import TaskSummary from "./TaskSummary.vue";
import TaskItem from "./TaskItem.vue";
import type { TaskFilter } from "@/types";

const auth = useUserStore();
const taskStore = useTaskStore();

const filter = ref<TaskFilter>("all");

const items = computed(() => {
  return taskStore[filter.value];
});

onMounted(() => {
  taskStore.filterTasks({ assigneeId: auth.$state.user.userId });
});
</script>

<template>
  <div
    class="rounded flex flex-col border-1 border-gray-400 min-h-90 w-full p-4 todos"
  >
    <TaskSummary v-model:filter="filter" />

    <ul class="flex flex-col flex-grow w-full py-4">
      <TaskItem v-for="task in items" :key="task._id" :task="task"> </TaskItem>
    </ul>
  </div>
</template>
