'use client';

import { createContext, useState } from 'react';

type ArraySectionContextType = {
	currentIndex: number;
	totalItems: number;
	progress: number;
	setCurrentIndex: (index: number) => void;
	setTotalItems: (total: number) => void;
	setProgress: (progress: number) => void;
};

export const ArraySectionContext = createContext<ArraySectionContextType>({
	currentIndex: 0,
	totalItems: 0,
	progress: 0,
	setCurrentIndex: () => {},
	setTotalItems: () => {},
	setProgress: () => {},
});

export function ArraySectionProvider({ children }: { children: React.ReactNode }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [totalItems, setTotalItems] = useState(0);
	const [progress, setProgress] = useState(0);

	return (
		<ArraySectionContext.Provider
			value={{
				currentIndex,
				totalItems,
				progress,
				setCurrentIndex,
				setTotalItems,
				setProgress,
			}}
		>
			{children}
		</ArraySectionContext.Provider>
	);
}
