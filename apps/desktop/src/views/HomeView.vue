<script setup lang="ts">
import { ref, computed } from "vue";

// When using the Tauri API npm package:
import { invoke } from "@tauri-apps/api/tauri";
// When using the Tauri global script (if not using the npm package)
// Be sure to set `build.withGlobalTauri` in `tauri.conf.json` to true

function invokenow() {
  // Invoke the command
  invoke("my_custom_command");
}
</script>

<template>
  <div class="w-full h-full">
    <button @click="invokenow" class="border p-4 m-4 cursor-pointer">
      INVOKE NOW
    </button>

    <section>
      <div>DEVICE NAME:</div>
    </section>
  </div>
</template>
