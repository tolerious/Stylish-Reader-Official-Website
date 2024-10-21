import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Stylish Reader',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/center',
      name: '个人中心',
      component: () => import('@/views/PersonalCenterView.vue'),
      children: [
        {
          path: '',
          name: '个人中心',
          component: () => import('@/views/personalCenter/personalCenterIndex.vue')
        }
      ]
    },
    {
      path: '/youtuber/:youtubeId',
      name: 'YouTube 视频',
      component: () => import('@/views/YoutubeView.vue')
    },
    {
      path: '/loading',
      name: 'loading',
      component: () => import('@/views/LoadingView.vue')
    },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    {
      path: '/pdf/:youtubeId',
      name: '导出PDF',
      component: () => import('@/views/ExportPdf.vue')
    }
  ]
});

router.beforeEach((guard) => {
  console.log(guard);
  console.log(guard.name);
  if (guard.name && typeof guard.name === 'string') {
    document.title = guard.name;
  }
});

export default router;
