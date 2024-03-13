import { Pokemon } from '../src/data/Pokemon';
import { PokemonTypes } from '../src/data/PokemonType';
import { PokemonDetails } from '../src/data/PokemonDetails';
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

export async function fetchPokemon(pokemonName: string): Promise<PokemonDetails> {
    try {
        const response = await axios.get(`${rootUrl}pokemon/${pokemonName}`);
        const data = response.data;
        const pokemonObj: PokemonDetails = {
            id: data.id,
            name: data.name,
            weight: data.weight,
            height: data.height,
            abilities: data.abilities,
            species: data.species,
            sprites: data.sprites,
            types: data.types,
        };

        return pokemonObj;
    } catch (error) {
        console.error("Failed to fetch pokemon:", error);
        throw new Error("Failed to fetch pokemon details");
    }
}