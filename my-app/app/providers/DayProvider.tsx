import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DayContextType {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
}

const DayContext = createContext<DayContextType | undefined>(undefined);

interface DayProviderProps {
  children: ReactNode;
}

// Helper function to get current date string in Los Angeles timezone
const getLADateString = () => {
  const now = new Date();
  
  // Get LA date components using Intl.DateTimeFormat
  const laFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  
  const laParts = laFormatter.formatToParts(now);
  const year = laParts.find(part => part.type === 'year')?.value || '2024';
  const month = laParts.find(part => part.type === 'month')?.value || '01';
  const day = laParts.find(part => part.type === 'day')?.value || '01';
  
  return `${year}-${month}-${day}`;
};

export function DayProvider({ children }: DayProviderProps) {
  const [selectedDay, setSelectedDay] = useState<string>(
    getLADateString()
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

// Add default export to fix the routing error
export default DayProvider; 