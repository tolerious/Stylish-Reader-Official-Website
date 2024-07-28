<template>
  <div class="flex flex-col" :class="[isHeaderFooterVisible ? '' : 'h-full']">
    <header class="bg-red-100 h-16 fixed w-full grid" v-if="isHeaderFooterVisible">Header</header>
    <main class="flex-1 max-h-full" :class="[isHeaderFooterVisible ? 'mt-16' : '']">
      <RouterView />
    </main>
    <footer class="bg-blue-300 h-12" v-if="isHeaderFooterVisible">Footer</footer>
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
