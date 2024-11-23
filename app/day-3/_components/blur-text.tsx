'use client';

import { motion } from 'motion/react';
import { cx } from '~utils/cx';

interface BlurTextProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}

export function BlurText({ children, className, delay = 0 }: BlurTextProps) {
	return (
		<motion.div
			initial={{ filter: 'blur(8px)', opacity: 0, y: 20 }}
			animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
			transition={{
				duration: 0.8,
				delay: delay,
				ease: [0.25, 0.25, 0, 1],
			}}
			className={cx(className)}
		>
			{children}
		</motion.div>
	);
}
