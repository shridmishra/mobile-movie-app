import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

const MovieCard = ({ id, imdbID, poster_path, title, vote_average, release_date, }: Movie) => {
    // Use imdbID for navigation if available, otherwise fall back to id
    const movieId = imdbID || id;
    
    // poster_path is now a full URL from OMDb, or a path from TMDB
    const posterUrl = poster_path 
        ? (poster_path.startsWith('http') ? poster_path : `https://image.tmdb.org/t/p/w500/${poster_path}`)
        : `https://placehold.co/600x400/1a1a1a/ffffff.png`;
    
    return (
        <Link href={`/movie/${movieId}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image source={{ uri: posterUrl }}
                    className='w-full h-52 rounded-lg'
                    resizeMode='cover'
                    />
                    <Text className='text-white font-sm mt-2 font-bold' numberOfLines={1}>{title}</Text> 
            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard