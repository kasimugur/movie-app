export interface Movie {
  id: number;
  title: string;
  image: string;
  year: string;
  rating: number | { average: number | null };
  summary: string;
}