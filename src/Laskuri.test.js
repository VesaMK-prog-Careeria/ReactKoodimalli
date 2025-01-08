import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Laskuri from './Laskuri';

describe('Laskuri komponentti', () => {
  it('Aloitus numero on 0', () => {
    render(<Laskuri huomio={jest.fn()} />); // Huomio on tyhjä funktio joka ei tee mitään mutta se pitää antaa jotta testi menee läpi
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('lisätään numero kun "+" klikattu', () => { 
    render(<Laskuri huomio={jest.fn()} />); 
    const incrementButton = screen.getByText('+'); // Tässä haetaan elementti jolla on teksti "+"
    fireEvent.click(incrementButton); // Tässä klikataan elementtiä
    expect(screen.getByText('1')).toBeInTheDocument(); // Tässä tarkistetaan että elementti jossa on teksti "1" on olemassa
  });

  it('vähennetään numero kun "-" klikattu', () => {
    render(<Laskuri huomio={jest.fn()} />);
    const decrementButton = screen.getByText('-');
    fireEvent.click(decrementButton);
    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('nollataan kun "nollaa" klikattu', () => {
    render(<Laskuri huomio={jest.fn()} />);
    const incrementButton = screen.getByText('+');
    const resetButton = screen.getByText('nollaa');

    fireEvent.click(incrementButton);
    fireEvent.click(resetButton);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('kutsutaan huomio funktiota kun "Huomio" klikattu', () => {
    const huomioMock = jest.fn(); // Tässä luodaan mock funktio
    render(<Laskuri huomio={huomioMock} />); // Tässä annetaan mock funktio propsina Laskuri komponentille
    const huomioButton = screen.getByText('Huomio'); // Tässä haetaan elementti jolla on teksti "Huomio"

    fireEvent.click(huomioButton); // Tässä klikataan elementtiä

    expect(huomioMock).toHaveBeenCalledTimes(1); // Tässä tarkistetaan että mock funktio on kutsuttu kerran
  });
});