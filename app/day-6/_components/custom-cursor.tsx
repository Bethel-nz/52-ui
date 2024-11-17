'use client'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export function CustomCursor() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isPointer, setIsPointer] = useState(false)

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY })
			setIsPointer(window.getComputedStyle(e.target as Element).cursor === 'pointer')
		}

		window.addEventListener('mousemove', handleMouseMove)
		return () => window.removeEventListener('mousemove', handleMouseMove)
	}, [])

	return (
		<motion.div
			className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
			animate={{
				x: mousePosition.x - 16,
				y: mousePosition.y - 16,
				scale: isPointer ? 1.5 : 1
			}}
			transition={{
				type: "spring",
				mass: 0.2,
				stiffness: 100,
				damping: 10
			}}
		>
			<div className="w-full h-full rounded-full bg-white" />
		</motion.div>
	)
} 