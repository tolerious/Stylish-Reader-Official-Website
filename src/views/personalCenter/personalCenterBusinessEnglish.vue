<template>
  <div class="w-full px-4">
    <div class="flex w-full my-3">
      <div class="bg-pink-500 w-1 h-6 mr-3"></div>
      <div class="font-bold text-lg">Office English</div>
    </div>
    <div class="flex justify-around">
      <div video-container class="mt-2 flex flex-wrap justify-start gap-5">
        <productVideoItem
          @click="handleClick(i)"
          v-for="i in productItemList"
          :title="i.articleId"
          :description="i.description"
          :author="i.author"
          :createAt="i.createAt"
          :key="i.title"
        ></productVideoItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import ProductVideoItem from '../../components/productVideoItem.vue';
import { useRouter } from 'vue-router';

const productItemList = reactive([
  {
    articleId: 'article-id-01',
    title: 'Business 1',
    description: 'Business number one and talk with you',
    author: 'BBC Learning English',
    createAt: '2024-10-10 21:19'
  },
  {
    articleId: 'article-id-02',
    title: 'Business 2',
    description: 'Business number one and talk with you',
    author: 'BBC Learning English',
    createAt: '2024-10-10 21:19'
  },
  {
    articleId: 'article-id-03',
    title: 'Business 3',
    description: 'Business number one and talk with you',
    author: 'BBC Learning English',
    createAt: '2024-10-10 21:19'
  },
  {
    articleId: 'article-id-04',
    title: 'Business 4',
    description: 'Business number one and talk with you',
    author: 'BBC Learning English',
    createAt: '2024-10-10 21:19'
  },
  {
    articleId: 'article-id-05',
    title: 'Business 5',
    description: 'Business number one and talk with you',
    author: 'BBC Learning English',
    createAt: '2024-10-10 21:19'
  }
]);

const router = useRouter();

onMounted(() => console.log('...'));

function handleClick(i: any) {
  router.push(`/english/${i.articleId}`);
}
</script>
