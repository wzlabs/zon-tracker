<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
// import { Options, Vue } from "vue-class-component";

// // When using the Tauri API npm package:
// import { invoke } from "@tauri-apps/api/tauri";

// // Invoke the command
// invoke("my_custom_command");

import { ref, onMounted, computed } from "vue";
import { formatDisplayTimeHMS } from "@/lib/utils";
import { useTrackingStore } from "@/stores/tracking";

const props = defineProps({
  msg: { type: String, required: true },
});

const useTracking = useTrackingStore();

const display = computed(() => {
  return useTracking["displayStatus"];
});

const displayToday = computed(() => {
  // Time calculations for days, hours, minutes and seconds
  return useTracking["displayToday"];
});

const displayYesterday = computed(() => {
  return useTracking["displayYesterday"];
});

const startWorking = () => {
  useTracking.startWorking();
};

// lifecycle hooks
onMounted(() => {
  // console.log(`The initial count is ${count.value}.`);
});
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex flex-nowrap shrink-0 justify-between h-1/2 bg-[#f2f6fc]">
      <div class="w-1/2 ml-4 relative">
        <div class="absolute bottom-6 font-bold">{{ display }}</div>
      </div>
      <div class="w-1/2 mr-4 relative">
        <div class="absolute bottom-6 text-right right-8">
          {{ displayToday }}
        </div>
      </div>
    </div>
    <div class="flex flex-nowrap shrink-0 justify-between relative h-1/2">
      <div
        @click="startWorking"
        class="absolute top-[-24px] right-8 cursor-pointer"
      >
        <img
          v-if="useTracking.$state.isWorking"
          class="w-[48px] h-[48px]"
          src="@/assets/pause.png"
          alt=" "
        />
        <img v-else class="w-[48px] h-[48px]" src="@/assets/play.png" alt=" " />
      </div>
      <div class="flex flex-col mt-6 ml-4">
        <div>Yesterday</div>
        <div>{{ displayYesterday }}</div>
      </div>
      <div class="flex flex-col mt-6">
        <div>This week</div>
        <div>1m</div>
      </div>
      <div class="flex flex-col mt-6 mr-12">
        <div>This month</div>
        <div>1m</div>
      </div>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
