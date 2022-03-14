import { test, expect } from 'vitest'
import * as utils from './utils'

test('getTotalPrice, getTotalQuantity', () => {
  const items = [
    { product: { price: 1000 }, quantity: 3 },
    { product: { price: 2000 }, quantity: 1 },
    { product: { price: 1500 }, quantity: 0 },
    { product: { price: 500 }, quantity: 5 },
  ]
  expect(utils.getTotalPrice(items)).toBe(3000 + 2000 + 2500)
  expect(utils.getTotalQuantity(items)).toBe(9)
})

test('iterToObj', () => {
  const data: {
    iter: Iterable<[string, any] | string>
    expected: { [key: string]: any }
  }[] = [
    {
      iter: new Map([
        ['a', 1],
        ['b', 2],
      ]),
      expected: { a: 1, b: 2 },
    },
    {
      iter: [
        ['a', 1],
        ['b', 2],
      ],
      expected: { a: 1, b: 2 },
    },
    {
      iter: new Set(['a', 'b']),
      expected: { a: 'a', b: 'b' },
    },
  ]

  data.forEach(({ iter, expected }) => {
    expect(utils.iterToObj(iter)).toStrictEqual(expected)
  })
})

test('localeNumber', () => {
  const data = [
    { num: 100, expected: '100' },
    { num: 1000, expected: '1,000' },
    { num: 1000000, expected: '1,000,000' },
  ]
  data.forEach(({ num, expected }) => {
    expect(utils.localeNumber(num)).toBe(expected)
  })
})

test('promiseDelay', async () => {
  const start = performance.now()
  const res = await utils.promiseDelay(100)
  const end = performance.now()
  expect(res).toBe(true)
  expect(end - start).toBeGreaterThanOrEqual(100)
  expect(end - start).toBeLessThan(150)
})

const callWithDelay = async (handler: any, delay: number, times: number) => {
  handler()
  let count = 1
  do {
    await utils.promiseDelay(delay)
    handler()
  } while (count++ < times)
}

test('debounce', async () => {
  let count = 0
  const handler = utils.debounce(() => {
    count++
  }, 50)
  await callWithDelay(handler, 0, 3)
  expect(count).toBe(0)
  await utils.promiseDelay(50)
  expect(count).toBe(1)
})

test('throttle', async () => {
  let count = 0
  const handler = utils.throttle(() => {
    count++
  }, 50)
  await Promise.all([utils.promiseDelay(200), callWithDelay(handler, 0, 8)])
  expect(count).toBeGreaterThanOrEqual(2)
  expect(count).toBeLessThan(8)
})

test('getDateString', () => {
  expect(
    utils.getDateString({ nanoseconds: 390000000, seconds: 1645172350 }),
  ).toBe('2022. 02. 18. 오후 05:19')
})
