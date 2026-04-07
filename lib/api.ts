export async function searchMovies(query: string) {
  // Hiçbir key gerekmez, direkt çalışır
  const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
  const data = await res.json();
  
  // Paylaştığın JSON yapısındaki iç içe geçmiş (show.name, show.image vb.) veriyi alıyoruz
  return data.map((item: any) => ({
    id: item.show.id,
    title: item.show.name,
    image: item.show.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image',
    year: item.show.premiered?.substring(0, 4) || 'N/A',
    rating: item.show.rating?.average || '0.0',
    summary: item.show.summary?.replace(/<[^>]*>/g, '').substring(0, 100) + '...' // HTML etiketlerini temizler
  }));
}