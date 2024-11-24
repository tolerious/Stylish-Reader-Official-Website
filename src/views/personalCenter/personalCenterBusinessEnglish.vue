<template>
  <div class="w-full px-4">
    <div class="flex w-full my-3">
      <div class="bg-pink-500 w-1 h-6 mr-3"></div>
      <div class="font-bold text-lg">Office English</div>
    </div>
    <div class="flex justify-around">
      <div video-container class="mt-2 flex flex-wrap justify-start gap-5">
        <productVideoItem v-for="i in 10" :key="i"></productVideoItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductVideoItem from '../../components/productVideoItem.vue';
</script>
