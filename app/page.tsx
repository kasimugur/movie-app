'use client';
import { Movie } from '@/types';
import { useEffect, useState } from 'react';
import SearchBox from './components/SearchBox';
import MovieCard from './components/MovieCard';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {

  }, [])
  // API bağlantısı kurulana kadar UI testi için sahte arama fonksiyonu
  const handleSearch = (query: string) => {
    setLoading(true);
    setHasSearched(true);

    setTimeout(() => {
      setMovies([
        { id: 1, title: `${query} Başlıyor`, poster_path: '', release_date: '2026-05-12', vote_average: 8.8 },
        { id: 2, title: `${query} Geri Döndü`, poster_path: '', release_date: '2024-11-23', vote_average: 7.5 },
        { id: 3, title: `${query} İntikam`, poster_path: '', release_date: '2022-02-14', vote_average: 9.2 },
        { id: 4, title: `${query} Son Umut`, poster_path: '', release_date: '2025-08-30', vote_average: 6.4 },
      ]);
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-16 font-sans">
      <div className="mx-auto max-w-7xl">

        {/* Header Alanı */}
        <div className={`transition-all duration-700 ${hasSearched ? 'mb-12 mt-0' : 'mb-12 mt-32'}`}>
          <div className="text-center">
            <h1 className="mb-4 text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              CineSearch
            </h1>
            <p className="text-lg text-gray-400 mb-8">
              Milyonlarca film. İstediğini bul ve keşfetmeye başla.
            </p>
            <SearchBox onSearch={handleSearch} />
          </div>
        </div>

        {/* Sonuç Alanı */}
        {loading ? (
          <div className="mt-20 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-purple-500"></div>
          </div>
        ) : (
          hasSearched && (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-in fade-in slide-in-from-bottom-10 duration-500">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )
        )}
      </div>
    </main>
  );
}