import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authReducer'
import { api } from './api/api'
// import { logger } from 'redux-logger'

const reducers = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})