<template>
  <div class="grid grid-rows-[1fr_auto] grid-cols-[70%_1fr] h-full bg-black">
    <div class="row-span-1 col-span-1">
      <div class="h-full w-full grid grid-cols-1 grid-rows-[85%_1fr]">
        <div class="mx-auto my-0 mt-3 w-full">
          <div id="player"></div>
        </div>
        <div class="text-zinc-400 pt-3 text-center grid grid-cols-1 grid-rows-2 items-center">
          <div class="text-2xl text-amber-400" v-html="currentTranscriptText"></div>
          <div class="text-lg">{{ currentZhTranscriptText }}</div>
        </div>
      </div>
    </div>
    <template v-if="!showZhTranscript">
      <div class="row-span-1 col-span-1 overflow-y-hidden">
        <div class="overflow-y-hidden grid grid-rows-[50%_50%] h-full" v-if="playerIsReady">
          <div class="overflow-y-scroll border-b-gray-800 border-b-[0.5px]">
            <div
              class="max-h-full row-span-1 col-span-1 border-l-[0.5px] border-l-gray-800 text-base p-2"
              v-if="playerIsReady"
              style="height: 100%; max-height: 100%"
            >
              <div v-for="enData in enTranscriptData" :key="enData.tStartMs" class="mb-1">
                <div
                  :class="[
                    shouldHightLightText(enData)
                      ? ['text-amber-400', 'highlight']
                      : 'text-stone-500'
                  ]"
                >
                  {{ convertSegmentListToString(enData.segs) }}
                </div>
              </div>
            </div>
          </div>
          <div class="overflow-y-scroll">
            <div
              class="row-span-1 col-span-1 border-l-[0.5px] border-l-gray-800 text-sm p-2"
              v-if="playerIsReady"
            >
              <div v-for="zhData in zhTranscriptData" :key="zhData.tStartMs" class="mb-3">
                <div
                  :class="[
                    shouldHightLightText(zhData)
                      ? ['text-amber-400', 'highlight-right']
                      : 'text-stone-500'
                  ]"
                >
                  {{ convertSegmentListToString(zhData.segs) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="row-span-1 col-span-1 border-l-[0.5px] border-l-gray-800 text-base p-2 overflow-y-scroll"
        v-if="playerIsReady"
      >
        <div v-for="(enData, index) in enTranscriptData" :key="enData.tStartMs" class="mb-3">
          <div
            :class="[
              shouldHightLightText(enData) ? ['text-amber-400', 'highlight'] : 'text-stone-500'
            ]"
          >
            {{ convertSegmentListToString(enData.segs) }}
          </div>
          <div
            class="text-xs"
            :class="[
              shouldHightLightText(enData) ? ['text-amber-400', 'highlight'] : 'text-stone-500'
            ]"
          >
            {{ convertSegmentListToString(zhTranscriptData[index].segs) }}
          </div>
        </div>
      </div>
    </template>

    <div class="row-span-1 col-span-2 h-12 border-t-gray-700 border-t-[0.5px]">3</div>
  </div>
</template>

<script setup lang="ts">
import type { Segment, Transcript } from '@/types';
import { computed, onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { httpRequest } from '../utils/requestUtils';

const preFixUrl = 'https://www.youtube.com/embed';
const iframeSrc = ref('');
const route = useRoute();
const youtubeId = ref('');
const playerIsReady = ref(false);
const enTranscriptData: Ref<Transcript[]> = ref([]);
const zhTranscriptData: Ref<Transcript[]> = ref([]);
const player: Ref<YT.Player | null> = ref(null);
const showZhTranscript = ref(false);
const currentTime = ref(0);

const currentTranscriptText = computed(() => {
  console.log('current transcript.');
  const segs = enTranscriptData.value.filter((transcript: Transcript) => {
    if (transcript.segs) {
      const startTime = transcript.tStartMs / 1000;
      const endTime = transcript.dDurationMs / 1000 + startTime;
      return currentTime.value >= startTime && currentTime.value <= endTime;
    } else {
      return false;
    }
  });

  const seg = segs[segs.length - 1];
  if (seg && seg.segs) {
    return seg.segs.map((seg) => seg.utf8).join('');
  } else {
    return '';
  }
});

const currentZhTranscriptText = computed(() => {
  const segs = zhTranscriptData.value.filter((transcript: Transcript) => {
    if (transcript.segs) {
      const startTime = transcript.tStartMs / 1000;
      const endTime = transcript.dDurationMs / 1000 + startTime;
      return currentTime.value >= startTime && currentTime.value <= endTime;
    } else {
      return false;
    }
  });

  const seg = segs[segs.length - 1];
  if (seg && seg.segs) {
    return seg.segs.map((seg) => seg.utf8).join('');
  } else {
    return '';
  }
});
function scrollElement() {
  const element = document.querySelector('.highlight');
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  }
  const elementCopy = document.querySelector('.highlight-right');
  if (elementCopy) {
    elementCopy.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    });
  }
}

function updateCurrentTime() {
  setInterval(() => {
    currentTime.value = player.value?.getCurrentTime()!;
    scrollElement();
  }, 40);
}

function shouldHightLightText(transcript: Transcript): boolean {
  if (transcript && transcript.segs) {
    const startTime = transcript.tStartMs / 1000;
    const endTime = transcript.dDurationMs / 1000 + startTime;
    return currentTime.value >= startTime && currentTime.value <= endTime;
  } else {
    return false;
  }
}

function convertSegmentListToString(segments: Segment[]) {
  if (!segments) {
    return '';
  }
  return segments.map((segment) => segment.utf8).join(' ');
}

async function getYoutubeVideoDetail(videoId: string): Promise<void> {
  const r = await httpRequest.get(`/article/youtube/detail/${videoId}`);
  const enData = JSON.parse(r.data.data.enTranscriptData).events;
  const zhData = JSON.parse(r.data.data.cnTranscriptData).events;

  if (enData.length !== zhData.length) {
    console.log('翻译文件出错，请联系管理员');
    showZhTranscript.value = false;
  } else {
    showZhTranscript.value = true;
  }
  enTranscriptData.value = enData;
  zhTranscriptData.value = zhData;
}

function onPlayerReady(event: any) {
  playerIsReady.value = true;
  updateCurrentTime();
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
    border: 'none',
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
  await getYoutubeVideoDetail(youtubeId.value);
});
</script>
