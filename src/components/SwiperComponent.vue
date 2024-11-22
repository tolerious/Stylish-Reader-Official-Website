<template>
  <carousel :items-to-show="1" :autoplay="4000" :wrap-around="true">
    <slide v-for="item in slideList" :key="item.img">
      <div class="bg-slate-300">
        <img :src="item.img" alt="" srcset="" />
      </div>
    </slide>
    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';

const slideList = ref([
  {
    img: '/images/slider-01.png'
  },
  {
    img: '/images/slider-02.png'
  },
  {
    img: '/images/slider-03.png'
  },
  {
    img: '/images/slider-04.png'
  },
  {
    img: '/images/slider-05.png'
  }
]);
</script>
