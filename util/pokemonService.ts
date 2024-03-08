import { Pokemon } from '../src/data/Pokemon';
import { PokemonTypes } from '../src/data/PokemonType';
import axios from 'axios'

let rootUrl = 'https://pokeapi.co/api/v2/'

export async function fetchPokemonTypes(): Promise<PokemonTypes> {
    const response = await axios.get(`${rootUrl}type`);
    const data = response.data;

    const pokemonTypes: PokemonTypes = {
        count: data.count,
        next: data.next,
        previous: data.previous,
        results: data.results
    };

    return pokemonTypes;
}

export async function fetchPokemons(type: string): Promise<Pokemon[]> {
    const response = await axios.get(`${rootUrl}type/${type}`);
    const data = response.data.pokemon;

    const pokemons = data.map((pokemonEntry: { pokemon: { name: string, url: string } }) => {
        const urlParts = pokemonEntry.pokemon.url.split('/');
        const id = urlParts[urlParts.length - 2];

        const pokemonObj: Pokemon = {
            id,
            name: pokemonEntry.pokemon.name,
            type,
            status: false
        };

        return pokemonObj;
    });

    return pokemons;
}