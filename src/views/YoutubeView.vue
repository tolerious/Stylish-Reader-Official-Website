<template>
  <div
    @click="isStylishReaderShowUp" style="height: 100%;"
    class="grid lg:grid-rows-[1fr_auto] lg:grid-cols-[70%_1fr] grid-cols-1 grid-rows-[40%_1fr_1fr_3rem] h-full bg-black"
  >
    <div video-container class="lg:row-span-1 lg:col-span-1 h-full">
      <div class="lg:h-full w-full grid lg:grid-cols-1 lg:grid-rows-[80%_1fr] h-full">
        <!-- 播放器区域 -->
        <div class="mx-auto my-0 mt-1 h-full w-full flex flex-row justify-center">
          <div id="player"></div>
        </div>
        <!-- 中英文当前字幕显示区域 -->
        <div
          class="text-zinc-400 pt-3 text-center lg:grid grid-cols-1 grid-rows-2 items-center hidden"
        >
          <div class="text-2xl text-amber-400 cursor-pointer" v-if="isEnglishTranscriptVisible">
            <div v-for="transcript in currentEnTranscriptText" :key="transcript">
              {{ transcript }}
            </div>
          </div>
          <div class="text-lg" v-if="isChineseTranscriptVisible">{{ currentZhTranscriptText }}</div>
        </div>
      </div>
    </div>
    <!-- 中英文翻译不一致 -->
    <template v-if="!isTranscriptConsistent">
      <div in-coincide-transcript class="row-span-2 lg:row-span-1 col-span-1 overflow-y-hidden">
        <div
          class="overflow-y-hidden grid h-full"
          :class="[
            isChineseTranscriptVisible && isEnglishTranscriptVisible
              ? 'grid-rows-[50%_50%]'
              : 'grid-rows-1'
          ]"
          v-if="playerIsReady"
        >
          <!-- 英文显示区域 -->
          <div class="overflow-y-scroll border-b-gray-800 border-b-[0.5px]">
            <div
              class="max-h-full row-span-1 col-span-1 border-l-[0.5px] border-l-gray-800 lg:text-xl text-lg p-2"
              v-if="playerIsReady"
              style="height: 100%; max-height: 100%"
            >
              <template v-for="[_, enData] in enTranscriptData" :key="_">
                <template v-if="enData.segs.filter((seg) => seg.text !== '').length > 0">
                  <div class="flex">
                    <div
                      class="flex items-start mt-[5px] cursor-pointer"
                      style="width: 25px; min-width: 25px"
                      @click="goToCertainTime(_)"
                    >
                      <img
                        src="/images/play-small-button.svg"
                        alt=""
                        style="height: 20px; width: 20px"
                      />
                    </div>
                    <div
                      class="mb-1"
                      :class="[
                        shouldHightLightEnText(_)
                          ? ['text-amber-400', 'highlight']
                          : 'text-stone-500'
                      ]"
                    >
                      <span v-for="seg in enData.segs" :key="seg._id">{{ seg.text }} {{}}</span>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </div>
          <!-- 中文显示区域 -->
          <div class="overflow-y-scroll" v-if="isChineseTranscriptVisible">
            <div
              class="row-span-1 col-span-1 border-l-[0.5px] border-l-gray-800 lg:text-xl text-base p-2"
              v-if="playerIsReady"
            >
              <div v-for="zhData in zhTranscriptData" :key="zhData.tStartMs" class="lg:mb-3 mb-1">
                <div
                  :class="[
                    shouldHightLightText(zhData)
                      ? ['text-amber-400', 'highlight-right']
                      : 'text-stone-500'
                  ]"
                >
                  {{
                    convertSegmentListToString(zhData.segs)
                      .trim()
                      .replaceAll(' ', '')
                      .replaceAll('，', ',')
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-gray-300 lg:row-span-1 lg:col-span-1 row-span-2 border-l-[0.5px] border-l-gray-800 text-md p-2 overflow-y-scroll"
        >
          字幕加载中,请确保已打开VPN。
        </div>
      </div>
    </template>
    <!-- 中英文翻译一致 -->
    <template v-else>
      <div
        coincide-transcript
        class="lg:row-span-1 lg:col-span-1 row-span-2 border-l-[0.5px] border-l-gray-800 lg:text-xl text-lg p-2 overflow-y-scroll lg:h-full"
        v-if="playerIsReady"
      >
        <div
          v-for="[_, enData] in enTranscriptData"
          :key="_"
          class="mb-3 text-wrap"
          :class="[shouldHightLightEnText(_) ? ['text-amber-400', 'highlight'] : 'text-stone-500']"
        >
          <template v-if="isEnglishTranscriptVisible">
            <div class="flex">
              <div
                style="width: 25px; min-width: 25px"
                class="flex items-start mt-[5px] cursor-pointer"
                @click="goToCertainTime(_)"
              >
                <img src="/images/play-small-button.svg" alt="" style="height: 20px; width: 20px" />
              </div>
              <div>
                <span v-for="seg in enData.segs" :key="seg._id">{{ seg.text }} {{}}</span>
              </div>
            </div>
          </template>
          <div v-if="isChineseTranscriptVisible" class="flex">
            <div style="width: 25px; min-width: 25px"></div>
            <div>
              {{ zhTranscriptData[getEnTranscriptIndex(_)].segs.map((seg) => seg.utf8).join('') }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-gray-300 lg:row-span-1 lg:col-span-1 row-span-2 border-l-[0.5px] border-l-gray-800 text-md p-2 overflow-y-scroll"
      >
        字幕加载中,请确保已打开VPN。
      </div>
    </template>
    <div
      tool-bar
      class="lg:row-span-1 lg:col-span-2 lg:h-12 h-12 border-t-gray-700 border-t-[0.5px] text-slate-400"
    >
      <div
        class="hover:text-pink-400 float-start h-full cursor-pointer items-center hidden lg:flex"
        @click="goHome"
      >
        <span class="pl-1">返回</span>
      </div>
      <div
        class="h-full lg:w-1/2 m-auto grid grid-rows-1 lg:grid-cols-5 grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr]"
      >
        <div class="flex justify-center items-center">
          <select
            v-model="currentSubtitleType"
            name=""
            id=""
            class="p-[0.5px] bg-black cursor-pointer hover:text-pink-400"
            @change="handleSwitchSubtitle"
          >
            <option value="bilingual" class="text-slate-400">双语字幕</option>
            <option value="chinese" class="text-slate-400">中文字幕</option>
            <option value="english" class="text-slate-400">英文字幕</option>
          </select>
        </div>
        <div class="flex justify-center items-center">
          <span
            @click="seekBack"
            class="h-6 cursor-pointer hidden active:shadow-md active:shadow-pink-300 hover:text-pink-400 lg:block"
            >后退10s</span
          >
          <span
            @click="seekBack"
            class="h-6 cursor-pointer active:shadow-md active:shadow-pink-300 hover:text-pink-400 lg:hidden"
            >后退</span
          >
        </div>
        <div class="flex justify-center items-center">
          <span
            @click="playPauseVideo"
            class="h-6 cursor-pointer active:shadow-md active:shadow-pink-300 hover:text-pink-400"
            v-if="
              [PlayerState.NotStarted, PlayerState.Paused, PlayerState.Ended].includes(
                currentPlayerState
              )
            "
            >开始</span
          >
          <span
            v-else
            @click.stop="playPauseVideo"
            class="h-6 cursor-pointer active:shadow-md active:shadow-pink-300 hover:text-pink-400"
            >暂停</span
          >
        </div>
        <div class="flex justify-center items-center">
          <span
            @click="seekAhead"
            class="h-6 cursor-pointer active:shadow-md active:shadow-pink-300 hover:text-pink-400 lg:block hidden"
            >前进10s</span
          >
          <span
            @click="seekAhead"
            class="h-6 cursor-pointer active:shadow-md active:shadow-pink-300 hover:text-pink-400 lg:hidden"
            >前进</span
          >
        </div>
        <div class="flex justify-center items-center">
          <span
            @click="generatePdfHandler"
            class="h-6 cursor-pointer active:shadow-md active:shadow-pink-300 hover:text-pink-400"
            >字幕导出</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlayerState, type ArticleToken, type Segment, type Transcript } from '@/types';
import { computed, onMounted, ref, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { httpRequest } from '../utils/requestUtils';
import jsPDF from 'jspdf';

const preFixUrl = 'https://www.youtube.com/embed';
const iframeSrc = ref('');
const route = useRoute();
const router = useRouter();
const youtubeId = ref('');
const playerIsReady = ref(false);
const enTranscriptData: Ref<Map<string, ArticleToken> | null> = ref(null);
const zhTranscriptData: Ref<Transcript[]> = ref([]);
const player: Ref<YT.Player | null> = ref(null);
const isTranscriptConsistent = ref(false);
const currentTime = ref(0);
const currentPlayerState = ref(PlayerState.NotStarted);
const isChineseTranscriptVisible = ref(true);
const isEnglishTranscriptVisible = ref(true);
const currentSubtitleType = ref('bilingual');
const isMouseOver = ref(false);

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
    return currentEnTranscript.filter((transcript) => transcript !== '\n');
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

watch(isMouseOver, (value) => {
  if (!value && isStylishReaderShowUp() !== 'block') {
    player.value?.playVideo();
  }
});

function isStylishReaderShowUp() {
  const floatingPanel = document.getElementById('stylish-reader-translation-panel-shadow-root');
  if (floatingPanel?.style.display === 'none' && !isMouseOver.value) {
    player.value?.playVideo();
  }
  return floatingPanel?.style.display;
}

function handleCurrentTranscriptMouseLeave() {
  isMouseOver.value = false;
  // if (isStylishReaderShowUp() !== 'block') {
  //   player.value?.playVideo();
  // }
}

function handleCurrentTranscriptMouseOver() {
  isMouseOver.value = true;
  player.value?.pauseVideo();
}

function goToCertainTime(item: any) {
  const startTime = item.split('-')[0];
  player.value?.seekTo(startTime / 1000, true);
}

function goHome() {
  router.push('/center/index');
}

function handleSwitchSubtitle() {
  switch (currentSubtitleType.value) {
    case 'bilingual':
      isChineseTranscriptVisible.value = true;
      isEnglishTranscriptVisible.value = true;
      break;
    case 'chinese':
      isChineseTranscriptVisible.value = true;
      isEnglishTranscriptVisible.value = false;
      break;
    case 'english':
      isChineseTranscriptVisible.value = false;
      isEnglishTranscriptVisible.value = true;
      break;
    default:
      break;
  }
}

function generatePdfHandler() {
  router.push(`/pdf/${youtubeId.value}`);
}

function playPauseVideo(): void {
  if (
    player.value &&
    [PlayerState.Paused, PlayerState.NotStarted, PlayerState.Ended].includes(
      currentPlayerState.value
    )
  ) {
    player.value.playVideo();
  }
  if (player.value && currentPlayerState.value === PlayerState.Playing) {
    player.value.pauseVideo();
  }
}

function seekAhead(): void {
  if (player.value) {
    player.value.seekTo(currentTime.value + 10, true);
  }
}

function seekBack(): void {
  if (player.value) {
    player.value.seekTo(currentTime.value - 10, true);
  }
}

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
  try {
    player.value = new YT.Player('player', {
      height: '100%',
      width: '99%',
      border: 'none',
      videoId,
      playerVars: { controls: 1, modestbranding: 0, iv_load_policy: 3 },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function getArticleTokenDetail(youtubeVideoId: string) {
  const at = await httpRequest.post('/articletoken/detail', { youtubeVideoId });
  return at;
}

async function generateTranscriptData(youtubeVideoId: string) {
  const t = await getArticleTokenDetail(youtubeVideoId);
  enTranscriptData.value = new Map(Object.entries(t.data.data.tokens));
}

function sendMessageToStylishReaderGeneralUtils(message: any) {
  const event = new CustomEvent('officialWebsiteYouTubeVideoPageReady', {
    detail: JSON.stringify(message),
    bubbles: true,
    composed: true
  });
  document.dispatchEvent(event);
}

onMounted(async () => {
  youtubeId.value = route.params.youtubeId as string;
  createScriptTag();
  setTimeout(() => {
    initializeVideo(youtubeId.value);
  }, 800);
  iframeSrc.value = `${preFixUrl}/${youtubeId.value}`;
  await generateTranscriptData(youtubeId.value);
  await getYoutubeVideoDetail(youtubeId.value);
  // 在这里通知 stylish reader 插件内容已经准备好了，重新进行 dom 遍历
  sendMessageToStylishReaderGeneralUtils({ type: 'official-website-youtube-video-ready' });
});
</script>
