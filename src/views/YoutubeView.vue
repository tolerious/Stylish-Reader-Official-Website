<template>
  <div class="grid grid-rows-[1fr_auto] grid-cols-[1300px_1fr] h-full bg-black">
    <div class="row-span-1 col-span-1">
      <div class="h-full w-full grid grid-cols-1 grid-rows-[720px_1fr]">
        <div class="mx-auto my-0 mt-3" style="height: 720px; width: 1280px">
          <!-- <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/gWotBPtsulo?si=ACHLMpjDIuOZTZUB&amp;controls=0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe> -->
          <iframe
            width="100%"
            height="100%"
            :src="iframeSrc"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
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
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import { httpRequest } from '../utils/requestUtils';
import type { Segment, Transcript } from '@/types';

const preFixUrl = 'https://www.youtube.com/embed';
const iframeSrc = ref('');
const route = useRoute();
const youtubeId = ref('');
const enTranscriptData: Ref<Transcript[]> = ref([]);
const zhTranscriptData: Ref<Transcript[]> = ref([]);

function eventListenerFromContentScript() {
  document.addEventListener('fromYoutubeVideoContentScript', (event: any) => {
    const details = JSON.parse(event.detail);
    switch (details.type) {
      case 'subtitle':
        console.log(details.data);
        break;
      default:
        break;
    }
  });
}

function convertSegmentListToString(segments: Segment[]) {
  return segments.map((segment) => segment.utf8).join(' ');
}

async function getYoutubeVideoDetail(videoId: string): Promise<void> {
  const r = await httpRequest.get(`/article/youtube/detail/${videoId}`);
  const enData = JSON.parse(r.data.data.enTranscriptData).events;
  const zhData = JSON.parse(r.data.data.cnTranscriptData).events;
  console.log(enData);
  console.log(zhData);
  if (enData.length !== zhData.length) {
    alert('翻译文件出错，请联系管理员');
    return;
  }
  enTranscriptData.value = enData;
  zhTranscriptData.value = zhData;
}

onMounted(async () => {
  // const url =
  //   'https://www.youtube.com/api/timedtext?v=uYFtWVv5F3E&ei=jgmKZoilGfqyz7sPr--DgAo&caps=asr&opi=112496729&exp=xbt&xoaf=5&hl=zh-CN&ip=0.0.0.0&ipbits=0&expire=1720347646&sparams=ip%2Cipbits%2Cexpire%2Cv%2Cei%2Ccaps%2Copi%2Cexp%2Cxoaf&signature=E94037FB8F4DEA453DE83FA360D44ED8AF92A8E9.9F289FA965CC38C213A19B0CC061BCF376248409&key=yt8&kind=asr&lang=en&fmt=json3&xorb=2&xobt=3&xovt=3&cbr=Firefox&cbrver=127.0&c=WEB&cver=2.20240702.09.00&cplayer=UNIPLAYER&cos=Windows&cosver=10.0&cplatform=DESKTOP&tlang=zh-Hans'
  // const t = await axios.get(url)
  // console.log(t.data)
  eventListenerFromContentScript();
  console.log(route.params);
  youtubeId.value = route.params.youtubeId as string;
  iframeSrc.value = `${preFixUrl}/${youtubeId.value}`;
  getYoutubeVideoDetail(youtubeId.value);
});
</script>

<style scoped></style>
