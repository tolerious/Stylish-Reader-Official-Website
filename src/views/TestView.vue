<template>
  <div>test</div>
  <carousel :items-to-show="1.5" :autoplay="1" :wrap-around="true" :transition="4000">
    <slide v-for="slide in 10" :key="slide">
      <div  class="bg-slate-300">
        <img
          src="https://www.kuka.com/-/media/kuka-corporate/countries/czech-republic/images/kuka_rob_robot_range_01_2021.png?rev=7b24c29b14164cc4b22bd1d591755231&w=1400&hash=5A5CD1EB4A6080129D24E2AFCEAFA3EA"
          alt=""
          srcset=""
        />
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
