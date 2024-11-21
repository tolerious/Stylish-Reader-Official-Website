import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/test', name: 'Test', component: () => import('@/views/TestView.vue') },
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
          path: 'index',
          name: '个人中心',
          component: () => import('@/views/personalCenter/personalCenterIndex.vue')
        },
        {
          path: 'business',
          name: '商务英语',
          component: () => import('@/views/personalCenter/personalCenterBusinessEnglish.vue')
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
  if (guard.name && typeof guard.name === 'string') {
    document.title = guard.name;
  }
});

export default router;
