<template>
  <div class="grid grid-rows-[1fr_auto] grid-cols-[1300px_1fr] h-full bg-black">
    <div class="row-span-1 col-span-1">
      <div class="h-full w-full grid grid-cols-1 grid-rows-[720px_1fr]">
        <div class="mx-auto my-0 mt-3" style="height: 720px; width: 1280px">
          <!-- <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/gWotBPtsulo?si=ACHLMpjDIuOZTZUB&amp;controls=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe> -->
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/gWotBPtsulo?si=ACHLMpjDIuOZTZUB"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <div>subtitle</div>
      </div>
    </div>
    <div
      class="row-span-1 col-span-1 border-l-[0.5px] border-l-gray-800 text-sm p-2 overflow-y-scroll"
    >
      <div v-for="item in 300" class="mb-3">
        <div class="leading-tight text-amber-400 text-stone-500">
          Do you think you're C1 (advanced level) in English?Take this test and find out your level.
        </div>
        <div class="text-stone-500 text-xs">你认为的中文水平如何呢？</div>
      </div>
    </div>
    <div class="row-span-1 col-span-2 h-12 border-t-gray-700 border-t-[0.5px]">3</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<style scoped></style>
