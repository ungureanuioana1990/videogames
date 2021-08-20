export interface Game {
    thumbnail: string;
    title: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number;
    genres: Array<Genre>;
    platform: Array<any>;
    publishers: Array<Publishers>;
    ratings: Array<Rating>;
    screenshots: Array<Screenshots>;
    trailers: Array<Trailer>;
    id: number;
    developer: string;
    short_description: string;
}

export interface APIResponse<T> {
    results: Array<T>;
}

interface Genre {
    name: string;}

interface ParentPlatform {
    platform: {
        name: string;
        slug: string;
    };
}

interface Publishers {
    name: string;
}
interface Rating {
    id: number;
    count: number;
    title: string;
}
interface Screenshots {
    image: string;
}
interface Trailer {
    data: {
        max: string;
    };
}