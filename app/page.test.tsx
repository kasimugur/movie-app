import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/app/page';
import { searchMovies } from '@/lib/api';
import { act } from 'react-dom/test-utils';
jest.mock('@/lib/api', () => ({
  searchMovies: jest.fn(),
}));

jest.mock('./components/SearchBox', () => {
  return function MockSearchBox({ onSearch }: { onSearch: (query: string) => void }) {
    return (
      <button onClick={() => onSearch('Batman')}>
        Search Batman
      </button>
    );
  };
});

jest.mock('./components/MovieCard', () => {
  return function MockMovieCard({ movie }: any) {
    return <div>{movie.title}</div>;
  };
});

describe('Home Page', () => {
  const mockedSearchMovies = searchMovies as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('sayfa açıldığında varsayılan film araması yapar', async () => {
  mockedSearchMovies.mockResolvedValueOnce([
    {
      id: 1,
      title: 'Batman Begins',
      year: '2005',
    },
  ]);

  await act(async () => {
    render(<Home />);
  });

  await waitFor(() => {
    expect(mockedSearchMovies).toHaveBeenCalledTimes(1);
    expect(mockedSearchMovies).toHaveBeenCalledWith('batman');
  });
});

  it('arama yapıldığında yeni filmleri ekrana basar', async () => {
    mockedSearchMovies
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          id: 2,
          title: 'Batman Begins',
          year: '2005',
        },
        {
          id: 3,
          title: 'The Dark Knight',
          year: '2008',
        },
      ]);

    render(<Home />);

    const button = screen.getByRole('button', {
      name: /search batman/i,
    });

    await userEvent.click(button);

    await waitFor(() => {
      expect(mockedSearchMovies).toHaveBeenCalledWith('Batman');
    });

    await waitFor(() => {
      expect(screen.getByText('Batman Begins')).toBeInTheDocument();
      expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
    });
  });

  it('arama sırasında loading spinner gösterir', async () => {
    
    let resolveSearch: any;
    const searchPromise = new Promise((resolve) => {
      resolveSearch = resolve;
    });

    mockedSearchMovies.mockReturnValueOnce(searchPromise);

    render(<Home />);
    const button = screen.getByRole('button', { name: /search batman/i });
    await userEvent.click(button);

    
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();

    // Testi bitirmek için promise'i çözüyoruz
    resolveSearch([]);
  });
});