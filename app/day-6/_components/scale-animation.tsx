'use client';
import { motion, MotionValue } from 'motion/react';
import { ReactNode } from 'react';

interface ScaleAnimationProps {
	children: ReactNode;
	isInView: boolean;
	scaleOnEntry: MotionValue<number>;
	yOffset: MotionValue<number>;
}

export function ScaleAnimation({ children, isInView, scaleOnEntry, yOffset }: ScaleAnimationProps) {
	return (
		<motion.div
			className='relative z-10 px-4 mx-auto w-full max-w-7xl mix-blend-difference'
			initial={{ scale: 0.7, opacity: 0 }}
			animate={{
				scale: isInView ? 1 : 0.7,
				opacity: isInView ? 1 : 0,
			}}
			style={{
				scale: scaleOnEntry,
				y: yOffset,
			}}
			transition={{
				duration: 0.8,
				ease: [0.16, 1, 0.3, 1],
			}}
		>
			{children}
		</motion.div>
	);
}
