<script setup lang="ts">
import { useTemplateRef, watchEffect } from "vue";
import { useFirstViewPortEntry } from "./useFirstViewPortEntry";
import { LoadingOutlined } from "@ant-design/icons-vue";

type PageProps = {
  children?: Element;
  threshold?: IntersectionObserverInit["threshold"];
  root?: IntersectionObserverInit["root"];
  rootMargin?: IntersectionObserverInit["rootMargin"];
};

const { threshold, root, rootMargin } = defineProps<PageProps>();

const wrapperRef = useTemplateRef("wrapper");
let entered = useFirstViewPortEntry(wrapperRef, {
  root,
  threshold,
  rootMargin,
});
</script>

<template>
  <div ref="wrapper" :class="`${entered ? 'h-max' : 'h-screen'}`">
    <div v-if="entered">
      <slot />
    </div>
    <LoadingOutlined v-else />
  </div>
</template>
