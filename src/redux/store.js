import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/categories/categoriesSlice'

import { setupListeners } from '@reduxjs/toolkit/query'
import { categoriesApi } from '../services/categories.js'


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(categoriesApi.middleware)
})
setupListeners(store.dispatch)
