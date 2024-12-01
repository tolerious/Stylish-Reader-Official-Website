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
import { RouterView, useRoute } from 'vue-router';
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
const route = useRoute();
const isHeaderFooterVisible = computed(() => {
  return !!route.meta.showHeader;
});
</script>

<style scoped>
.app-body {
  height: calc(100% - 64px);
}
</style>
