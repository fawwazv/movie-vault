'use client';
import { useStore } from '@/store/useStore';

const genres = [
  { id: null, name: 'All' },
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 10749, name: 'Romance' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Sci-Fi' },
];

export default function GenreFilter() {
  const { selectedGenre, setSelectedGenre } = useStore();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {genres.map((genre) => (
        <button
          key={genre.id ?? 'all'}
          onClick={() => setSelectedGenre(genre.id)}
          className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
            selectedGenre === genre.id
              ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'bg-transparent border-gray-700 text-gray-400 hover:border-purple-500'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}