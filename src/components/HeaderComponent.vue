<template>
  <header
    class="h-[64px] fixed w-full bg-white shadow-sm shadow-slate-200"
    v-if="isHeaderFooterVisible"
  >
    <div
      class="max-w-screen-xl px-5 py-3 m-auto grid top-0 grid-rows-1 lg:grid-cols-[150px_1fr_150px] h-full grid-cols-3"
    >
      <div class="lg:hidden"></div>
      <div
        @click="router.push('/')"
        class="cursor-pointer flex flex-row justify-start items-center mx-auto"
      >
        <img src="@/assets/images/logo.svg" alt="" srcset="" class="h-full" />
      </div>
      <div class="hidden lg:block">
        <ul class="flex justify-center flex-row h-full items-center text-gray-950">
          <li class="px-6 cursor-pointer hover:text-pink-600"><a href="#about">简介</a></li>
          <li class="px-6 cursor-pointer hover:text-pink-600"><a href="#feature">功能</a></li>
          <li class="px-6 cursor-pointer hover:text-pink-600"><a href="#pricing">支持与鼓励</a></li>
          <li class="px-6 cursor-pointer hover:text-pink-600">
            <a href="https://doc.stylishreader.com">查看文档</a>
          </li>
          <li class="px-6 cursor-pointer hover:text-pink-600">
            <a href="#testimonial">联系我吧</a>
          </li>
        </ul>
      </div>
      <div class="hidden bg--300 lg:flex justify-end items-center">
        <button
          v-if="isLogin"
          @click="logout"
          class="px-4 py-1 border-pink-600 border-2 rounded-md text-pink-600 active:shadow-sm active:shadow-slate-400"
        >
          退出登录
        </button>
        <button
          v-else
          @click="goToPersonalCenter"
          class="px-4 py-1 border-pink-600 border-2 rounded-md text-pink-600 active:shadow-sm active:shadow-slate-400"
        >
          免费使用
        </button>
      </div>
      <div class="lg:hidden"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useStylishStore } from '@/stores/stylish';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  isHeaderFooterVisible: Boolean
});

const router = useRouter();

const { setLoginState, getLoginState } = useStylishStore();

const isLogin = computed(() => getLoginState());

function goToPersonalCenter() {
  router.push('/center');
}

function logout() {
  localStorage.removeItem('token');
  setLoginState(false);
  router.push('/');
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

onMounted(() => {
  if (localStorage.getItem('token') !== null) {
    setLoginState(true);
  }
});
</script>
