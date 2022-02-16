const getTotal = (reducer: (item: any) => number) => (data?: any[]) =>
  data?.reduce((r, c) => r + reducer(c), 0) || 0
export const getTotalPrice = getTotal(item => item.price * item.quantity)
export const getTotalQuantity = getTotal(item => item.quantity)

export const iterToObj = (data: Iterable<[string, any] | string>) => {
  const res: { [key: string]: any } = {}
  if (data instanceof Set) {
    for (const val of data) {
      res[val] = val
    }
  } else {
    for (const [key, val] of data) {
      res[key] = val
    }
  }
  return res
}

export const localeNumber = (num: number, locale = 'ko-KR') =>
  num.toLocaleString(locale)

export const promiseDelay = (delay = 0) => {
  let st: number | null = null
  return new Promise(resolve => {
    const step = (timestamp: number) => {
      if (!st) st = timestamp
      if (timestamp - st < delay) {
        window.requestAnimationFrame(step)
      } else {
        resolve(true)
      }
    }
    window.requestAnimationFrame(step)
  })
}

export const debounce = (cb: any, delay: number) => {
  let start = 0
  let rafIds: number[] = []

  const cancelAnims = () => {
    while (rafIds.length) {
      const id = rafIds.pop()
      window.cancelAnimationFrame(id!)
    }
  }
  const first = (args: any[], timestamp: number) => {
    start = timestamp
    const id = window.requestAnimationFrame(later.bind(null, args))
    rafIds.push(id)
  }
  const later = (args: any[], timestamp: number) => {
    if (timestamp - start >= delay) {
      start = timestamp
      cb(...args)
      return
    }
    cancelAnims()
    const id = window.requestAnimationFrame(later.bind(null, args))
    rafIds.push(id)
  }
  return (...args: any) => window.requestAnimationFrame(first.bind(null, args))
}

export const throttle = (cb: any, delay: number) => {
  let start: number | null = null
  let rafIds: number[] = []
  const cancelAnims = () => {
    while (rafIds.length) {
      const id = rafIds.pop()
      window.cancelAnimationFrame(id!)
    }
  }
  const later = (args: any[], timestamp: number) => {
    if (!start || timestamp - start >= delay) {
      cb(...args)
      start = timestamp
      return
    }
    cancelAnims()
    const id = window.requestAnimationFrame(later.bind(null, args))
    rafIds.push(id)
  }
  return (...args: any) => window.requestAnimationFrame(later.bind(null, args))
}
