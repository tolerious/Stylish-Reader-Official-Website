<template>
  <div
    class="h-full max-h-screen"
    :class="[isHeaderFooterVisible ? 'grid grid-cols-1 grid-rows-[64px_1fr_50px] ' : '']"
  >
    <div>
      <header-component :is-header-footer-visible="isHeaderFooterVisible"></header-component>
    </div>
    <div :class="[!isHeaderFooterVisible ? 'h-full' : '']">
      <RouterView />
    </div>
    <div>
      <footer-component :is-header-footer-visible="isHeaderFooterVisible"></footer-component>
    </div>
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
  /* height: calc(100% - 64px - 50px); */
}
</style>
