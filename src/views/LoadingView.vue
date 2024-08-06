<template>
  <div></div>
</template>

<script setup lang="ts">
import { pingPong } from '@/constants';
import { httpRequest } from '@/utils/requestUtils';
import { onMounted } from 'vue';

onMounted(async () => {
  const r = await httpRequest.get(pingPong);
});
</script>
