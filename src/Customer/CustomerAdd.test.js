import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerAdd from './CustomerAdd';
import CustomerService from '../services/Customer';
import '@testing-library/jest-dom'; // Tämä lisätään
global.scrollTo = jest.fn(); // Mockataan window.scrollTo

// Mockataan CustomerService.create. Tämä mockaus on tarpeen, koska emme halua tehdä oikeaa HTTP-pyyntöä testin aikana.
jest.mock('../services/Customer', () => ({
    create: jest.fn(() => Promise.resolve({ status: 200 })), // Palauttaa onnistuneen vastauksen
  }));  

describe('CustomerAdd Component', () => { // Tässä määritellään testiryhmä
  let mockProps; 

  beforeEach(() => { // Tämä suoritetaan ennen jokaista testiä
    mockProps = {
      setLisäystila: jest.fn(),
      setIsPositive: jest.fn(),
      setMessage: jest.fn(),
      setShowMessage: jest.fn(),
      reload: false,
      setReload: jest.fn(),
    };
  });

  it('formi renderöidään onnistuneesti', () => {
    render(<CustomerAdd {...mockProps} />);
    expect(screen.getByText(/Asiakkaan lisäys/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ID with 5 capital letters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Company Name')).toBeInTheDocument();
  });

  it('formiin saadaan lisättyä dataa', () => {
    render(<CustomerAdd {...mockProps} />);

    const idInput = screen.getByPlaceholderText('ID with 5 capital letters');
    fireEvent.change(idInput, { target: { value: 'ABCDE' } });

    expect(idInput.value).toBe('ABCDE');
  });

  it('kutsuu CustomerService.create submitoidessa', () => {
    render(<CustomerAdd {...mockProps} />);

    // Haetaan lomakkeen input-kentät
    const idInput = screen.getByPlaceholderText('ID with 5 capital letters');
    const companyNameInput = screen.getByPlaceholderText('Company Name');
    const submitButton = screen.getByText('Lisää');

    // Syötetään tietoja lomakkeeseen
    fireEvent.change(idInput, { target: { value: 'ABCDE' } });
    fireEvent.change(companyNameInput, { target: { value: 'Test Company' } });

    // Simuloidaan lomakkeen lähetys
    fireEvent.click(submitButton);

    expect(CustomerService.create).toHaveBeenCalledWith({
      customerId: 'ABCDE',
      companyName: 'Test Company',
      contactName: '',
      contactTitle: '',
      country: '',
      address: '',
      city: '',
      region: '',
      postalCode: '',
      phone: '',
      fax: '',
    });
  });

  it('Kutsutaan setLisäystila(false) Peruuta napilla', () => {
    render(<CustomerAdd {...mockProps} />);

    const cancelButton = screen.getByText('Peruuta');
    fireEvent.click(cancelButton);

    expect(mockProps.setLisäystila).toHaveBeenCalledWith(false);
  });
});
