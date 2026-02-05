interface PokemonResults {
    results: Pokemon[];
}

interface Pokemon {
    name: string;
    url: string;
}

export type { PokemonResults, Pokemon };