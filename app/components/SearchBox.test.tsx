import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  it('input alanını render eder', () => {
    render(<SearchBox onSearch={jest.fn()} />);

    expect(
      screen.getByPlaceholderText('Efsane bir film ara...')
    ).toBeInTheDocument();
  });

  it('kullanıcı inputa yazabilir', async () => {
    const user = userEvent.setup();

    render(<SearchBox onSearch={jest.fn()} />);

    const input = screen.getByPlaceholderText('Efsane bir film ara...');

    await user.type(input, 'Batman');

    expect(input).toHaveValue('Batman');
  });

  it('form submit edildiğinde onSearch çağırır', async () => {
    const user = userEvent.setup();
    const mockOnSearch = jest.fn();

    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Efsane bir film ara...');
    const button = screen.getByRole('button', { name: /ara/i });

    await user.type(input, 'Batman');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith('Batman');
  });

  it('başta ve sonda boşluk varsa trimleyerek gönderir', async () => {
    const user = userEvent.setup();
    const mockOnSearch = jest.fn();

    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Efsane bir film ara...');
    const button = screen.getByRole('button', { name: /ara/i });

    await user.type(input, '   Batman   ');
    await user.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Batman');
  });

  it('sadece boşluk girilmişse onSearch çağırmaz', async () => {
    const user = userEvent.setup();
    const mockOnSearch = jest.fn();

    render(<SearchBox onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText('Efsane bir film ara...');
    const button = screen.getByRole('button', { name: /ara/i });

    await user.type(input, '     ');
    await user.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});