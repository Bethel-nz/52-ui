'use client';
import { useRef } from 'react';
import { motion, MotionValue, useTransform, useSpring, useInView } from 'motion/react';
import { TextReveal } from './text-reveal';
import { ScaleAnimation } from './scale-animation';

interface AnimatedSectionProps {
	title: string;
	subtitle: string;
	color: string;
	index: number;
	total: number;
	scrollProgress: MotionValue<number>;
}

export function AnimatedSection({
	title,
	subtitle,
	color,
	index,
	total,
	scrollProgress,
}: AnimatedSectionProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const isInView = useInView(sectionRef, { amount: 0.5 });

	const yOffset = useTransform(scrollProgress, [index / total, (index + 1) / total], [0, 50]);

	const sectionProgress = useTransform(
		scrollProgress,
		[index / total, (index + 0.5) / total, (index + 1) / total],
		[0, 1, 0],
	);

	const scaleOnEntry = useSpring(useTransform(sectionProgress, [0, 0.5, 1], [0.9, 1, 0.9]), {
		stiffness: 100,
		damping: 20,
	});

	return (
		<section
			ref={sectionRef}
			className='flex relative justify-center items-center min-h-screen snap-start'
			style={{ backgroundColor: color }}
		>
			<ScaleAnimation isInView={isInView} scaleOnEntry={scaleOnEntry} yOffset={yOffset}>
				<div className='py-32'>
					<TextReveal>
						<motion.h2
							className='text-[8rem] font-bold text-center text-white'
							whileHover={{ scale: 1.05 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							{title}
						</motion.h2>
					</TextReveal>
					<TextReveal delay={0.2}>
						<motion.p
							className='mt-2 text-[2rem] text-center text-white'
							whileHover={{ scale: 1.05 }}
						>
							{subtitle}
						</motion.p>
					</TextReveal>
				</div>
			</ScaleAnimation>
		</section>
	);
}
