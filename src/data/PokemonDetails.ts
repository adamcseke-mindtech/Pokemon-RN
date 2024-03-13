export type PokemonDetails = {
    abilities: Ability[];
    height: number;
    id: string;
    name: string;
    species: Species;
    sprites: Sprites;
    types: TypeElement[];
    weight: number;
}

export type Ability = {
    ability: Species;
    isHidden: boolean;
    slot: number;
}

export type Species = {
    name: string;
    url: string;
}

export type Sprites = {
    other: Other;
}

export type OfficialArtwork = {
    front_default: string;
    front_shiny: string;
}


export type Other = {
    "official-artwork": OfficialArtwork;
}

export type TypeElement = {
    slot: number;
    type: Species;
}

