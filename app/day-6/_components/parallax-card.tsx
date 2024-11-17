'use client'
import { motion, useScroll, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface ParallaxCardProps {
	children: React.ReactNode
}

export function ParallaxCard({ children }: ParallaxCardProps) {
	const vertMargin = 10
	const container = useRef(null)
	const [maxScrollY, setMaxScrollY] = useState(Infinity)
	const [dynamicStyles, setDynamicStyles] = useState({
		scale: 1,
		filter: 0,
	})

	const { scrollY } = useScroll({
		target: container,
	})

	const isInView = useInView(container, {
		margin: `0px 0px -${100 - vertMargin}% 0px`,
		once: true,
	})

	scrollY.on("change", (scrollY) => {
		let animationValue = 1
		if (scrollY > maxScrollY) {
			animationValue = Math.max(0, 1 - (scrollY - maxScrollY) / 1000)
		}

		setDynamicStyles({
			scale: animationValue,
			filter: (1 - animationValue) * 20,
		})
	})

	useEffect(() => {
		if (isInView) {
			setMaxScrollY(scrollY.get())
		}
	}, [isInView, scrollY])

	return (
		<motion.div
			ref={container}
			className="sticky w-[90vw] bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm"
			style={{
				scale: dynamicStyles.scale,
				filter: `blur(${dynamicStyles.filter}px)`,
				height: `${100 - 2 * vertMargin}vh`,
				top: `${vertMargin}vh`,
			}}
		>
			{children}
		</motion.div>
	)
} 