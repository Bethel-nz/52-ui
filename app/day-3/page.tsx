'use client'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { BlurText } from './_components/blur-text'
import { AnimatedNumber } from './_components/number-flow'

const artworks = [
	{ id: 1, path: '/day-3/art-1.jpg', value: 1200, name: 'Sophia' },
	{ id: 2, path: '/day-3/art-2.jpg', value: 2500, name: 'Isabella' },
	{ id: 3, path: '/day-3/art-3.jpg', value: 3800, name: 'Olivia' },
	{ id: 4, path: '/day-3/art-4.jpg', value: 1800, name: 'Emma' },
	{ id: 5, path: '/day-3/art-5.jpg', value: 4200, name: 'Ava' },
	{ id: 6, path: '/day-3/art-6.jpg', value: 2900, name: 'Mia' },
	{ id: 7, path: '/day-3/art-7.jpg', value: 5500, name: 'Luna' }
]

export default function Page() {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const [showFinal, setShowFinal] = useState(false)
	const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null)

	const dragX = useMotionValue(0)
	const dragProgress = useTransform(dragX, [-200, 200], [-1, 1])

	useEffect(() => {
		const unsubscribe = dragProgress.on('change', (latest) => {
			if (latest > 0.3) setDragDirection('right')
			else if (latest < -0.3) setDragDirection('left')
			else setDragDirection(null)
		})
		return () => unsubscribe()
	}, [dragProgress])

	const handleNext = () => {
		if (currentIndex < artworks.length - 1) {
			setIsLoading(true)
			setTimeout(() => {
				setCurrentIndex(prev => prev + 1)
			}, 300)
		}
	}

	const handlePrev = () => {
		if (currentIndex > 0) {
			setIsLoading(true)
			setTimeout(() => {
				setCurrentIndex(prev => prev - 1)
			}, 300)
		}
	}

	const handleDragEnd = () => {
		if (dragDirection === 'left') {
			handleNext()
		} else if (dragDirection === 'right') {
			handlePrev()
		}
		setDragDirection(null)
	}

	return (
		<div className="min-h-screen w-full flex items-center justify-center p-4">
			<AnimatePresence mode="wait">
				{!showFinal ? (
					<motion.div
						key="artwork"
						className="relative w-full max-w-4xl aspect-[16/9] rounded-2xl overflow-hidden group"
						initial={{ opacity: 0, scale: 1.1 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.8 }}
						drag="x"
						dragConstraints={{ left: 0, right: 0 }}
						dragElastic={0.2}
						onDragEnd={handleDragEnd}
						style={{ x: dragX }}
						data-magnetic="true"
					>
						{/* Left arrow with magnetic area */}
						<motion.div
							className="absolute inset-y-0 left-0 w-24 z-30 flex items-center justify-start pl-4"
							style={{
								opacity: currentIndex > 0 ? 1 : 0.3,
							}}
							whileHover={{ opacity: currentIndex > 0 ? 1 : 0.3 }}
							data-magnetic="true"
							onClick={handlePrev}
						>
							<div className="text-white/80 text-2xl cursor-none select-none transition-colors duration-300 group-hover:text-white">←</div>
						</motion.div>

						{/* Right arrow with magnetic area */}
						<motion.div
							className="absolute inset-y-0 right-0 w-24 z-30 flex items-center justify-end pr-4"
							style={{
								opacity: currentIndex < artworks.length - 1 ? 1 : 0.3,
							}}
							whileHover={{ opacity: currentIndex < artworks.length - 1 ? 1 : 0.3 }}
							data-magnetic="true"
							onClick={handleNext}
						>
							<div className="text-white/80 text-2xl cursor-none select-none transition-colors duration-300 group-hover:text-white">→</div>
						</motion.div>

						{/* Center drag area */}
						<motion.div
							className="absolute inset-0 z-20 cursor-none"
							style={{
								width: 'calc(100% - 96px)', // 48px on each side
								left: '48px',
							}}
							data-magnetic="true"
						/>

						{/* Blur overlay */}
						<motion.div
							className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 backdrop-blur-sm z-10"
							animate={{
								opacity: isLoading ? 1 : 0,
								backdropFilter: isLoading ? 'blur(10px)' : 'blur(0px)'
							}}
							transition={{ duration: 0.6 }}
						/>

						{/* Counter */}
						<motion.div
							className="absolute top-8 right-8 z-20 text-2xl font-mono bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
						>
							<AnimatedNumber
								value={currentIndex + 1}
								suffix={` / ${artworks.length}`}
								onFinish={() => {
									if (currentIndex === artworks.length - 1) {
										setTimeout(() => setShowFinal(true), 1000)
									}
								}}
							/>
						</motion.div>

						{/* Name display */}
						<motion.div
							className="absolute bottom-8 left-8 z-20 text-sm font-light tracking-wider"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							<span className="text-white/60">Muse:</span>
							<BlurText
								className="inline-block ml-2 text-white"
								delay={!isLoading ? 0.3 : 0}
							>
								{artworks[currentIndex].name}
							</BlurText>
						</motion.div>

						<motion.div
							className="relative w-full h-full"
							initial={{ scale: 1.2 }}
							animate={{ scale: 1 }}
							transition={{ duration: 1.2, ease: [0.25, 0.25, 0, 1] }}
						>
							<Image
								src={artworks[currentIndex].path}
								alt={`Portrait of ${artworks[currentIndex].name}`}
								fill
								className="object-cover"
								style={{
									transform: isLoading ? 'scale(1.05)' : 'scale(1)',
									transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
								}}
								onLoad={() => {
									setTimeout(() => {
										setIsLoading(false)
									}, 1000)
								}}
								priority
							/>
						</motion.div>
					</motion.div>
				) : (
					<motion.div
						key="final"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="text-center space-y-4"
					>
						<div className="flex justify-center items-center gap-x-1 md:gap-x-2">
							{'Aphrodite'.split('').map((letter, i) => (
								<motion.div
									key={`${letter}-${i}`}
									className="text-6xl font-light italic"
									data-magnetic="true"
									whileHover={{ scale: 1.2 }}
									transition={{ type: "spring", stiffness: 400, damping: 10 }}
								>
									{letter}
								</motion.div>
							))}
						</div>
						<BlurText className="text-4xl font-light" delay={0.1}>
							Beauty in Monochrome
						</BlurText>
						<BlurText className="text-xl text-neutral-400" delay={0.2}>
							A collection of black & white portraits capturing the essence of elegance
						</BlurText>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
