import { Movie } from '@/types';
import Image from 'next/image';

export default function MovieCard({ movie }: { movie: Movie }) {
  const imageUrl = movie.image
console.log(movie.year)
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer">
      <div className="relative h-96 w-full">
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-40"
        />
      </div>

      {/* Üzerine gelince alttan beliren detay alanı */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-4 bg-gradient-to-t from-black via-black/80 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-300">
          <span className="font-medium">{movie.year?.substring(0, 4) || 'Tarih Yok'}</span>
          <span className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 backdrop-blur-sm">
            ⭐ <span className="font-bold text-yellow-400">
              {typeof movie.rating === 'number' 
                ? movie.rating.toFixed(1) 
                : (movie.rating as any)?.average?.toFixed(1) || '0.0'}</span>

          </span>
        </div>
          {movie.summary?.replace(/<[^>]*>/g, '') === 'undefined...' ? '': <p className="text-gray-400 text-xs line-clamp-2">{movie.summary?.replace(/<[^>]*>/g, '')}</p>}
          
      </div>
    </div>
  );
}