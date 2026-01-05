// OMDb API Configuration (works in India without VPN)
// Get your free API key at: https://www.omdbapi.com/apikey.aspx
export const OMDB_CONFIG = {
    BASE_URL: 'https://www.omdbapi.com',
    API_KEY: process.env.EXPO_PUBLIC_OMDB_API_KEY,
}

// Transform OMDb movie to match our Movie interface
const transformOmdbMovie = (movie: any): Movie => ({
    id: movie.imdbID?.replace('tt', '') || Math.random(),
    imdbID: movie.imdbID,
    title: movie.Title,
    adult: false,
    backdrop_path: movie.Poster !== 'N/A' ? movie.Poster : null,
    genre_ids: [],
    original_language: 'en',
    original_title: movie.Title,
    overview: movie.Plot || '',
    popularity: 0,
    poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
    release_date: movie.Year,
    video: false,
    vote_average: movie.imdbRating ? parseFloat(movie.imdbRating) : 0,
    vote_count: 0,
});

// Fetch popular/default movies (OMDb doesn't have a discover endpoint, so we search for popular terms)
const popularSearchTerms = ['avengers', 'batman', 'spider', 'star wars', 'marvel', 'action', 'comedy'];

export const fetchMovies = async ({ query }: { query: string }) => {
    const searchTerm = query || popularSearchTerms[Math.floor(Math.random() * popularSearchTerms.length)];
    
    const endpoint = `${OMDB_CONFIG.BASE_URL}/?apikey=${OMDB_CONFIG.API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie`;

    const response = await fetch(endpoint, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.Response === 'False') {
        throw new Error(data.Error || 'No movies found');
    }

    return data.Search.map(transformOmdbMovie);
};

export const fetchMovieDetails = async (id: string) => {
    const endpoint = `${OMDB_CONFIG.BASE_URL}/?apikey=${OMDB_CONFIG.API_KEY}&i=${id}&plot=full`;

    const response = await fetch(endpoint, {
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.Response === 'False') {
        throw new Error(data.Error || 'Movie not found');
    }

    return {
        id: data.imdbID,
        title: data.Title,
        overview: data.Plot,
        poster_path: data.Poster !== 'N/A' ? data.Poster : null,
        backdrop_path: data.Poster !== 'N/A' ? data.Poster : null,
        release_date: data.Released,
        vote_average: data.imdbRating ? parseFloat(data.imdbRating) : 0,
        runtime: data.Runtime,
        genres: data.Genre?.split(', ').map((g: string, i: number) => ({ id: i, name: g })) || [],
        director: data.Director,
        actors: data.Actors,
        year: data.Year,
    };
};





