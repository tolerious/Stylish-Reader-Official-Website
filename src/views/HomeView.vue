<template>
  <main></main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { httpRequest } from '../utils/requestUtils'
onMounted(() => {
  console.log('...')
  httpRequest.get('/api/v1/health').then((res) => {
    console.log(res)
  })
})
</script>
