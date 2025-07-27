import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  const routeKey = ref<number>(0)
  return { routeKey }
})
