<template>
  <div class="flex flex-col h-full">
    <header class="bg-red-100 h-[60px]" v-if="isHeaderFooterVisible"></header>
    <main class="flex-1 max-h-full"><RouterView /></main>
    <footer class="bg-blue-300 h-[50px]" v-if="isHeaderFooterVisible"></footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRouter } from 'vue-router';
const router = useRouter();
const isHeaderFooterVisible = computed(() => {
  const routerName = router.currentRoute.value.name ?? '';
  return !['youtube'].includes(routerName as string);
});
</script>
