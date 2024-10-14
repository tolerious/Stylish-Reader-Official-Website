<template>
  <div
    class="cursor-pointer p-2 rounded-sm shadow-md shadow-pink-100 grid grid-rows-1 grid-cols-[1fr_25%] lg:grid-cols-[1fr_20%] lg:mb-3"
  >
    <div @click="redirectToDetail()">
      <div class="flex items-start gap-1">
        <span>{{ video.title }}</span>
      </div>
      <div class="text-sm">收藏时间: {{ video.createdAt }}</div>
      <div v-if="video.isTransformed" class="text-sm text-green-500">已转换</div>
      <div v-else class="text-sm text-red-500">未转换</div>
    </div>
    <div class="flex flex-col lg:flex-row justify-between items-center">
      <button
        @click="transformVideo(video._id)"
        class="shadow-sm shadow-gray-300 px-2 py-1 border active:shadow-gray-500 text-sm"
      >
        转换视频
      </button>
      <button
        @click="deleteArticle(video._id)"
        class="shadow-sm shadow-gray-300 px-2 py-1 border active:shadow-gray-500 text-sm"
      >
        删除视频
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Video } from '@/types';
import { httpRequest } from '@/utils/requestUtils';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  video: { type: Object as PropType<Video>, required: true }
});

const emit = defineEmits(['delete', 'transformed']);

async function transformVideo(id: string) {
  const r = await httpRequest.post('/articletoken/', { articleId: id });
  console.log(r.data);
  if (r.data.code === 200) {
    emit('transformed');
    alert('转换成功');
  } else {
    alert('转换失败');
  }
}

async function deleteArticle(id: string) {
  const r = await httpRequest.post('/article/delete', { articleId: id });
  if (r.data.code === 200) {
    alert('删除成功');
    emit('delete');
  } else {
    alert('删除失败');
  }
}

function redirectToDetail() {
  router.push(`/youtuber/${props.video.youtubeVideoId}`);
}
</script>
