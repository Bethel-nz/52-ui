'use client'

import { motion } from 'framer-motion'

export function AnimatedGradient() {
	return (
		<motion.div
			className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
			initial={false}
			animate={{
				background: [
					'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)',
					'linear-gradient(0deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%)',
					'linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)',
				],
			}}
			transition={{
				duration: 2,
				repeat: Infinity,
				repeatType: "reverse",
			}}
		/>
	)
} 