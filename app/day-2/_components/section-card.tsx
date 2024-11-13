"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import './styles.css'

interface SectionCardProps {
	gradient: {
		from: string
		via: string
		to: string
	}
	description: string
	index: number
}

export function SectionCard({ gradient, description, index }: SectionCardProps) {
	const NAV_HEIGHT = 128
	const container = useRef<HTMLDivElement>(null)
	const wrapperRef = useRef<HTMLDivElement>(null)
	const [scrollProgress, setScrollProgress] = useState({
		blur: 0,
		scale: 1,
		opacity: 1
	})

	useEffect(() => {
		if (!wrapperRef.current) return;
		wrapperRef.current.style.setProperty("--color-a", gradient.from)
		wrapperRef.current.style.setProperty("--color-b", gradient.via)
		wrapperRef.current.style.setProperty("--color-c", gradient.to)
	}, [gradient])

	useEffect(() => {
		const handleScroll = () => {
			if (!container.current) return

			const rect = container.current.getBoundingClientRect()
			const viewportHeight = window.innerHeight
			const elementTop = rect.top
			const elementBottom = rect.bottom

			const distanceFromNav = Math.abs(NAV_HEIGHT - elementTop)
			const maxDistance = viewportHeight / 2

			const blurProgress = Math.min(distanceFromNav / maxDistance, 1)

			let scale = 1
			if (elementTop > viewportHeight || elementBottom < 0) {
				scale = 0.95
			} else {
				const center = (viewportHeight - NAV_HEIGHT) / 2 + NAV_HEIGHT
				const distanceFromCenter = Math.abs(center - (elementTop + rect.height / 2))
				const maxCenterDistance = viewportHeight / 2
				scale = 0.95 + (0.05 * (1 - Math.min(distanceFromCenter / maxCenterDistance, 1)))
			}

			setScrollProgress({
				blur: blurProgress * 2,
				scale,
				opacity: 1 - (blurProgress * 0.3)
			})
		}

		window.addEventListener('scroll', handleScroll)
		handleScroll()

		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div className="relative min-h-[60vh]">
			<motion.div
				ref={container}
				className="sticky top-[15vh] w-full space-y-8"
				animate={{
					filter: `blur(${scrollProgress.blur}px)`,
					scale: scrollProgress.scale,
				}}
				transition={{
					duration: 0.3,
					ease: [0.33, 1, 0.68, 1]
				}}
			>
				{/* Gradient Block */}
				<div
					ref={wrapperRef}
					className="w-full aspect-[16/9] rounded-lg relative overflow-hidden bg-gradient-to-br from-[--color-a] via-[--color-b] to-[--color-c] duration-500 ease-in [transition-property:_--color-a,_--color-b,_--color-c] before:absolute before:left-[20%] before:top-[10%] before:h-[50%] before:w-[70%] before:origin-[60%] before:animate-blob before:rounded-3xl before:bg-gradient-to-br before:from-[--color-a] before:to-[--color-b] before:blur-[50px] before:brightness-125 after:absolute after:left-[40%] after:top-[30%] after:h-[80%] after:w-[70%] after:origin-[60%] after:animate-blob-reverse after:rounded-3xl after:bg-gradient-to-br after:from-[--color-a] after:to-[--color-b] after:blur-[50px] after:brightness-125"
				/>

				{/* Description */}
				<div className="w-full max-w-xl mx-auto text-center">
					<motion.div
						className="relative px-6 py-4 rounded-xl bg-white/80 backdrop-blur-sm"
						style={{ opacity: scrollProgress.opacity }}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 * index }}
					>
						<p className="text-lg text-gray-800 leading-relaxed">
							{description}
						</p>
					</motion.div>
				</div>
			</motion.div>
		</div>
	)
} 