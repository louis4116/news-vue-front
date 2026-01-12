export function useDebounce<T extends unknown[]>(fn: (...args: T) => void, delay: number = 500) {
  let timer: ReturnType<typeof setTimeout>
  return (...args: T) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
