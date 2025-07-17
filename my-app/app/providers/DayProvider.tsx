import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DayContextType {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

const DayContext = createContext<DayContextType | undefined>(undefined);

interface DayProviderProps {
  children: ReactNode;
}

export function DayProvider({ children }: DayProviderProps) {
  const [selectedDay, setSelectedDay] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  return (
    <DayContext.Provider value={{ selectedDay, setSelectedDay }}>
      {children}
    </DayContext.Provider>
  );
}

export function useSelectedDay() {
  const context = useContext(DayContext);
  if (context === undefined) {
    throw new Error('useSelectedDay must be used within a DayProvider');
  }
  return context;
} 