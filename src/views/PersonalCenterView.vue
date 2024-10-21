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
          @click="navigateReciteWord"
          class="rounded-sm bg-pink-600 px-2 py-1 text-white border-pink-600 m-2 cursor-pointer active:shadow-md active:shadow-pink-800 select-none"
        >
          我要背单词
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center bg- py-2 max-h-full overflow-scroll">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { articleToken, youtubeVideos } from '@/constants';
import { httpRequest } from '@/utils/requestUtils';
import { onMounted } from 'vue';
import type { Video } from '@/types';
import type { Ref } from 'vue';
import { ref } from 'vue';

const videos: Ref<Video[]> = ref([]);

onMounted(() => {
  getVideos();
});

function navigateReciteWord() {
  window.open('https://app.stylishreader.com');
}

async function convertVideoHandler() {
  const t = await httpRequest.get(articleToken);
  if (t.data.code === 200) {
    getVideos();
    alert('视频转换成功');
  }
}

async function getVideos() {
  const r = await httpRequest.get(youtubeVideos);
  videos.value = r.data.data;
}
</script>
