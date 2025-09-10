import { ref } from 'vue'
import { defineStore } from 'pinia'
import serverInstance from '@/util/request'

export const useRecaptchaStore = defineStore('recap', () => {
  async function toBakendRecap(token: string) {
    const action = 'login'
    const result = await serverInstance({
      url: '/recaptcha',
      method: 'post',
      data: {
        recaptchaToken: token,
        recaptchaAction: action,
      },
    })
    console.log(result)
  }
  return { toBakendRecap }
})
