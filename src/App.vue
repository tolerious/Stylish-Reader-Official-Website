<template>
  <div class="flex flex-col" :class="[isHeaderFooterVisible ? '' : 'h-full']">
    <header-component :is-header-footer-visible="isHeaderFooterVisible"></header-component>
    <main class="flex-1 max-h-full" :class="[isHeaderFooterVisible ? 'mt-16' : '']">
      <RouterView />
    </main>
    <footer-component :is-header-footer-visible="isHeaderFooterVisible"></footer-component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRouter } from 'vue-router';
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
const router = useRouter();
const isHeaderFooterVisible = computed(() => {
  const routerName = router.currentRoute.value.name ?? '';
  return !['youtube', 'login'].includes(routerName as string);
});
</script>
