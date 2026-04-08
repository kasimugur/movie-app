import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';
import '@testing-library/jest-dom';


jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
  
    return <img {...props} alt={props.alt} />;
  },
}));

describe('MovieCard Bileşeni', () => {
  const mockMovie = {
    id: 1,
    title: 'Inception',
    year: '2010-07-16',
    image: 'https://via.placeholder.com/210x295',
    rating: { average: 8.8 },
    summary: '<p>Rüyalar içinde rüyalar.</p>',
  };

  it('film başlığını ve yılını doğru render eder', () => {
    render(<MovieCard movie={mockMovie} />);
    
    expect(screen.getByText('Inception')).toBeInTheDocument();
    // substring(0, 4) mantığının çalışıp çalışmadığını kontrol ediyoruz
    expect(screen.getByText('2010')).toBeInTheDocument();
  });

  it('tarih bilgisi yoksa "Tarih Yok" metnini gösterir', () => {
    const movieWithoutDate = { ...mockMovie, year: undefined };
    render(<MovieCard movie={movieWithoutDate as any} />);
    
    expect(screen.getByText('Tarih Yok')).toBeInTheDocument();
  });

  it('rating obje (average) olarak geldiğinde doğru formatta gösterir', () => {
    render(<MovieCard movie={mockMovie} />);
    // Bileşendeki .toFixed(1) kontrolü
    expect(screen.getByText('8.8')).toBeInTheDocument();
  });

  it('rating sadece number olarak geldiğinde doğru formatta gösterir', () => {
    const movieWithNumberRating = { ...mockMovie, rating: 7.56 };
    render(<MovieCard movie={movieWithNumberRating as any} />);
    
    expect(screen.getByText('7.6')).toBeInTheDocument(); // toFixed(1) yuvarlar
  });

  it('film görselini doğru alt text ile render eder', () => {
    render(<MovieCard movie={mockMovie} />);
    const image = screen.getByRole('img');
    
    expect(image).toHaveAttribute('alt', 'Inception');
    expect(image).toHaveAttribute('src', mockMovie.image);
  });

  it('summary içindeki HTML etiketlerini temizleyip temizlemediğini kontrol eder', () => {
    // Bileşenindeki cleanSummary mantığını test eder
    render(<MovieCard movie={mockMovie} />);
    
    const summaryElement = screen.getByText('Rüyalar içinde rüyalar.');
    expect(summaryElement).toBeInTheDocument();
    // İçinde <p> etiketi olmamalı, sadece düz metin olmalı
    expect(summaryElement.innerHTML).not.toContain('<p>');
  });

it('summary sadece "undefined..." ise göstermemelidir', () => {
  const movieWithBrokenSummary = {
    ...mockMovie,
    summary: 'undefined...',
  };

  render(<MovieCard movie={movieWithBrokenSummary} />);

  expect(screen.queryByText('undefined...')).not.toBeInTheDocument();
});

it('summary içinde normal metin varsa göstermelidir', () => {
  const movieWithSummary = {
    ...mockMovie,
    summary: '<p>Film özeti burada</p>',
  };

  render(<MovieCard movie={movieWithSummary} />);

  expect(screen.getByText('Film özeti burada')).toBeInTheDocument();
});
});