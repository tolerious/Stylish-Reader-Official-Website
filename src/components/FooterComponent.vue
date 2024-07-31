<template>
  <footer class="bg-blue-300 h-12" v-if="isHeaderFooterVisible">Footer</footer>
</template>

<script setup lang="ts">
defineProps({
  isHeaderFooterVisible: Boolean
});
</script>
