import { ref } from 'vue'

export function useWindowWidth() {
  const windowWidth = ref(window.innerWidth)
  const windowHeight = ref(window.innerHeight)
  window.addEventListener('resize', function () {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  })
  return { windowWidth, windowHeight }
}
