import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import auth from './igdb/igdb.reducer';
import settingsSlice from './settings/settingsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

const reducers = combineReducers({
  librarySettings: settingsSlice,
  igdbAuth: auth
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;