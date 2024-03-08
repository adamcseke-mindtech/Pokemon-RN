import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../data/Pokemon';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type PokemonListState = {
  pokemons: Pokemon[];
  catchedPokemons: Pokemon[];
  loading: boolean;
  error: boolean;
};

const initialState: PokemonListState = {
  pokemons: [],
  catchedPokemons: [],
  loading: false,
  error: false,
};

const pokemonListSlice = createSlice({
  name: 'pokemonList',
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons = action.payload;
      state.loading = false;
      state.error = false;
    },
    setCaughtPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      action.payload.forEach(caughtPokemon => {
        const existingPokemon = state.pokemons.find(p => p.id === caughtPokemon.id);
        if (existingPokemon) {
          existingPokemon.status = true;
        } else {
          state.catchedPokemons.push(caughtPokemon);
        }
      });
    },
    catchPokemon: (state, action: PayloadAction<string>) => {
      const pokemonToCatch = state.pokemons.find(p => p.id === action.payload);
      if (pokemonToCatch) {
        pokemonToCatch.status = true
        state.catchedPokemons.push(pokemonToCatch);
        saveCaughtPokemonsToStorage(state.catchedPokemons);
      }
    },

    releasePokemon: (state, action: PayloadAction<string>) => {
      const updatedCatchedPokemons = state.catchedPokemons.filter(p => p.id !== action.payload);
      state.catchedPokemons = updatedCatchedPokemons;
      saveCaughtPokemonsToStorage(updatedCatchedPokemons);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

async function saveCaughtPokemonsToStorage(caughtPokemons: Pokemon[]) {
  console.log(caughtPokemons)
  try {
    const jsonValue = JSON.stringify(caughtPokemons);
    await AsyncStorage.setItem('caughtPokemons', jsonValue);
  } catch (e) {
    console.error("Failed to save caughtPokemons:", e);
  }
};

export const { setPokemons, setCaughtPokemons, catchPokemon, releasePokemon, setLoading } = pokemonListSlice.actions;
export default pokemonListSlice.reducer;
