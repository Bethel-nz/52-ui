'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Position = {
	x: number
	y: number
	rotation: number
}
// Track used positions to prevent overlap
const usedPositions: Position[] = []

function getRandomPosition(): Position {
	const minDistance = 60 // Minimum distance between numbers
	let newPosition: Position
	let attempts = 0
	const maxAttempts = 50

	do {
		const angle = Math.random() * Math.PI * 2
		// Reduce radius range for tighter spread
		const radius = 100 + Math.random() * 200
		const direction = Math.random() > 0.5 ? 1 : -1

		newPosition = {
			x: radius * Math.cos(angle),
			y: radius * Math.sin(angle),
			rotation: direction * (360 + Math.random() * 360)
		}

		// Check if position is far enough from all other positions
		const isFarEnough = usedPositions.every(pos => {
			const distance = Math.sqrt(
				Math.pow(pos.x - newPosition.x, 2) +
				Math.pow(pos.y - newPosition.y, 2)
			)
			return distance >= minDistance
		})

		if (isFarEnough || attempts >= maxAttempts) {
			usedPositions.push(newPosition)
			// Keep array size manageable
			if (usedPositions.length > 30) {
				usedPositions.shift()
			}
			break
		}

		attempts++
	} while (attempts < maxAttempts)

	return newPosition
}

export default function Page() {
	const [countdown, setCountdown] = useState<number>(60)
	const [scatteredNumbers, setScatteredNumbers] = useState<number[]>([])
	const [positions, setPositions] = useState<Record<string, Position>>({})
	const [isResetting, setIsResetting] = useState(false)
	const [isFading, setIsFading] = useState(false)

	// Countdown
	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					// First start fading
					setIsFading(true)

					// After fade, start rotation
					setTimeout(() => {
						setIsResetting(true)
						// Clear numbers after they've faded
						setScatteredNumbers([])
						setPositions({})
					}, 1000)

					// Reset everything after rotation
					setTimeout(() => {
						setIsResetting(false)
						setIsFading(false)
					}, 3000)

					return 0
				}
				return prev - 1
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	// Reset countdown
	useEffect(() => {
		if (countdown === 0) {
			const timeout = setTimeout(() => {
				setCountdown(60)
			}, 3000)
			return () => clearTimeout(timeout)
		}
	}, [countdown])

	// Scattered numbers
	useEffect(() => {
		if (countdown < 60 && countdown > 0) {
			setScatteredNumbers((prev) => [...prev, countdown + 1])
			setPositions((prev) => ({
				...prev,
				[`${countdown + 1}`]: getRandomPosition(),
			}))
		}
	}, [countdown])

	return (
		<div className="flex overflow-hidden justify-center items-center bg-black h-dvh font-space-grotesk">
			<motion.div
				className="relative w-[800px] h-[800px] flex items-center justify-center"
				animate={isResetting ? {
					rotate: 360,
					transition: {
						duration: 2,
						ease: [0.4, 0, 0.2, 1]
					}
				} : {}}
			>
				<AnimatePresence mode="popLayout">
					{/* Center countdown number */}
					<motion.div
						key={countdown}
						className="absolute text-3xl font-medium text-white"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.5,
							ease: [0.22, 1, 0.36, 1]
						}}
					>
						{countdown}
					</motion.div>

					{/* Scattered numbers */}
					{scatteredNumbers.map((num) => {
						const pos = positions[num.toString()]
						return (
							<motion.div
								key={`scattered-${num}`}
								className="absolute text-lg font-light text-white/60 cursor-grab active:cursor-grabbing will-change-transform"
								initial={{
									x: 0,
									y: 0,
									scale: 1,
									rotate: 0
								}}
								animate={{
									x: pos.x,
									y: pos.y,
									rotate: pos.rotation,
									scale: 0.8,
									opacity: isFading ? 0 : 0.6,
									transition: {
										duration: 1,
										opacity: {
											duration: 0.8,
											ease: "easeOut"
										},
										x: {
											type: "spring",
											stiffness: 50,
											damping: 10,
											velocity: 500
										},
										y: {
											type: "spring",
											stiffness: 50,
											damping: 10,
											velocity: 500
										},
										rotate: {
											duration: 1.5,
											ease: "circOut"
										}
									}
								}}
								drag
								dragConstraints={{
									left: -400,
									right: 400,
									top: -400,
									bottom: 400
								}}
								dragElastic={0.1}
								dragTransition={{
									bounceStiffness: 300,
									bounceDamping: 20
								}}
								whileDrag={{
									scale: 1.2,
									opacity: 1
								}}
							>
								<span className="p-4">
									{num}
								</span>
							</motion.div>
						)
					})}
				</AnimatePresence>
			</motion.div>
		</div>
	)
}