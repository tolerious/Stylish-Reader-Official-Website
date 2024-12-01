<template>
  <div>123</div>
</template>

<script setup lang="ts">
import { useHeader } from '@/composables/headerComposable';
import { onMounted } from 'vue';

const header = useHeader();

onMounted(() => {
  header.hideHeader();
});
</script>
