'use client';
import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import MovieCard from './MovieCard';
import SkeletonCard from './skeletonCard';

export default function MovieList() {
  const { selectedGenre } = useStore();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Menggunakan API Key dari environment variable
        const url = selectedGenre 
          ? `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${selectedGenre}`
          : `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Gagal mengambil data film:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedGenre]);


  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
        {[...Array(10)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
      {movies.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}