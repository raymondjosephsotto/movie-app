export interface BaseMedia {
    id: number;
    backdrop_path: string;
    poster_path: string;
    overview: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    genre_ids: number[];
    original_language: string;
}

export interface Movie extends BaseMedia {
    type: 'movie'; // Discriminator
    title: string;
    release_date: string;
    original_title: string;
}

export interface TVShow extends BaseMedia {
    type: 'tv'; // Discriminator
    name: string;
    first_air_date: string;
    original_name: string;
    origin_country: string[];
}

// Union Type with Discriminator
export type Media = Movie | TVShow;