<template>
  <footer v-if="isHeaderFooterVisible"></footer>
</template>

<script setup lang="ts">
defineProps({
  isHeaderFooterVisible: Boolean
});
</script>
