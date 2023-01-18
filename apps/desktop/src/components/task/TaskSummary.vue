<script setup lang="ts">
import { ref } from "vue";
import type { PropType } from "vue";
import { useTaskStore } from "@/stores/task";
import type { TaskFilter } from "@/types";
const s = useTaskStore();
defineProps({
  filter: { type: String as PropType<TaskFilter> },
});
</script>

<template>
  <div
    class="font-light w-full grid text-gray-400 grid-cols-12 content-between"
  >
    <div class="flex flex-row space-x-2 col-span-6 filters justify-center">
      <div
        :class="$props.filter === 'all' ? 'filter-active' : 'filter-inactive'"
        @click="$emit('update:filter', 'all')"
      >
        All
      </div>
      <div
        :class="
          $props.filter === 'incomplete' ? 'filter-active' : 'cursor-pointer'
        "
        @click="$emit('update:filter', 'incomplete')"
      >
        Incomplete
      </div>
      <div
        :class="
          $props.filter === 'completed' ? 'filter-active' : 'filter-inactive'
        "
        @click="$emit('update:filter', 'completed')"
      >
        Completed
      </div>
    </div>
    <div class="flex font-light col-span-3">
      <span v-if="s.incomplete.length !== 0">
        {{ s.incomplete.length }} item{{ s.incomplete.length === 1 ? "" : "s" }}
        left
      </span>
      <span class="italic" v-else> no task items </span>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.filter-active {
  @apply cursor-default font-medium underline;
}

.filter-inactive {
  @apply cursor-pointer font-light;
}
</style>
