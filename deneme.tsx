'use client';
import { useState } from 'react';
import { searchMovies } from '@/lib/api';

export default function Home() {
  const [term, setTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!term) return;
    setLoading(true);
    const results = await searchMovies(term);
    setMovies(results);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Başlık Bölümü */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
            CineSearch
          </h1>
          <p className="text-gray-400">Sevdiğin dizileri ve filmleri saniyeler içinde bul.</p>
        </div>

        {/* Arama Barı */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-3 mb-16">
          <input 
            type="text"
            placeholder="Dizi veya film ara..."
            className="flex-1 bg-[#1a1a1a] border border-gray-800 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-lg"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button className="bg-blue-600 hover:bg-blue-700 px-10 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-blue-500/20">
            Ara
          </button>
        </form>

        {/* Yükleniyor Durumu */}
        {loading && (
          <div className="flex justify-center mt-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Film Listesi (Eski Güzel Tasarım) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {movies.map((movie: any) => (
            <div key={movie.id} className="group bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-80 w-full">
                <img src={movie.image} alt={movie.title} className="w-full h-full object-cover group-hover:opacity-60 transition-opacity" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-yellow-500 font-bold text-sm">
                  ⭐ {movie.rating}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold mb-1 truncate group-hover:text-blue-400 transition-colors">{movie.title}</h3>
                <p className="text-gray-500 text-sm mb-3">{movie.year}</p>
                <p className="text-gray-400 text-xs line-clamp-2">{movie.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}