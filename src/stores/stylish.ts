import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStylishStore = defineStore('stylish', () => {
  const count = ref(0);
  const _isLogin = ref(false);

  const isLogin = computed({
    get(): boolean {
      return _isLogin.value;
    },
    set(value: boolean) {
      _isLogin.value = value;
    }
  });

  return { count, isLogin };
});
