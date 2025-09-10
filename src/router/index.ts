import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import NewsView from '@/views/news/NewsView.vue'
import SignView from '@/views/sign/SignView.vue'
import ProfileView from '@/views/profile/ProfileView.vue'
import ProfileInfView from '@/views/profile/inf/ProfileInfView.vue'
import ProfileNewsView from '@/views/profile/news/ProfileNewsView.vue'
import SignOutView from '@/views/sign/SignOutView.vue'
import ForgetView from '@/views/forget/ForgetView.vue'
import ResetView from '@/views/reset/ResetView.vue'

import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/news/:id',
      name: 'news',
      component: NewsView,
    },
    {
      path: '/sign',
      name: 'sign',
      component: SignView,
      beforeEnter: (to, from) => {
        const authSt = useAuthStore()
        if (authSt.signInStatus) {
          alert('已經登入!!')
          return { name: 'home' }
        }
      },
    },
    {
      path: '/profile',
      component: ProfileView,
      children: [
        {
          path: '',
          name: 'profile',
          component: ProfileInfView,
        },
        {
          path: 'profileNews',
          name: 'profileNews',
          component: ProfileNewsView,
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
      component: SignOutView,
      beforeEnter: (to, from) => {
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
      component: ForgetView,
    },
    {
      path: '/resetPassowrd/:id',
      name: 'reset',
      component: ResetView,
    },
  ],
})

export default router
