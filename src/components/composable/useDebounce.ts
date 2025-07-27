export function useDebounce<T extends (...args: any) => any>(fn: T, delay: number = 500) {
  let timer: any
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
