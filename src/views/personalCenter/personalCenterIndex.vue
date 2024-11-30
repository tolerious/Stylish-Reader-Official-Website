<template>
  <div class="w-11/12 flex flex-col gap-y-2">
    <video-list-item
      @transformed="handleTransformed"
      @delete="handleDelete"
      :video="video"
      v-for="video in videos"
      :key="video._id"
    ></video-list-item>
  </div>
  <loading-component :visible="loadingVisible"></loading-component>
</template>

<script setup lang="ts">
import LoadingComponent from '@/components/LoadingComponent.vue';
import VideoListItem from '@/components/VideoListItem.vue';
import { youtubeVideos } from '@/constants';
import type { Video } from '@/types';
import { httpRequest } from '@/utils/requestUtils';
import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';

const videos: Ref<Video[]> = ref([]);

const loadingVisible = ref(false);

onMounted(async () => {
  loadingVisible.value = true;
  await getVideos();
  loadingVisible.value = false;
});

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
</script>
