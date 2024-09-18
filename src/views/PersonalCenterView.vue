<template>
  <div class="flex flex-col items-center bg-black py-2 max-h-full">
    <div
      @click="convertVideoHandler"
      class="px-2 py-1 text-pink-500 border-pink-600 bg-white rounded-sm m-2 cursor-pointer active:shadow-md active:shadow-pink-800 select-none"
    >
      转换视频
    </div>
    <div class="w-11/12 flex flex-col gap-y-2">
      <video-list-item :video="video" v-for="video in videos" :key="video._id"></video-list-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoListItem from '@/components/VideoListItem.vue';
import { articleToken, youtubeVideos } from '@/constants';
import type { Video } from '@/types';
import { httpRequest } from '@/utils/requestUtils';
import jsPDF from 'jspdf';
import { onMounted, ref, type Ref } from 'vue';

const videos: Ref<Video[]> = ref([]);

async function getVideos() {
  const r = await httpRequest.get(youtubeVideos);
  videos.value = r.data.data;
}

async function convertVideoHandler() {
  const t = await httpRequest.get(articleToken);
  if (t.data.code === 200) {
    alert('视频转换成功');
  }
}

onMounted(() => {
  getVideos();
});
</script>
