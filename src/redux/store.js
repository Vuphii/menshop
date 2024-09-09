import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlide'
import userReducer from './slides/useSlide';
import orderReducer from './slides/orderSlide';
import productReducer from './slides/productSlide';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['counter', 'product', 'user'], // blacklist specific slices from being persisted.
}

const rootReducer = combineReducers({
  counter: counterReducer,
  product: productReducer,
  user: userReducer,
  order: orderReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:  persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export let persistor = persistStore(store)


