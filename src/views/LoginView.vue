<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="../assets//images/stylish-reader.svg"
        alt="Your Company"
      />
      <h2
        v-if="isLogin"
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Sign in to <span class="text-pink-600">Stylish Reader</span>
      </h2>
      <h2
        v-else
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Join <span class="text-pink-600">Stylish Reader</span>
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Username</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required="true"
              v-model="username"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <!-- <div class="text-sm">
              <a href="#" class="font-semibold text-pink-600 hover:text-pink-500"
                >Forgot password?</a
              >
            </div> -->
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required="true"
              v-model="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            @click="handleSubmit"
            class="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
          >
            <span v-if="isLogin">Sign in</span>
            <span v-else>Register</span>
          </button>
        </div>
      </form>

      <p v-if="isLogin" class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <a
          @click="switchCondition"
          href="#"
          class="font-semibold leading-6 text-pink-600 hover:text-pink-500"
          >Join us now!</a
        >
      </p>
      <p v-else class="mt-10 text-center text-sm text-gray-500">
        Can not wait?
        {{ ' ' }}
        <a
          @click="switchCondition"
          href="#"
          class="font-semibold leading-6 text-pink-600 hover:text-pink-500"
          >Login!</a
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loginUrl, registerUrl } from '@/constants';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { httpRequest } from '../utils/requestUtils';
const username = ref('');
const password = ref('');
const router = useRouter();
const isLogin = ref(true);

async function login() {
  const r = await httpRequest.post(loginUrl, {
    username: username.value,
    password: password.value
  });
  if (r.data.code === 200) {
    localStorage.setItem('token', r.data.data.token);
    router.push('/');
  } else {
    alert(r.data.msg);
  }
}

async function register() {
  const r = await httpRequest.post(registerUrl, {
    username: username.value,
    password: password.value,
    ignore: true,
    source: 'stylish-web'
  });
  if (r.data.code === 200) {
    alert('Register Success.');
    isLogin.value = true;
  } else {
    alert(r.data.msg);
  }
}

async function handleSubmit(event: any) {
  event.preventDefault();
  isLogin.value ? await login() : await register();
}

function switchCondition() {
  isLogin.value = !isLogin.value;
}

onMounted(() => {
  localStorage.removeItem('token');
});
</script>
