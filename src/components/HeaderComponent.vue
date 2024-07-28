<template>
  <header class="bg-red-100 h-16 fixed w-full grid top-0" v-if="isHeaderFooterVisible">
    Header
  </header>
</template>

<script setup lang="ts">
defineProps({
  isHeaderFooterVisible: Boolean
});
</script>
