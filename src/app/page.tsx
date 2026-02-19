import Hero from '@/components/Hero';
import GenreFilter from '../components/GenreFilter';
import MovieList from '@/components/MovieList';

export default function Home() {
  return (
    <main className="min-h-screen bg-black pb-20">
      {/* Hero Section: Tetap menggunakan SSG untuk performa cepat */}
      <Hero />
      
      <section className="container mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <h2 className="text-2xl font-bold text-white border-l-4 border-purple-600 pl-4">
            Popular Movies
          </h2>
          
          {/* Fitur Filter Genre (CSR) */}
          <GenreFilter />
        </div>

        {/* Daftar Film dengan Skeleton Loading (CSR) */}
        <MovieList />
      </section>
    </main>
  );
}