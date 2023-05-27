import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { videoApi } from './services/videoapi'
import storage from 'redux-persist/lib/storage'
import { persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist'
import { authReducer } from './reducers/authSlice'
import { authenticationApi } from './services/authenticationApi'

  const persistConfig = {
    key: 'root',
    storage,
    blacklist:[videoApi.reducerPath,authenticationApi.reducerPath]
  
  }

  export const rootReducers = combineReducers({
    auth:authReducer,
    [videoApi.reducerPath]: videoApi.reducer,
    [authenticationApi.reducerPath]:authenticationApi.reducer
  })

  const persistedReducer = persistReducer(persistConfig, rootReducers)

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([videoApi.middleware,authenticationApi.middleware]),
  })