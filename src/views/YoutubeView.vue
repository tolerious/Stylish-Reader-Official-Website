<template>
  <div class="grid grid-rows-[1fr_auto] grid-cols-[70%_1fr] h-full bg-black">
    <div class="row-span-1 col-span-1">
      <div class="h-full w-full grid grid-cols-1 grid-rows-[80%_1fr]">
        <div class="mx-auto my-0 mt-1 w-full flex flex-row justify-center">
          <div id="player"></div>
        </div>
        <div class="text-zinc-400 pt-3 text-center grid grid-cols-1 grid-rows-2 items-center">
          <div class="text-2xl text-amber-400" v-html="currentEnTranscriptText"></div>
          <div class="text-lg">{{ currentZhTranscriptText }}</div>
        </div>
      </div>
    </div>
    <!-- 中英文翻译不一致 -->
    <template v-if="!isTranscriptConsistent">
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
        class="row-span-1 col-span-1 border-l-[0.5px] border-l-gray-800 text-lg p-2 overflow-y-scroll"
        v-if="playerIsReady"
      >
        <div
          v-for="[_, enData] in enTranscriptData"
          :key="_"
          class="mb-3"
          :class="[shouldHightLightEnText(_) ? ['text-amber-400', 'highlight'] : 'text-stone-500']"
        >
          <span v-for="seg in enData.segs" :key="seg._id">{{ seg.text }} {{}}</span>
          <div>
            {{ zhTranscriptData[getEnTranscriptIndex(_)].segs.map((seg) => seg.utf8).join('') }}
          </div>
        </div>
      </div>
    </template>

    <div class="row-span-1 col-span-2 h-12 border-t-gray-700 border-t-[0.5px]">3</div>
  </div>
</template>

<script setup lang="ts">
import { PlayerState, type ArticleToken, type Segment, type Transcript } from '@/types';
import { computed, onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { httpRequest } from '../utils/requestUtils';

const preFixUrl = 'https://www.youtube.com/embed';
const iframeSrc = ref('');
const route = useRoute();
const youtubeId = ref('');
const playerIsReady = ref(false);
const enTranscriptData: Ref<Map<string, ArticleToken> | null> = ref(null);
const zhTranscriptData: Ref<Transcript[]> = ref([]);
const player: Ref<YT.Player | null> = ref(null);
const isTranscriptConsistent = ref(false);
const currentTime = ref(0);
const currentPlayerState = ref(PlayerState.NotStarted);

const currentEnTranscriptText = computed(() => {
  if (enTranscriptData.value !== null) {
    const keys = Array.from(enTranscriptData.value.keys());
    const meetConditionKeys = keys.filter((key) => {
      const [startTime, duration] = key.split('-');
      if (duration !== 'newline') {
        return (
          currentTime.value >= Number.parseInt(startTime) / 1000 &&
          currentTime.value <= (Number.parseInt(startTime) + Number.parseInt(duration)) / 1000
        );
      }
    });
    const currentEnTranscript = meetConditionKeys.map((key) => {
      if (enTranscriptData.value !== undefined && enTranscriptData.value !== null) {
        const target = enTranscriptData.value.get(key);
        if (target) {
          return target.originTextString;
        }
      }
    });
    return currentEnTranscript.join('');
  }
  return '';
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

function getEnTranscriptIndex(k: string): number {
  if (enTranscriptData.value !== null) {
    const keys = Array.from(enTranscriptData.value?.keys());
    return keys.indexOf(k);
  }
  return 0;
}

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

    if (currentPlayerState.value === PlayerState.Playing) {
      scrollElement();
    }
  }, 40);
}

function shouldHightLightEnText(tokenStartAndDuration: string): boolean {
  const [startTime, duration] = tokenStartAndDuration.split('-');
  if (duration === 'newline') {
    return false;
  }
  const s = Number.parseInt(startTime) / 1000;
  const e = (Number.parseInt(duration) + Number.parseInt(startTime)) / 1000;
  return currentTime.value >= s && currentTime.value <= e;
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
    isTranscriptConsistent.value = false;
  } else {
    isTranscriptConsistent.value = true;
  }
  zhTranscriptData.value = zhData;
}

function onPlayerReady(event: any) {
  playerIsReady.value = true;
  updateCurrentTime();
  if (player.value) {
    document.title = event.target.videoTitle;
  }
}

function onPlayerStateChange(event: any) {
  currentPlayerState.value = event.data;
}

function createScriptTag(): void {
  let tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.body.appendChild(tag);
}

function initializeVideo(videoId: string): void {
  player.value = new YT.Player('player', {
    height: '100%',
    width: '99%',
    border: 'none',
    videoId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

async function getArticleTokenDetail(youtubeVideoId: string) {
  const at = await httpRequest.post('/articletoken/detail', { youtubeVideoId });
  return at;
}

async function generateTranscriptData(youtubeVideoId: string) {
  const t = await getArticleTokenDetail(youtubeVideoId);
  enTranscriptData.value = new Map(Object.entries(t.data.data.tokens));
}

onMounted(async () => {
  youtubeId.value = route.params.youtubeId as string;
  createScriptTag();
  setTimeout(() => {
    initializeVideo(youtubeId.value);
  }, 800);
  iframeSrc.value = `${preFixUrl}/${youtubeId.value}`;
  generateTranscriptData(youtubeId.value);
  await getYoutubeVideoDetail(youtubeId.value);
});
</script>
