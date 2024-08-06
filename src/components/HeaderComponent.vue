<template>
  <header
    class="h-16 fixed w-full bg-white shadow-sm shadow-slate-200"
    v-if="isHeaderFooterVisible"
  >
    <div class="max-w-screen-xl px-5 py-3 m-auto grid top-0 grid-rows-1 grid-cols-4 h-full">
      <div
        @click="router.push('/')"
        class="cursor-pointer flex flex-row justify-start items-center"
      >
        <img src="@/assets/images/logo.svg" alt="" srcset="" />
      </div>
      <div class="col-span-2">
        <ul class="flex justify-center flex-row h-full items-center text-gray-950">
          <li class="px-6 cursor-pointer hover:text-pink-600"><a href="#about">About</a></li>
          <li class="px-6 cursor-pointer hover:text-pink-600"><a href="#feature">Feature</a></li>
          <li class="px-6 cursor-pointer hover:text-pink-600"><a href="#pricing">Pricing</a></li>
          <li class="px-6 cursor-pointer hover:text-pink-600">
            <a href="#testimonial">Testimonial</a>
          </li>
        </ul>
      </div>
      <div class="bg--300 flex justify-end items-center">
        <button
          v-if="isLogin"
          @click="logout"
          class="px-4 py-1 border-pink-600 border-2 rounded-md text-pink-600 active:shadow-sm active:shadow-slate-400"
        >
          Logout
        </button>
        <button
          v-else
          @click="goToPersonalCenter"
          class="px-4 py-1 border-pink-600 border-2 rounded-md text-pink-600 active:shadow-sm active:shadow-slate-400"
        >
          Try for free!
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useStylishStore } from '@/stores/stylish';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  isHeaderFooterVisible: Boolean
});

const router = useRouter();

const { isLogin } = storeToRefs(useStylishStore());

function goToPersonalCenter() {
  router.push('/center');
}

function logout() {
  localStorage.removeItem('token');
  isLogin.value = false;
  location.reload();
}

onMounted(() => {});
</script>
