// src/components/Hero.tsx
export default async function Hero() {
  // Ambil data trending movie dari API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { next: { revalidate: 3600 } } // SSG: Data akan diperbarui setiap 1 jam
  );
  const data = await res.json();
  
  // Ambil film pertama dari hasil list trending
  const movie = data.results[0];

  return (
    <div className="relative h-[70vh] w-full flex items-end">
      {/* Gambar Background Hero */}
      <div className="absolute inset-0 z-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay gradasi agar teks mudah dibaca dan UI terlihat dinamis */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Konten Teks */}
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
          {movie.title}
        </h1>
        <p className="max-w-2xl text-lg text-gray-200 line-clamp-3 mb-6 drop-shadow-md">
          {movie.overview}
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:scale-105 active:scale-95">
          View Detail
        </button>
      </div>
    </div>
  );
}