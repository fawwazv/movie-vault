import { Star, Calendar, Clock, Globe } from 'lucide-react';

// Fungsi Fetch Data (SSR)
async function getMovie(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { cache: 'no-store' } 
  );
  
  if (!res.ok) return null;
  return res.json();
}

// Perhatikan: params sekarang didefinisikan sebagai Promise
export default async function MovieDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  
  // LANGKAH KRUSIAL: Unwrapping params dengan await
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const movie = await getMovie(id);

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-xl font-semibold">Movie not found.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Backdrop */}
      <div className="relative h-[60vh] w-full">
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 -mt-40 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-10">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-64 rounded-2xl shadow-2xl border border-white/10"
          />

          <div className="flex-1 pt-10 md:pt-40">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-6 text-gray-300 mb-6">
              <span className="flex items-center gap-2 text-yellow-500">
                <Star size={20} fill="currentColor" /> {movie.vote_average.toFixed(1)}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={20} /> {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={20} /> {movie.runtime} min
              </span>
            </div>

            <p className="text-lg text-gray-400 mb-8 max-w-2xl">{movie.overview}</p>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre: any) => (
                <span key={genre.id} className="px-3 py-1 bg-purple-600/20 rounded-full text-xs border border-purple-500/30">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}