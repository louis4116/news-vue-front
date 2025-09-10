import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import serverInstance from '@/util/request'

type UserType = {
  avatar: string
  email: string
  name: string
  news: {
    _id: string
    img: string
    date: string
    source: string
    storedDate: string
    title: string
    url: string
  }[]
  _id: string
}

export const useAuthStore = defineStore('auth', () => {
  const authToken = ref<string | null>(null)
  const signInStatus = ref<boolean>(false)
  const userData = ref<UserType | null>(null)

  const status = localStorage.getItem('login-token')
  if (status) {
    signInStatus.value = true
  } else {
    signInStatus.value = false
  }
  async function signUp(data: any) {
    const result = await serverInstance({
      url: 'user/register',
      method: 'post',
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      },
    })
    return result
  }

  async function signIn(data: any) {
    const result = await serverInstance({
      url: 'user/login',
      method: 'post',
      data: {
        email: data.email,
        password: data.password,
      },
    })
    return result
  }

  async function signOut() {
    localStorage.removeItem('login-token')
    signInStatus.value = false
  }

  async function resetPassword({
    id,
    oldPassword,
    newPassword,
  }: {
    id: string
    oldPassword: string
    newPassword: string
  }) {
    const status = localStorage.getItem('login-token')
    const result = await serverInstance({
      url: `user/loginUserReset/${id}`,
      method: 'patch',
      data: {
        oldPassword,
        newPassword,
      },
    })
    return result
  }

  async function getMe() {
    const status = localStorage.getItem('login-token')
    if (!status) return
    const result = await serverInstance({
      url: 'user/me',
      method: 'get',
    })
    userData.value = result.data
  }

  async function updateAvatar({ id, avatar }: { id: string; avatar: string }) {
    const status = localStorage.getItem('login-token')
    const result = await serverInstance({
      url: `user/uploadImg/${id}`,
      method: 'patch',
      data: {
        status,
        avatar,
      },
    })
    return result
  }

  async function resetEmail(email: string) {
    const result = await serverInstance({
      url: 'user/forgetPassword',
      method: 'post',
      data: {
        email,
      },
    })
    return result
  }

  return {
    authToken,
    signInStatus,
    userData,
    signUp,
    signIn,
    signOut,
    resetEmail,
    resetPassword,
    getMe,
    updateAvatar,
  }
})
