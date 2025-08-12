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
  
  // Get LA date string directly using en-CA format (YYYY-MM-DD)
  const laDateString = now.toLocaleDateString("en-CA", {
    timeZone: "America/Los_Angeles"
  });
  
  return laDateString;
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