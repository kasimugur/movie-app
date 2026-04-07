export async function searchMovies(query: string) {
  // Bu API tamamen açık ve ücretsizdir, hiçbir ayar gerektirmez.
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const data = await res.json();
  
  // Gelen veriyi senin verdiğin linkteki gibi basit bir yapıya çeviriyoruz
  return data.map((item: any) => ({
    id: item.show.id,
    title: item.show.name,
    image: item.show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image',
    year: item.show.premiered?.substring(0, 4) || 'N/A',
    rating: item.show.rating?.average || '0.0'
  }));
}