import { configureStore, combineReducers } from '@reduxjs/toolkit';
import pokemonListSlice from './pokemonListSlice';

const rootReducer = combineReducers({
  pokemonList: pokemonListSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
