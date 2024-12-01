<template>
  <div class="w-96 shadow-md shadow-slate-400 cursor-pointer">
    <div><img src="@/assets/images/business.jpg" alt="" srcset="" /></div>
    <div class="px-2">
      <div data-title class="py-2 text-xl font-bold">{{ title }}</div>
      <div data-description class="max-h-16 truncate-text">
        {{ description }}
      </div>
      <div class="flex justify-between text-slate-500 pb-1">
        <span>{{ author }}</span
        ><span>{{ createAt }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, require: true, default: '' },
  description: { type: String, require: true, default: '' },
  author: { type: String, require: true, default: '' },
  createAt: { type: String, require: true, default: '' }
});
</script>

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
