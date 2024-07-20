<template>
  <main></main>
</template>

<script setup lang="ts">
import { pingPong } from '@/constants'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { httpRequest } from '../utils/requestUtils'
const router = useRouter()
onMounted(() => {
  httpRequest.get(pingPong).then((res) => {
    console.log(res.data)
    if (res.data.code !== 200) {
      router.push('/login')
    }
  })
})
</script>
