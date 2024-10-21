<template>
  <div class="flex flex-col h-full" :class="[isHeaderFooterVisible ? '' : 'h-full']">
    <header-component :is-header-footer-visible="isHeaderFooterVisible"></header-component>
    <main class="flex-1 app-body" :class="[isHeaderFooterVisible ? 'mt-16' : '']">
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
  return !['YouTube 视频', 'login', '导出PDF', 'Test'].includes(routerName as string);
});
</script>

<style scoped>
.app-body {
  height: calc(100% - 64px);
}
</style>
