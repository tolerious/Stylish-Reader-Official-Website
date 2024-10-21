<template>
  <div class="p-2 text-2xl font-mono leading-9">
    <header class="text-center text-2xl">{{ articleTitle }}</header>
    <section>{{ contentString }}</section>
  </div>
</template>

<script lang="ts" setup>
import type { ArticleToken } from '@/types';
import { httpRequest } from '@/utils/requestUtils';
import type { Ref } from 'vue';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const youtubeId = ref('');

const articleTitle = ref('');

const transcripts: Ref<string[]> = ref([]);

const enTranscriptData: Ref<Map<string, ArticleToken> | null> = ref(null);

const contentString = computed(() => transcripts.value.join(' '));

async function getArticleTokenDetail(youtubeVideoId: string) {
  const at = await httpRequest.post('/articletoken/detail', { youtubeVideoId });
  return at;
}

async function getArticleDetail(articleId: string) {
  const t = await httpRequest.get(`/article/${articleId}`);
  document.title = t.data.data.title;
  articleTitle.value = t.data.data.title;
}

async function generateTranscriptData(youtubeVideoId: string) {
  const t = await getArticleTokenDetail(youtubeVideoId);
  await getArticleDetail(t.data.data.articleId);
  enTranscriptData.value = new Map(Object.entries(t.data.data.tokens));
}

function generateContent() {
  if (enTranscriptData.value === null) {
    return;
  }
  [...enTranscriptData.value].forEach((item) => {
    transcripts.value.push(item[1].originTextString);
  });
}

onMounted(async () => {
  youtubeId.value = route.params.youtubeId as string;
  await generateTranscriptData(youtubeId.value);
  generateContent();
  const phraseFloatingIcon = document.getElementById(
    'stylish-reader-phrase-floating-panel-shadow-root'
  );
  setTimeout(() => {
    if (phraseFloatingIcon) {
      phraseFloatingIcon.style.display = 'none';
    }
    window.print();
  }, 1000);
});
</script>
