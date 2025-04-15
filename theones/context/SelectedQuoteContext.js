'use client'
import React, { createContext, useContext, useState } from 'react';

const SelectedQuoteContext = createContext();

export function SelectedQuoteProvider({ children }) {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    const handleOpenQuote = () => {
        setIsQuoteOpen(prev => !prev);
    };

    return (
        <SelectedQuoteContext.Provider value={{ isQuoteOpen, handleOpenQuote }}>
            {children}
        </SelectedQuoteContext.Provider>
    );
}

export function useSelectedQuote() {
    return useContext(SelectedQuoteContext);
}
