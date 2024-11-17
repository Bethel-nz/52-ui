'use client'
import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { TextReveal } from './text-reveal'

interface MagneticSectionProps {
	title: string
	subtitle: string
	color: string
	children?: React.ReactNode
	pattern?: boolean
}

export function MagneticSection({
	title,
	subtitle,
	color,
	children,
	pattern = true
}: MagneticSectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const isInView = useInView(sectionRef, { amount: 0.5 })

	return (
		<section
			ref={sectionRef}
			className="flex relative justify-center items-center h-screen"
			style={{ backgroundColor: color }}
		>
			<motion.div
				className="relative z-10 px-4 mx-auto w-full max-w-7xl mix-blend-difference"
				initial={{ scale: 0.7, opacity: 0 }}
				animate={{
					scale: isInView ? 1 : 0.7,
					opacity: isInView ? 1 : 0,
				}}
				transition={{
					duration: 0.8,
					ease: [0.16, 1, 0.3, 1]
				}}
			>
				<TextReveal>
					<h2 className="text-[8rem] font-bold text-center text-white">
						{title}
					</h2>
				</TextReveal>
				<TextReveal delay={0.2}>
					<p className="mt-4 text-[2rem] text-center text-white">
						{subtitle}
					</p>
				</TextReveal>

				{children}

				{pattern && (
					<div className="absolute inset-0 opacity-10 -z-10">
						<div className="grid absolute inset-0 grid-cols-8 gap-px">
							{Array.from({ length: 64 }).map((_, i) => (
								<motion.div
									key={i}
									className="bg-white aspect-square"
									initial={{ opacity: 0 }}
									animate={isInView ? { opacity: 1 } : { opacity: 0 }}
									transition={{
										delay: i * 0.01,
										duration: 0.5
									}}
								/>
							))}
						</div>
					</div>
				)}
			</motion.div>
		</section>
	)
} 