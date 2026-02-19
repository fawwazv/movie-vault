import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-6xl font-extrabold text-purple-600">404</h1>
      <p className="text-xl mt-4 mb-8">Halaman yang kamu cari tidak ditemukan.</p>
      <Link href="/" className="bg-white text-black px-6 py-2 rounded-full font-bold">
        Kembali ke Beranda
      </Link>
    </div>
  );
}