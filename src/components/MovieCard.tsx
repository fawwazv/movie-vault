'use client';
import Link from 'next/link';
import { Star, Heart } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function MovieCard({ movie }: any) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStore();
  
  // Cek apakah film ini sudah ada di daftar favorit
  const isFavorite = watchlist.some((m) => m.id === movie.id);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Agar tidak pindah halaman saat klik icon hati
    if (isFavorite) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Link href={`/movie/${movie.id}`} className="group relative">
      <div className="bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-purple-500 shadow-lg">
        <div className="relative aspect-[2/3]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          
          {/* Tombol Hati (Zustand Interaction) */}
          <button 
            onClick={toggleWatchlist}
            className="absolute top-2 left-2 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors"
          >
            <Heart size={20} fill={isFavorite ? "red" : "none"} color={isFavorite ? "red" : "white"} />
          </button>

          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-yellow-500 text-xs font-bold">
            <Star size={12} fill="currentColor" />
            {movie.vote_average.toFixed(1)}
          </div>
        </div>

        <div className="p-3">
          <h3 className="text-white font-semibold text-sm truncate group-hover:text-purple-400">
            {movie.title}
          </h3>
        </div>
      </div>
    </Link>
  );
}