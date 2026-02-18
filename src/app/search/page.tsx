'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MovieCard from '@/components/MovieCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchSearch = async () => {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
      );
      const data = await res.json();
      setMovies(data.results || []);
      setLoading(false);
    };

    fetchSearch();
  }, [query]);

  return (
    <div className="container mx-auto px-6 pt-32 pb-20">
      <h1 className="text-3xl font-bold mb-8">
        Hasil pencarian untuk: <span className="text-purple-500">"{query}"</span>
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.length > 0 ? (
            movies.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="col-span-full text-gray-500">Film tidak ditemukan.</p>
          )}
        </div>
      )}
    </div>
  );
}

// Next.js mewajibkan penggunaan Suspense untuk useSearchParams di Client Component
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-white">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}