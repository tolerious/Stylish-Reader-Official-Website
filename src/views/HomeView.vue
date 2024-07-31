<template>
  <div class="max-w-screen-xl m-auto">
    <div class="p-5">
      <!-- <router-link to="/my/list">视频列表</router-link> -->
      <div id="about" class="flex flex-row mt-6">
        <div class="w-2/4">
          <div class="h-full flex flex-col justify-around text-gray-900">
            <h1 class="text-3xl font-medium">
              Want anything to be easy with <strong>Stylish Reader</strong>
            </h1>
            <p>
              Provide a network for all your needs with ease and fun using LaslesVPN discover
              interesting features from us.
            </p>
            <button
              class="bg-pink-600 px-8 py-3 text-white rounded-md active:shadow-sm active:shadow-pink-800 w-36"
            >
              Get Started
            </button>
          </div>
        </div>
        <div class="w-2/4"><img src="@/assets/images/about-right.webp" alt="" /></div>
      </div>
      <div id="feature"></div>
      <div id="pricing"></div>
      <div id="testimonial"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pingPong } from '@/constants';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { httpRequest } from '../utils/requestUtils';
const router = useRouter();
onMounted(() => {
  httpRequest.get(pingPong).then((res) => {
    if (res.data.code !== 200) {
      router.push('/login');
    }
  });
});
</script>
