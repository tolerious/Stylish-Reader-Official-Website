<template>
  <div class="grid grid-rows-[1fr_auto] grid-cols-[1300px_1fr] h-full bg-black">
    <div class="row-span-1 col-span-1">
      <div class="h-full w-full grid grid-cols-1 grid-rows-[720px_1fr]">
        <div class="mx-auto my-0 mt-3" style="height: 720px; width: 1280px">
          <div id="player"></div>
        </div>
        <div class="text-zinc-400 pt-3 text-center grid grid-cols-1 grid-rows-2 items-center">
          <div class="text-2xl">What's level of your English.</div>
          <div class="text-lg">你认为你的中文水平如何？</div>
        </div>
      </div>
    </div>
    <div
      class="row-span-1 col-span-1 border-l-[0.5px] border-l-gray-800 text-sm p-2 overflow-y-scroll"
    >
      <div v-for="(enData, index) in enTranscriptData" :key="enData.tStartMs" class="mb-3">
        <div class="leading-tight text-amber-400 text-stone-500">
          {{ convertSegmentListToString(enData.segs) }}
        </div>
        <div class="text-stone-500 text-xs">
          {{ convertSegmentListToString(zhTranscriptData[index].segs) }}
        </div>
      </div>
    </div>
    <div class="row-span-1 col-span-2 h-12 border-t-gray-700 border-t-[0.5px]">3</div>
  </div>
</template>

<script setup lang="ts">
import type { Segment, Transcript } from '@/types';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { httpRequest } from '../utils/requestUtils';

const preFixUrl = 'https://www.youtube.com/embed';
const iframeSrc = ref('');
const route = useRoute();
const youtubeId = ref('');
const enTranscriptData: Ref<Transcript[]> = ref([]);
const zhTranscriptData: Ref<Transcript[]> = ref([]);
const player: Ref<YT.Player | null> = ref(null);

function convertSegmentListToString(segments: Segment[]) {
  return segments.map((segment) => segment.utf8).join(' ');
}

async function getYoutubeVideoDetail(videoId: string): Promise<void> {
  const r = await httpRequest.get(`/article/youtube/detail/${videoId}`);
  const enData = JSON.parse(r.data.data.enTranscriptData).events;
  const zhData = JSON.parse(r.data.data.cnTranscriptData).events;

  if (enData.length !== zhData.length) {
    alert('翻译文件出错，请联系管理员');
    return;
  }
  enTranscriptData.value = enData;
  zhTranscriptData.value = zhData;
}

function onPlayerReady(event: any) {
  console.log(event);
  if (player.value) {
    document.title = event.target.videoTitle;
  }
}

function onPlayerStateChange(event: any) {}

function createScriptTag(): void {
  let tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.body.appendChild(tag);
}

function initializeVideo(videoId: string): void {
  player.value = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

onMounted(async () => {
  youtubeId.value = route.params.youtubeId as string;
  createScriptTag();
  setTimeout(() => {
    initializeVideo(youtubeId.value);
  }, 800);
  iframeSrc.value = `${preFixUrl}/${youtubeId.value}`;
  getYoutubeVideoDetail(youtubeId.value);
});
</script>
