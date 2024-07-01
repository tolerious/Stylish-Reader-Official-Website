<template>
  <div class="grid grid-rows-[1fr_auto] grid-cols-[1300px_1fr] h-full bg-black">
    <div class="row-span-1 col-span-1">
      <div class="h-full w-full grid grid-cols-1 grid-rows-[720px_1fr]">
        <div class="mx-auto my-0" style="height: 720px; width: 1280px">
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
    <div class="row-span-1 col-span-1">2</div>
    <div class="row-span-1 col-span-2 h-12">3</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<style scoped></style>
