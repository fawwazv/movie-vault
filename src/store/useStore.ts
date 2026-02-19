import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface WatchlistState {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  // TAMBAHKAN DUA BARIS INI:
  selectedGenre: number | null;
  setSelectedGenre: (id: number | null) => void;
}

export const useStore = create<WatchlistState>()(
  persist(
    (set) => ({
      watchlist: [],
      addToWatchlist: (movie) =>
        set((state) => ({
          watchlist: state.watchlist.some((m) => m.id === movie.id)
            ? state.watchlist
            : [...state.watchlist, movie],
        })),
      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== id),
        })),
      
      selectedGenre: null,
      setSelectedGenre: (id) => set({ selectedGenre: id }),
    }),
    { name: 'movie-vault-storage' }
  )
);