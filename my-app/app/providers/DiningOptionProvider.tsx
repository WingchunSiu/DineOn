import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DiningOption } from '@/types';

interface SelectedDiningHallContextType {
  selectedDiningHall: DiningOption | null;
  setSelectedDiningHall: (diningOption: DiningOption) => void;
}

const SelectedDiningHallContext = createContext<SelectedDiningHallContextType | undefined>(undefined);

export const SelectedDiningHallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDiningHall, setSelectedDiningHall] = useState<DiningOption | null>(null);

  return (
    <SelectedDiningHallContext.Provider value={{ selectedDiningHall, setSelectedDiningHall }}>
      {children}
    </SelectedDiningHallContext.Provider>
  );
};

export const useSelectedDiningHall = () => {
  const context = useContext(SelectedDiningHallContext);
  if (!context) {
    throw new Error('useSelectedDiningHall must be used within a SelectedDiningHallProvider');
  }
  return context;
};
