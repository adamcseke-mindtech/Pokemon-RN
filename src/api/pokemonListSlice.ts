import {createSlice} from '@reduxjs/toolkit';

export type Pokemon = {
  name: string;
};

export type PokemonListState = {
  users: Pokemon[];
  loading: boolean;
  error: boolean;
};

const initialState: PokemonListState = {
  users: [],
  loading: false,
  error: false,
};

const pokemonListSlice = createSlice({
  name: 'pokemonList',
  initialState: initialState,
  reducers: {},
});

export default pokemonListSlice.reducer;
