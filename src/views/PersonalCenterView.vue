<template>
  <div class="flex flex-col items-center bg-black py-2 max-h-full">
    <div class="w-11/12 flex flex-col gap-y-2">
      <video-list-item :video="video" v-for="video in videos" :key="video._id"></video-list-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoListItem from '@/components/VideoListItem.vue';
import { youtubeVideos } from '@/constants';
import type { Video } from '@/types';
import { httpRequest } from '@/utils/requestUtils';
import { onMounted, ref, type Ref } from 'vue';

const videos: Ref<Video[]> = ref([]);

async function getVideos() {
  const r = await httpRequest.get(youtubeVideos);
  videos.value = r.data.data;
}

onMounted(() => {
  getVideos();
});
</script>
