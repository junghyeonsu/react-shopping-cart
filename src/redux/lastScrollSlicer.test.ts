import reducer, { saveLastScroll } from './lastScrollSlicer'

test('lastScrollSlicer', () => {
  let prevState = undefined
  expect(reducer(prevState, { type: '' })).toEqual({
    page: null,
    scroll: 0,
  })

  const nextState = {
    page: '/products/:id',
    scroll: 1000,
  } as const

  expect(reducer(prevState, saveLastScroll(nextState))).toEqual(nextState)
})
