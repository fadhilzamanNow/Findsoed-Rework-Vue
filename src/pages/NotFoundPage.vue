<script setup lang="ts">
import { BugOutlined } from "@ant-design/icons-vue";
import { Button } from "ant-design-vue";
</script>

<template>
  <div class="h-screen w-full flex flex-col items-center justify-center gap-4">
    <BugOutlined class="text-7xl" />
    <div class="text-center flex flex-col items-center justify-center gap-2">
      <h1 class="text-4xl font-bold">404</h1>
      <p class="text-xl">Halaman yang kamu cari di FindSoed gak ada.... :(</p>
      <RouterLink to="/home">
        <Button type="primary">Kembali</Button>
      </RouterLink>
    </div>
  </div>
</template>
