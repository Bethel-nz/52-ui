'use client'

import { motion, useInView } from 'motion/react'
import * as React from 'react'

interface BlurTextProps {
	children: React.ReactNode
	className?: string
	delay?: number
}

export const BlurText = ({ children, className = '', delay = 0 }: BlurTextProps) => {
	const ref = React.useRef(null)
	const isInView = useInView(ref, { once: true })

	return (
		<motion.div
			ref={ref}
			initial={{ filter: 'blur(20px)', opacity: 0, y: 20 }}
			animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
			transition={{
				duration: 1.2,
				delay,
				ease: [0.25, 0.4, 0.25, 1]
			}}
			className={className}
		>
			{children}
		</motion.div>
	)
} 