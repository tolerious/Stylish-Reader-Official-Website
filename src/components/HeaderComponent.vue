<template>
  <header
    class="h-16 fixed w-full grid top-0 grid-rows-1 grid-cols-4 px-5 py-3 shadow-sm shadow-slate-200"
    v-if="isHeaderFooterVisible"
  >
    <div class="flex flex-row justify-start items-center">
      <img src="@/assets/images/logo.svg" alt="" srcset="" />
    </div>
    <div class="col-span-2">
      <ul class="flex flex-row h-full items-center">
        <li class="px-6 cursor-pointer text-gray-950 hover:text-pink-600">About</li>
        <li class="px-6 cursor-pointer text-gray-950 hover:text-pink-600">Feature</li>
        <li class="px-6 cursor-pointer text-gray-950 hover:text-pink-600">Pricing</li>
        <li class="px-6 cursor-pointer text-gray-950 hover:text-pink-600">Testimonial</li>
      </ul>
    </div>
    <div class="bg--300 flex justify-end items-center">
      <button
        class="px-4 py-1 border-pink-600 border-2 rounded-md text-pink-600 active:shadow-sm active:shadow-slate-400"
      >
        Try for free!
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps({
  isHeaderFooterVisible: Boolean
});
</script>
