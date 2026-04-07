'use client';
import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto max-w-2xl">
      <div className="relative flex h-14 w-full items-center overflow-hidden rounded-full bg-gray-800/50 shadow-inner backdrop-blur-md focus-within:bg-gray-800 focus-within:ring-2 focus-within:ring-purple-500 transition-all">
        <div className="grid h-full w-14 place-items-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          className="peer h-full w-full bg-transparent pr-4 text-gray-100 outline-none placeholder-gray-500"
          type="text"
          placeholder="Efsane bir film ara..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button 
          type="submit" 
          className="mr-2 h-10 rounded-full bg-purple-600 px-6 font-semibold text-white transition-colors hover:bg-purple-700 active:bg-purple-800"
        >
          Ara
        </button>
      </div>
    </form>
  );
}