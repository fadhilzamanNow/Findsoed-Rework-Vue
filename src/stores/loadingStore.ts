import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
  const isLoading = ref<boolean>(false);

  const toggleLoading = (val: boolean) => {
    isLoading.value = val;
  };

  return { isLoading, toggleLoading };
});
