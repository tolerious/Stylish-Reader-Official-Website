<template>
  <div container class="lg:grid lg:grid-rows-1 lg:grid-cols-[200px_1fr] h-full">
    <div class="left-bar border-r-[1px]">
      <!-- <div class="flex justify-around">
        <button
          @click="convertVideoHandler"
          class="rounded-sm bg-pink-600 px-2 py-1 text-white border-pink-600 m-2 cursor-pointer active:shadow-md active:shadow-pink-800 select-none"
        >
          转换所有视频
        </button>
      </div> -->
      <!-- <div class="flex justify-around">
        <button
          @click="navigateReciteWord"
          class="rounded-sm bg-pink-600 px-2 py-1 text-white border-pink-600 m-2 cursor-pointer active:shadow-md active:shadow-pink-800 select-none"
        >
          我要背单词
        </button>
      </div> -->
      <div
        class="border-b-slate-200 border-b-[1px] h-12 flex items-center justify-around cursor-not-allowed"
      >
        <span>Toly 您好！</span>
      </div>
      <div
        @click="handleCatalogClick(catalog)"
        v-for="catalog in catalogList"
        :key="catalog.title"
        :class="{ 'bg-pink-500 text-white': catalog.active }"
        class="border-b-slate-200 border-b-[1px] h-12 flex items-center justify-around cursor-pointer hover:bg-pink-500 hover:text-white"
      >
        <span>{{ catalog.title }}</span>
      </div>
    </div>
    <div class="flex flex-col items-center bg- p-2 max-h-full overflow-scroll">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { articleToken } from '@/constants';
import { httpRequest } from '@/utils/requestUtils';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

const route = useRoute();

const catalogList = ref([
  {
    title: 'Youtube视频',
    route: '/center/index',
    active: true
  },
  {
    title: '商务英语',
    route: '/center/business',
    active: false
  }
]);

onMounted(() => {
  console.log(route.path);
  catalogList.value.forEach((catalog, index) => {
    if (catalog.route === route.path) {
      catalogList.value[index].active = true;
    } else {
      catalogList.value[index].active = false;
    }
  });
});

function navigateReciteWord() {
  window.open('https://app.stylishreader.com');
}

async function convertVideoHandler() {
  const t = await httpRequest.get(articleToken);
  if (t.data.code === 200) {
    alert('视频转换成功');
  }
}

function handleCatalogClick(catalog: any) {
  catalogList.value.forEach((item) => {
    if (catalog.title === item.title) {
      item.active = true;
    } else {
      item.active = false;
    }
  });
  router.push(catalog.route);
}
</script>
