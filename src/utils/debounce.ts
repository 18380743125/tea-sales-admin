export default function debounce(fn: any, delay: number, immediate = false) {
  let timer: NodeJS.Timeout | null = null
  let isInvoke = false

  const _debounce = function (...args: any[]) {
    return new Promise((resolve, reject) => {
      try {
        // 立即执行控制
        if (immediate && !isInvoke) {
          const res = fn.apply(this, args)
          resolve(res)
          isInvoke = true
          return
        }
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
          const res = fn.apply(this, args)
          resolve(res)
          timer = null
          isInvoke = false
        }, delay)
      } catch (err) {
        reject(err)
      }
    })
  }

  // 取消
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
  }
  return _debounce
}
