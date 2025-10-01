<script setup lang="ts">
import { watchEffect } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/authStore";
import { findUserInfo } from "./api/Auth/Auth";
import { storeToRefs } from "pinia";
import { useHead } from "@unhead/vue";
import { validateTokenHandler } from "./utils/validateToken";
import OverlayScreen from "./components/Overlay/OverlayScreen.vue";
import { useLoadingStore } from "./stores/loadingStore";

useHead({
  title: "Findsoed Rework",
});

const auth = useAuthStore();
const loading = useLoadingStore();
const { authToken } = storeToRefs(auth);
const { isLoading } = storeToRefs(loading);

const findInfo = async () => {
  try {
    loading.toggleLoading(true);
    const response = await findUserInfo();
    if (response) {
      auth.setUserInfo({
        username: response.data.username,
        userId: response.data.userId,
        email: response.data.email,
        imageUrl: response.data.imageUrl,
        phoneNumber: response.data.phoneNumber,
      });
    }
  } catch (e) {
    auth.setAuthToken(null);
    auth.setUserInfo(null);
  } finally {
    loading.toggleLoading(false);
  }
};

watchEffect(() => {
  if (typeof window !== "undefined") {
    if (!authToken.value) {
      const token = localStorage.getItem("authToken");
      if (token) {
        const timeLeft = validateTokenHandler(token);
        if (timeLeft) {
          auth.setAuthToken(token);
          findInfo();
          setTimeout(() => {
            localStorage.removeItem("authToken");
            auth.setAuthToken(null);
            auth.setUserInfo(null);
          }, timeLeft);
        } else {
          auth.setAuthToken(null);
          auth.setUserInfo(null);
        }
      }
    }
  }
});
</script>

<template>
  <div class="w-full h-screen relative">
    <OverlayScreen v-if="isLoading" />
    <RouterView />
  </div>
</template>
