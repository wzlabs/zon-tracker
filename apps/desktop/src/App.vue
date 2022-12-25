<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
// import { useDBStore } from "./stores/db";
import { once } from "@tauri-apps/api/event";
import { useRouter, useRoute } from "vue-router";
import config from "@/config/config";
import { useTrackingStore } from "@/stores/tracking";

// const db = useDBStore();
const router = useRouter();
const trackingStore = useTrackingStore();

type appIcon = {
  name: string;
  route: string;
  isIconSVG?: boolean;
  isIconImg?: boolean;
  iconValue: string;
};

const listApps = ref<appIcon[]>([
  {
    name: "Profile",
    route: "/profile",
    isIconImg: true,
    iconValue: require("@/assets/user.png"),
  },
  {
    name: "Tracking",
    route: "/tracking",
    isIconImg: true,
    iconValue: require("@/assets/time-machine.png"),
  },
  // {
  //   name: "Apps",
  //   route: "/apps",
  //   isIconImg: true,
  //   iconValue: require("@/assets/apps.png"),
  // },
  {
    name: "Add Task",
    route: "/tasks",
    isIconSVG: true,
    iconValue:
      '<svg class="w-[24px] h-[24px] text-[#3ba55d]" aria-hidden="true" role="img" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"></path></svg>',
  },
]);

const appClicked = (to: string) => {
  router.replace(to);
};

onMounted(async () => {
  try {
    await trackingStore.refreshSummary();
    // await db.initializeDbBackedStore();
    const socket = new WebSocket(config.wsUrl);
    socket.onopen = function () {
      console.log("WS Connected");
      socket.send(
        JSON.stringify({
          event: "WSTracking",
          data: "test",
        })
      );
      socket.onmessage = function (data) {
        console.log(data);
      };
    };
  } catch (e) {
    console.log(`There was a problem initializing the database`, e);
  }
  // once("receive-login", async (event: any) => {
  //   const params = new URLSearchParams(event.payload.url.split("#")[1]);
  //   const refreshToken = params.get("refresh_token");
  //   // further logic here as needed...
  // });
});
</script>

<template>
  <div class="devToolsWrapper flex flex-row flex-auto min-h-0">
    <div class="flex flex-col absolute overflow-hidden inset-0">
      <div class="flex relative overflow-hidden w-full h-full">
        <nav
          class="flex flex-col shrink relative overflow-hidden w-[72px] bg-[#eaf1fb]"
        >
          <ul class="flex flex-col relative h-full list-none inset-0">
            <div
              class="unreadMentionsIndicatorTop absolute overflow-hidden pt-2 top-0 left-0 right-0 h-[40px] w-[72px]"
            >
              <div
                class="unreadMentionsBar"
                style="transform: translateY(-180%)"
              >
                <span class="text-2GsXbW">new</span>
              </div>
            </div>

            <div class="scroller flex-auto relative py-3">
              <div
                v-for="appItem in listApps"
                v-bind:key="appItem.name"
                class="relative"
              >
                <div
                  class="flex relative justify-center w-[72px] mb-2"
                  @click="appClicked(appItem.route)"
                >
                  <div class="pill absolute top-0 left-0 w-[8px] h-[48px]">
                    <span class="opacity-100 h-[40px] transform-none"></span>
                  </div>
                  <div class="flex justify-center">
                    <div class="wrapper" draggable="true">
                      <app-icon v-if="appItem.isIconImg">
                        <img
                          class="w-[24px] h-[24px]"
                          v-bind:src="appItem.iconValue"
                          alt=" "
                        />
                      </app-icon>
                      <app-icon
                        v-else-if="appItem.isIconSVG"
                        v-html="appItem.iconValue"
                      >
                      </app-icon>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="relative">
                <div class="flex relative justify-center w-[72px] mb-2">
                  <div class="pill absolute top-0 left-0 w-[8px] h-[48px]">
                    <span class="opacity-100 h-[40px] transform-none"></span>
                  </div>
                  <div class="flex justify-center">
                    <div class="wrapper" draggable="true">
                      <div
                        class="flex justify-center items-center w-[48px] h-[48px] rounded-2xl overflow-hidden bg-[#d3e3fd] hover:bg-[#c2e7ff] hover:opacity-80 cursor-pointer"
                      >
                        <svg
                          class="w-[24px] h-[24px] text-[#3ba55d]"
                          aria-hidden="true"
                          role="img"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->

              <!-- <router-link to="/">Home</router-link> |
              <router-link to="/about">About</router-link> |
              <router-link to="/todos">Todos</router-link> -->
            </div>

            <div
              class="unreadMentionsIndicatorBottom absolute overflow-hidden pt-2 bottom-0 left-0 right-0 h-[40px] w-[72px]"
            >
              <div
                class="unreadMentionsBar"
                style="transform: translateY(180%)"
              >
                <span class="text-2GsXbW">new</span>
              </div>
            </div>
          </ul>
        </nav>
        <div class="flex flex-col relative grow m-0 p-0">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  position: absolute;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

nav {
  // padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
