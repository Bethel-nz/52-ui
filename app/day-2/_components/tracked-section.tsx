'use client'

import { use } from 'react'
import { TOCContext } from './toc-context'
import { useEffect, useRef } from 'react'

interface TrackedSectionProps {
	sectionId: number
	children: React.ReactNode
	className?: string
	isArray?: boolean
	arrayLength?: number
}

export function TrackedSection({
	sectionId,
	children,
	className = '',
	isArray = false,
	arrayLength = 0
}: TrackedSectionProps) {
	const { setActiveSection } = use(TOCContext)
	const ref = useRef<HTMLElement>(null)

	useEffect(() => {
		const handleScroll = () => {
			if (!ref.current) return

			const rect = ref.current.getBoundingClientRect()
			const scrollProgress = -rect.top / (rect.height - window.innerHeight)

			if (isArray) {
				// For array sections, calculate progress based on array length
				const itemProgress = scrollProgress * arrayLength
				if (itemProgress >= 0 && itemProgress <= arrayLength) {
					setActiveSection(sectionId)
				}
			} else {
				// For single sections, use simple bounds check
				if (scrollProgress >= 0 && scrollProgress <= 1) {
					setActiveSection(sectionId)
				}
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll() // Check initial position

		return () => window.removeEventListener('scroll', handleScroll)
	}, [sectionId, setActiveSection, isArray, arrayLength])

	return (
		<section
			ref={ref}
			className={className}
			data-section={sectionId}
			data-array-length={arrayLength}
		>
			{children}
		</section>
	)
} 