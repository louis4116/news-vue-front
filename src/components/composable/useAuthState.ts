import { ref } from 'vue'

export function useAuthState() {
  const loginStatus = ref(false)
  const status = localStorage.getItem('login-token')
  loginStatus.value = true
  if (!status) {
    loginStatus.value = false
  } else {
    loginStatus.value = true
  }

  return { loginStatus }
}
