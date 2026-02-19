'use client';
import { RefreshCcw } from 'lucide-react';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Ups! Terjadi kesalahan koneksi.</h2>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full transition"
      >
        <RefreshCcw size={18} /> Coba Lagi
      </button>
    </div>
  );
}