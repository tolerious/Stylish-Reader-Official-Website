import './assets/main.css';
import 'vue3-carousel/dist/carousel.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import loadingPlugin from '@/plugins/loading';
import router from './router';

const app = createApp(App);

app.use(loadingPlugin, { visible: true });
app.use(createPinia());
app.use(router);

app.mount('#app');
