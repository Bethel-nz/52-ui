'use client'

import { createContext, useState, useEffect, useCallback } from 'react'

type TOCContextType = {
	activeSection: number
	scrollProgress: number
	setActiveSection: (section: number) => void
}

export const TOCContext = createContext<TOCContextType>({
	activeSection: 0,
	scrollProgress: 0,
	setActiveSection: () => { },
})

export function TOCProvider({ children }: { children: React.ReactNode }) {
	const [activeSection, setActiveSection] = useState(0)
	const [scrollProgress, setScrollProgress] = useState(0)

	const updateScroll = useCallback(() => {
		requestAnimationFrame(() => {
			const section = document.querySelector(`[data-section="${activeSection}"]`)
			if (section) {
				const rect = section.getBoundingClientRect()
				const progress = Math.min(
					Math.max((window.innerHeight - rect.top) / rect.height, 0),
					1
				)
				setScrollProgress(progress)
			}
		})
	}, [activeSection])

	useEffect(() => {
		// Update immediately when section changes
		updateScroll()

		// Then listen for scroll
		window.addEventListener('scroll', updateScroll, { passive: true })
		return () => window.removeEventListener('scroll', updateScroll)
	}, [activeSection, updateScroll])

	return (
		<TOCContext.Provider
			value={{
				activeSection,
				scrollProgress,
				setActiveSection: (section: number) => {
					setActiveSection(section)
					// Force immediate update when section changes
					requestAnimationFrame(() => updateScroll())
				},
			}}
		>
			{children}
		</TOCContext.Provider>
	)
} 