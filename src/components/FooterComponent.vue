<template>
  <footer
    v-if="isHeaderFooterVisible"
    style="height: 50px"
    class="flex items-center justify-around"
  >
    <div class="text-slate-900">
      <a href="https://beian.miit.gov.cn/" target="_blank">沪ICP备18005507号-12</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps({
  isHeaderFooterVisible: Boolean
});
</script>
