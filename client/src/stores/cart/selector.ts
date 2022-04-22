import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '..'

const selectCartState = (state: RootState) => state.cart

export const cartsSelector = createSelector(selectCartState, (cart) => cart.list)

export const cartCountSelector = createSelector(selectCartState, (cart) => cart.list.length)
