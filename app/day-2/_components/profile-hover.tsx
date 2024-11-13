'use client'

import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

interface ProfileHoverProps {
	name: string
	role?: string
	image: string
	className?: string
	width?: number
	height?: number
	quality?: number
}

export function ProfileHover({
	name,
	role,
	image,
	className = '',
	width = 300,
	height = 300,
	quality = 75,
}: ProfileHoverProps) {
	const [isHovered, setIsHovered] = useState(false)
	const [showAbove, setShowAbove] = useState(true)
	const containerRef = useRef<HTMLSpanElement>(null)

	const springConfig = { stiffness: 100, damping: 15 }
	const x = useMotionValue(0)
	const translateX = useSpring(x, springConfig)

	useEffect(() => {
		if (isHovered && containerRef.current) {
			const rect = containerRef.current.getBoundingClientRect()
			const spaceAbove = rect.top
			const spaceBelow = window.innerHeight - rect.bottom
			setShowAbove(spaceAbove > spaceBelow)
		}
	}, [isHovered])

	const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
		const targetRect = event.currentTarget.getBoundingClientRect()
		const eventOffsetX = event.clientX - targetRect.left
		const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2
		x.set(offsetFromCenter)
	}

	return (
		<span
			ref={containerRef}
			className={`relative inline-block font-semibold ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => {
				setIsHovered(false)
				x.set(0)
			}}
			onMouseMove={handleMouseMove}
		>
			<span className="relative z-10">{name}</span>

			<AnimatePresence>
				{isHovered && (
					<motion.div
						initial={{ opacity: 0, y: showAbove ? 10 : -10, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: showAbove ? 10 : -10, scale: 0.95 }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
						className="fixed z-[9999]"
						style={{
							x: translateX,
							top: showAbove ?
								containerRef.current?.getBoundingClientRect().top ?? 0 - height - 20 :
								containerRef.current?.getBoundingClientRect().bottom ?? 0 + 20,
							left: containerRef.current ?
								containerRef.current.getBoundingClientRect().left + (containerRef.current.offsetWidth / 2) - (width / 2) :
								'50%'
						}}
					>
						<div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200/60 backdrop-blur-sm">
							<div className="relative" style={{ width, height }}>
								<Image
									src={image}
									alt={name}
									className="rounded-lg object-cover"
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									priority
									quality={quality}
								/>
							</div>
							{role && (
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="text-xs text-gray-500 text-center mt-2"
								>
									{role}
								</motion.p>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</span>
	)
} 