'use client';
import { motion } from 'motion/react';

export function TextReveal({
	children,
	delay = 0,
}: {
	children: React.ReactNode;
	delay?: number;
}) {
	return (
		<div className='overflow-hidden'>
			<motion.div
				initial={{ y: 100 }}
				whileInView={{ y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				transition={{
					duration: 0.8,
					delay,
					ease: [0.25, 1, 0.5, 1],
				}}
			>
				{children}
			</motion.div>
		</div>
	);
}
