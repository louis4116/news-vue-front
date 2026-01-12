import { ref } from 'vue'
import { defineStore } from 'pinia'
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

  signInStatus.value = localStorage.getItem('login-token') !== null
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
    const result = await serverInstance({
      url: 'user/me',
      method: 'get',
    })
    userData.value = result.data
  }

  async function updateAvatar({ id, avatar }: { id: string; avatar: string }) {
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

  async function unLoginResetPassword(id: string, password: string) {
    const result = await serverInstance({
      url: `user/resetPassword/${id}`,
      method: 'patch',
      data: {
        password,
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
    unLoginResetPassword,
  }
})
