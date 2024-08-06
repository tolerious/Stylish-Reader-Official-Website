import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/center',
      name: 'personalCenter',
      component: () => import('@/views/PersonalCenterView.vue')
    },
    {
      path: '/youtube/:youtubeId',
      name: 'youtube',
      component: () => import('@/views/YoutubeView.vue')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('@/views/LoadingView.vue')
    },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') }
  ]
});

export default router;
