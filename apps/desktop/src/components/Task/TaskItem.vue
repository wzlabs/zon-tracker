<script setup lang="ts">
import type { PropType } from "vue";
import type { Task } from "@/models/Task";
import { uuid } from "@/types";
import { useTaskStore } from "@/stores/task";

const { markFinished, markIncomplete, removeTask } = useTaskStore();

const props = defineProps({
  task: { type: Object as PropType<Task>, required: true },
  editing: { type: String as PropType<uuid>, required: false },
});
const style = (t: Task) => `${t.completed ? "" : ""} `;
</script>

<template>
  <li
    class="flex flex-row items-center min-w-64 rounded hover:bg-gray-50 dark:hover:bg-gray-800 px-2 -mx-2 cursor-default py-1"
  >
    <div
      class="checkbox flex flex-grow-0 mr-4"
      :class="props.task.completed ? 'completed' : 'incomplete'"
      @click="
        () =>
          props.task.completed
            ? markIncomplete(props.task)
            : markFinished(props.task)
      "
    >
      <input type="checkbox" :checked="props.task.completed" />
    </div>
    <div
      class="task flex flex-grow"
      :class="props.task.completed ? 'completed' : 'incomplete'"
    >
      <slot>
        {{ props.task.title }}
      </slot>
    </div>
    <div class="remove" @click="removeTask(props.task._id)"></div>
  </li>
</template>

<style lang="postcss" scoped>
.completed {
  @apply text-gray-300 dark:text-gray-600;
}
.incomplete {
  @apply text-gray-600 dark:text-gray-300;
}
.remove {
  @apply flex pl-2 pr-0.5 text-gray-300 dark:text-gray-700 hover:text-gray-400 dark:hover:text-gray-400 cursor-pointer rounded;
}
</style>
