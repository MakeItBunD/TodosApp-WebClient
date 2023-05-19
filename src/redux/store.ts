import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { todosAPI } from './services/todos/todosService';

const rootReducer = combineReducers({
  [todosAPI.reducerPath]: todosAPI.reducer,
});

export const setupStore = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosAPI.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
