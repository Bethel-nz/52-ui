'use client';
import { useRef } from 'react';
import { useScroll } from 'motion/react';
import { CustomCursor } from './_components/custom-cursor';
import { AnimatedSection } from './_components/animated-section';

export default function Page() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		container: containerRef,
		offset: ['start start', 'end end'],
	});

	const sections = [
		{
			title: 'Design',
			subtitle: 'Creative Direction.',
			color: '#0a0a0a',
		},
		{
			title: 'Develop',
			subtitle: 'Technical Excellence.',
			color: '#fafafa',
		},
		{
			title: 'Deploy',
			subtitle: 'Global Scale.',
			color: '#0a0a0a',
		},
	];

	return (
		<main
			ref={containerRef}
			className='overflow-auto relative h-screen'
			style={{ height: `${sections.length * 100}vh` }}
		>
			<CustomCursor />

			{sections.map((section, index) => (
				<AnimatedSection
					key={section.title}
					index={index}
					total={sections.length}
					scrollProgress={scrollYProgress}
					{...section}
				/>
			))}
		</main>
	);
}
