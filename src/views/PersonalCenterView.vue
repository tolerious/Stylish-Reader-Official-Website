<template>
  <div container class="lg:grid lg:grid-rows-1 lg:grid-cols-[200px_1fr] h-full">
    <div class="left-bar border-r-[1px]">
      <div class="flex justify-around">
        <button
          @click="convertVideoHandler"
          class="rounded-sm bg-pink-600 px-2 py-1 text-white border-pink-600 m-2 cursor-pointer active:shadow-md active:shadow-pink-800 select-none"
        >
          转换所有视频
        </button>
      </div>
      <div class="flex justify-around">
        <button
          @click="navigateRecideWord"
          class="rounded-sm bg-pink-600 px-2 py-1 text-white border-pink-600 m-2 cursor-pointer active:shadow-md active:shadow-pink-800 select-none"
        >
          我要背单词
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center bg- py-2 max-h-full overflow-scroll">
      <div class="w-11/12 flex flex-col gap-y-2">
        <video-list-item
          @transformed="handleTransformed"
          @delete="handleDelete"
          :video="video"
          v-for="video in videos"
          :key="video._id"
        ></video-list-item>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoListItem from '@/components/VideoListItem.vue';
import { articleToken, youtubeVideos } from '@/constants';
import type { Video } from '@/types';
import { httpRequest } from '@/utils/requestUtils';
import { onMounted, ref, type Ref } from 'vue';

const videos: Ref<Video[]> = ref([]);

function navigateRecideWord() {
  window.open('https://app.stylishreader.com');
}

function handleTransformed() {
  getVideos();
}

function handleDelete() {
  getVideos();
}

async function getVideos() {
  const r = await httpRequest.get(youtubeVideos);
  videos.value = r.data.data;
}

async function convertVideoHandler() {
  const t = await httpRequest.get(articleToken);
  if (t.data.code === 200) {
    getVideos();
    alert('视频转换成功');
  }
}

onMounted(() => {
  getVideos();
});
</script>
