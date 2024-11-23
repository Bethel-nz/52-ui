'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type NavigationContextType = {
	isOpen: boolean;
	toggleNav: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleNav = () => setIsOpen((prev) => !prev);

	return (
		<NavigationContext.Provider value={{ isOpen, toggleNav }}>
			{children}
		</NavigationContext.Provider>
	);
}

export function useNavigation() {
	const context = useContext(NavigationContext);
	if (!context) {
		throw new Error('useNavigation must be used within NavigationProvider');
	}
	return context;
}
