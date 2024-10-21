<template>
  <carousel :items-to-show="1" :autoplay="4000" :wrap-around="true">
    <slide v-for="slide in 10" :key="slide">
      <div class="bg-slate-300">
        <img src="@/assets/images/slider-01.png" alt="" srcset="" />
      </div>
    </slide>

    <template #addons>
      <navigation />
      <!-- <pagination /> -->
    </template>
  </carousel>
</template>

<script setup lang="ts">
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
</script>
