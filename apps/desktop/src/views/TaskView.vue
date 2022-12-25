<script setup lang="ts">
import AddTask from "@/components/task/AddTask.vue";
import TaskList from "@/components/task/TaskList.vue";
</script>

<template>
  <div class="h-full w-full page absolute dark:bg-gray-900 dark:text-gray-400">
    <div class="flex text-center w-full todo-app place-content-center">
      <div
        class="flex flex-col space-y-8 mt-12 w-full px-2 items-center sm:w-xl md:px-4 md:w-3xl"
      >
        <default-card>
          <h1 class="font-medium text-5xl text-blue-500">Task</h1>
          <div class="flex flex-col space-x-4 ml-8">
            <AddTask />
          </div>
        </default-card>
        <TaskList />
      </div>
    </div>
  </div>
</template>
