import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/authStore'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/HomeView.vue'),
  },
  {
    path: '/news/:id',
    name: 'news',
    component: () => import('@/views/news/NewsView.vue'),
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('@/views/sign/SignView.vue'),
    beforeEnter: () => {
      const authSt = useAuthStore()
      if (authSt.signInStatus) {
        alert('已經登入!!')
        return { name: 'home' }
      }
    },
  },
  {
    path: '/profile',
    component: () => import('@/views/profile/ProfileView.vue'),
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('@/views/profile/inf/ProfileInfView.vue'),
      },
      {
        path: 'profileNews',
        name: 'profileNews',
        component: () => import('@/views/profile/news/ProfileNewsView.vue'),
      },
    ],
    beforeEnter: () => {
      const authStore = useAuthStore()
      if (!authStore.signInStatus) {
        alert('請先登入!!')
        return { name: 'home' }
      }
    },
  },
  {
    path: '/signout',
    name: 'signout',
    component: () => import('@/views/sign/SignOutView.vue'),
    beforeEnter: () => {
      const authSt = useAuthStore()
      if (!authSt.signInStatus) {
        alert('請先登入!!')
        return { name: 'home' }
      }
    },
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/forget/ForgetView.vue'),
  },
  {
    path: '/resetPassword/:id',
    name: 'reset',
    component: () => import('@/views/reset/ResetView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
