function debounce<T>(
  // eslint-disable-next-line
  func: (...args: any[]) => T,
  wait: number,
): (...args: Parameters<typeof func>) => Promise<T> {
  let timeoutId: NodeJS.Timeout

  return function (...args: Parameters<typeof func>): Promise<T> {
    return new Promise((resolve) => {
      clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        const result = func(...args)
        resolve(result)
      }, wait)
    })
  }
}

export default debounce
