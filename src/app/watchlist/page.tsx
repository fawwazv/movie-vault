'use client';
import { useStore } from '@/store/useStore';
import MovieCard from '@/components/MovieCard';
import { HeartOff } from 'lucide-react';
import Link from 'next/link';

export default function WatchlistPage() {
  const { watchlist } = useStore();

  return (
    <main className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-purple-600 pl-4">
          My Watchlist
        </h1>

        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <HeartOff size={64} className="mb-4 opacity-20" />
            <p className="text-xl font-medium">Belum ada film di watchlist kamu.</p>
            <Link 
              href="/" 
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-full transition-all"
            >
              Cari Film Sekarang
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}