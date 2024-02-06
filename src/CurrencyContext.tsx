import React, { createContext, useState, useContext } from 'react';

type CurrencyContextType = {
  currency: string;
  setCurrency: (currency: string) => void;
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: '',
  setCurrency: () => {},
});

export const CurrencyProvider: React.FC = ({ children }) => {
  const [currency, setCurrency] = useState<string>('£');

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);