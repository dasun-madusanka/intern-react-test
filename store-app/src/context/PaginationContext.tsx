import React, { createContext, useContext, useState, useEffect } from "react";

interface PaginationContextType {
  skip: number;
  setSkip: (value: number) => void;
  removeSkip: () => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined
);

export const PaginationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [skip, setSkipState] = useState<number>(() => {
    const savedSkip = localStorage.getItem("skip");
    return savedSkip ? parseInt(savedSkip) : 0;
  });

  useEffect(() => {
    localStorage.setItem("skip", String(skip));
  }, [skip]);

  const setSkip = (value: number) => {
    setSkipState(value);
  };

  const removeSkip = () => {
    setSkipState(0);
    localStorage.removeItem("skip");
  };

  return (
    <PaginationContext.Provider value={{ skip, setSkip, removeSkip }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within a PaginationProvider");
  }
  return context;
};
