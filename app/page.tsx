'use client';
import { Movie } from '@/types';
import { useEffect, useState } from 'react';
import SearchBox from './components/SearchBox';
import MovieCard from './components/MovieCard';
import { searchMovies } from '@/lib/api';
export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  

  const handleSearch = async (query: string) => {
    setLoading(true);
    setHasSearched(true);
    const results = await searchMovies(query);
    console.log(results)
    setMovies(results)
    setTimeout(() => {
      
      console.log(movies.map(e => e.year))
      setLoading(false);
    }, 800);
    console.log(movies)
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