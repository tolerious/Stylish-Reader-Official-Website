import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useStylishStore = defineStore('stylish', () => {
  const count = ref(0);
  const _isLogin = ref(false);

  const isLogin = computed({
    get(): boolean {
      const token = localStorage.getItem('token');
      if (token || _isLogin.value) {
        return true;
      }
      return false;
    },
    set(value: boolean) {
      _isLogin.value = value;
    }
  });

  function getLoginState(): boolean {
    const token = localStorage.getItem('token');
    if (token || _isLogin.value) {
      return true;
    }
    return false;
  }

  function setLoginState(flag: boolean): void {
    _isLogin.value = flag;
  }

  return { count, isLogin, setLoginState, getLoginState };
});
