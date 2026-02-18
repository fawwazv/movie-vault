'use client';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { Clapperboard, Heart, Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const watchlistCount = useStore((state) => state.watchlist.length);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek navbar berubah warna saat di-scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/80 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-purple-500 font-extrabold text-2xl tracking-tighter">
          <Clapperboard size={32} />
          <span>MOVIE<span className="text-white">VAULT</span></span>
        </Link>

        {/* Menu & Icons */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="text-sm font-medium hover:text-purple-400 transition hidden sm:block">Home</Link>
          
          {/* Tombol Watchlist dengan Badge Zustand */}
          <Link href="/watchlist" className="relative p-2 hover:bg-white/10 rounded-full transition group">
            <Heart size={24} className="group-hover:text-red-500 transition-colors" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {watchlistCount}
              </span>
            )}
          </Link>

          {/* Icon Search (Placeholder untuk fitur CSR selanjutnya) */}
          <button className="p-2 hover:bg-white/10 rounded-full transition">
            <Search size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}