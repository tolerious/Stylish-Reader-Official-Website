import { provide, ref } from 'vue';

export function useHeader() {
  const headerIsVisible = ref(true);

  function showHeader() {
    headerIsVisible.value = true;
  }

  function hideHeader() {
    console.log('....');
    headerIsVisible.value = false;

    console.log(headerIsVisible.value);
  }

  provide('isHeaderVisible', headerIsVisible.value);

  return { headerIsVisible, showHeader, hideHeader };
}
