import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/my/list',
      name: 'myList',
      component: () => import('@/views/VideoListView.vue')
    },
    {
      path: '/youtube/:youtubeId',
      name: 'youtube',
      component: () => import('@/views/YoutubeView.vue')
    },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') }
  ]
})

export default router
