'use client'
import { useRef, HTMLAttributes } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react'
import { cx } from '~utils/cx'

type SectionProps = {
	children: React.ReactNode
	className?: string
} & HTMLAttributes<HTMLElement>

export function Section({ children, className, ...props }: SectionProps) {
	const sectionRef = useRef<HTMLElement>(null)
	const isInView = useInView(sectionRef, { amount: 0.5, once: false })

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"]
	})

	const yOffset = useTransform(
		scrollYProgress,
		[0, 1],
		[100, 0]
	)

	const scale = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		[0.9, 1, 0.9]
	)

	const scaleSpring = useSpring(scale, {
		stiffness: 100,
		damping: 20
	})

	return (
		<section
			ref={sectionRef}
			{...props}
			className={cx(`flex relative justify-center items-center min-h-screen`, className)}
		>
			<motion.div
				initial={{ scale: 0.7, opacity: 0 }}
				animate={{
					scale: isInView ? 1 : 0.7,
					opacity: isInView ? 1 : 0,
				}}
				style={{
					scale: scaleSpring,
					y: yOffset,
				}}
				transition={{
					duration: 0.8,
					ease: [0.16, 1, 0.3, 1]
				}}
				className="w-full"
			>
				{children}
			</motion.div>
		</section>
	)
} 