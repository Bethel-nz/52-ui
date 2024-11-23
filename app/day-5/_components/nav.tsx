'use client';
import { useScroll, motion, useTransform } from 'motion/react';
import Image from 'next/image';

const navItems = [
	{ title: 'About', path: '#about' },
	{ title: 'Work', path: '#work' },
	{ title: 'Contact', path: '#contact' },
];

export function Nav() {
	const { scrollYProgress } = useScroll();

	const width = useTransform(scrollYProgress, [0, 0.05], ['120px', '400px']);

	const height = useTransform(scrollYProgress, [0, 0.05], ['48px', '56px']);

	const navExpanded = useTransform(scrollYProgress, [0.0375, 0.05], [0, 1]);

	return (
		<div
			className='flex fixed top-0 left-0 z-50 justify-center w-full'
			style={{ marginTop: '40px' }}
		>
			<motion.nav
				style={{
					width,
					height,
				}}
				className='flex items-center px-4 bg-white rounded-lg'
				transition={{
					width: {
						duration: 0.5,
						ease: [0.32, 0.72, 0, 1],
					},
				}}
			>
				<div className='flex justify-between items-center w-full'>
					<motion.div
						className='flex gap-2 justify-between items-center'
						style={{
							x: useTransform(navExpanded, [0, 1], ['50%', '0%']),
							translateX: useTransform(navExpanded, [0, 1], ['-50%', '0%']),
						}}
					>
						<Image
							src='/day-5/gradient-logo.jpg'
							alt='Prism Digital'
							width={32}
							height={32}
							className='rounded-lg size-6 object-fit'
						/>
						<span className='font-semibold text-neutral-900'>Prism</span>
					</motion.div>

					<motion.div
						className='flex gap-6'
						style={{
							opacity: navExpanded,
						}}
					>
						{navItems.map((item, i) => (
							<motion.a
								key={item.title}
								href={item.path}
								initial={{ opacity: 0, x: 20 }}
								animate={{
									opacity: 1,
									x: 0,
								}}
								transition={{
									duration: 0.3,
									delay: 0.3 + i * 0.1,
									ease: [0.32, 0.72, 0, 1],
								}}
								className='text-sm font-medium transition-colors text-neutral-600 hover:text-neutral-900'
							>
								{item.title}
							</motion.a>
						))}
					</motion.div>
				</div>
			</motion.nav>
		</div>
	);
}
