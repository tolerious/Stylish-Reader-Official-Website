<template>
  <div class="cursor-pointer p-2 rounded-sm shadow-sm bg-orange-300" @click="redirectToDetail()">
    <div>{{ video.title }}</div>
    <div class="text-sm">{{ video.createdAt }}</div>
  </div>
</template>

<script setup lang="ts">
import { type Video } from '@/types';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  video: { type: Object as PropType<Video>, required: true }
});

function redirectToDetail() {
  router.push(`/youtube/${props.video.youtubeVideoId}`);
}
</script>
