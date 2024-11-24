<template>
  <div class="w-96 shadow-md shadow-slate-400 cursor-pointer">
    <div><img src="@/assets/images/business.jpg" alt="" srcset="" /></div>
    <div class="px-2">
      <div data-title class="py-2 text-xl font-bold">Jargon about workload</div>
      <div data-description class="max-h-16 truncate-text">
        Imagine you're at work and you have loads to do. But then someone asks if you can help with
        another task. Pippa and Phil talk about some common business jargon to help you talk about
        your workload.
      </div>
      <div class="flex justify-between text-slate-500 pb-1">
        <span>BBC Learning English</span><span>2024-12-30</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.truncate-text {
  display: -webkit-box; /* 使用 flexbox 的子集 */
  -webkit-box-orient: vertical; /* 设置为垂直方向 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  line-clamp: 2; /* 限制为两行（现代浏览器支持） */
  -webkit-line-clamp: 2; /* 限制为两行（Webkit 内核浏览器支持） */
}
</style>
