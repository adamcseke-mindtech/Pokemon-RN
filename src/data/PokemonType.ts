export type PokemonTypes = {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonType[];
}

export type PokemonType = {
    name: string;
    url: string;
}

