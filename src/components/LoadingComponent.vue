<template>
  <div
    v-if="visible"
    class="fixed h-full w-full top-0 left-0 opacity-70 bg-gray-300 flex items-center justify-around"
  >
    <img src="@/assets/images/loadingIcon.svg" class="animate-spin" style="height: 45px" alt="" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});
</script>
