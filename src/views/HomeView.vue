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
              class="bg-pink-600 px-8 py-3 text-white rounded-md active:shadow-sm active:shadow-pink-800 w-36 hover:animate-none"
            >
              Get Started
            </button>
          </div>
        </div>
        <div class="w-2/4"><img src="@/assets/images/about-right.webp" alt="" /></div>
      </div>
      <div class="grid grid-cols-3 grid-rows-1 px-8 py-14 bg-slate-50 mt-5">
        <div v-for="data in bannerData" :key="data.iconName">
          <div class="grid grid-cols-2 grid-rows-2 gap-x-6">
            <div class="row-span-2 flex justify-end items-center">
              <div class="w-12 h-12 bg-pink-200 flex justify-center items-center rounded-full">
                <img class="w-6 h-6" :src="data.iconName" alt="" srcset="" />
              </div>
            </div>
            <div class="text-xl font-bold">
              <span>{{ data.topText }}</span>
            </div>
            <div class="text-lg text-gray-700">
              <span>{{ data.bottomText }}</span>
            </div>
          </div>
        </div>
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
import userIcon from '@/assets/images/user.svg';
import articleIcon from '@/assets/images/article.svg';
import wordIcon from '@/assets/images/word.svg';
const router = useRouter();

const bannerData = [
  {
    topText: '500+',
    bottomText: 'Users',
    iconName: userIcon
  },
  {
    topText: '4000+',
    bottomText: 'Articles&Videos',
    iconName: articleIcon
  },
  {
    topText: '20000+',
    bottomText: 'Words',
    iconName: wordIcon
  }
];

function generateIcon(iconName: string) {
  return `@/assets/images/${iconName}.svg`;
}

onMounted(() => {
  httpRequest.get(pingPong).then((res) => {
    if (res.data.code !== 200) {
      router.push('/login');
    }
  });
});
</script>
