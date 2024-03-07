import {combineReducers, configureStore} from '@reduxjs/toolkit';
import pokemonListSlice from '../api/pokemonListSlice';

const rootReducer = combineReducers({
  pokemonList: pokemonListSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});
export default store;
