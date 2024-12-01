import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/test', name: 'Test', component: () => import('@/views/TestView.vue') },
    {
      path: '/',
      name: 'Stylish Reader',
      meta: { showHeader: true, title: 'Stylish Reader | 首页' },
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
          meta: { showHeader: true, title: '个人中心' },
          component: () => import('@/views/personalCenter/personalCenterIndex.vue')
        },
        {
          path: 'business',
          name: '商务英语',
          meta: { showHeader: true, title: '商务英语' },
          component: () => import('@/views/personalCenter/personalCenterBusinessEnglish.vue')
        }
      ]
    },
    {
      path: '/english/:articleId',
      name: '商务英语学习',
      meta: { showHeader: false, title: '商务英语学习' },
      component: () => import('@/views/personalCenter/businessEnglish.vue')
    },
    {
      path: '/youtuber/:youtubeId',
      name: 'YouTube 视频',
      meta: { showHeader: false, title: 'YouTube 视频' },
      component: () => import('@/views/YoutubeView.vue')
    },

    {
      path: '/login',
      name: 'login',
      meta: { showHeader: false, title: '登录' },
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/pdf/:youtubeId',
      meta: { showHeader: false, title: '导出PDF' },
      name: '导出PDF',
      component: () => import('@/views/ExportPdf.vue')
    }
  ]
});

router.beforeEach((guard) => {
  if (guard.meta.title && typeof guard.meta.title === 'string') {
    document.title = guard.meta.title;
  }
});

export default router;
