'use client'; 
import { createContext, useContext, ReactNode, useState } from 'react';

type SchoolContextType = {
  selectedSchoolId: number | null;
  setSelectedSchoolId: (id: number | null) => void;
};

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export function SchoolProvider({ children }: { children: ReactNode }) {
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);


  return (
    <SchoolContext.Provider value={{ selectedSchoolId, setSelectedSchoolId }}>
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchoolContext() {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error('useSchoolContext must be used within a SchoolProvider');
  }
  return context;
}