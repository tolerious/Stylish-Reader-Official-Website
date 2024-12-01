import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/test', name: 'Test', component: () => import('@/views/TestView.vue') },
    {
      path: '/',
      name: 'Stylish Reader',
      meta: { showHeader: true },
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
          meta: { showHeader: true },
          component: () => import('@/views/personalCenter/personalCenterIndex.vue')
        },
        {
          path: 'business',
          name: '商务英语',
          meta: { showHeader: true },
          component: () => import('@/views/personalCenter/personalCenterBusinessEnglish.vue')
        }
      ]
    },
    {
      path: '/english/:articleId',
      name: '商务英语学习',
      meta: { showHeader: false },
      component: () => import('@/views/personalCenter/businessEnglish.vue')
    },
    {
      path: '/youtuber/:youtubeId',
      name: 'YouTube 视频',
      component: () => import('@/views/YoutubeView.vue')
    },

    {
      path: '/login',
      name: 'login',
      meta: { showHeader: false },
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/pdf/:youtubeId',
      meta: { showHeader: false },
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
