import Hero from '@/components/Hero';
import MovieCard from '@/components/MovieCard';

export default async function Home() {
  // Fetch data film populer (Teknik SSG/ISR)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const movies = data.results;

  return (
    <main className="min-h-screen bg-black pb-20">
      <Hero />
      
      <section className="container mx-auto px-6 mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white border-l-4 border-purple-600 pl-4">
            Popular Movies
          </h2>
        </div>

        {/* Grid Responsif: 2 kolom di HP, 4 di Tablet, 5 di Laptop */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}