'use client';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const gradients = [
	{
		from: '#FF0080',
		via: '#7928CA',
		to: '#4338CA',
	},
	{
		from: '#3B82F6',
		via: '#8B5CF6',
		to: '#D946EF',
	},
	{
		from: '#059669',
		via: '#10B981',
		to: '#34D399',
	},
];

export function GradientCard() {
	const cardRef = useRef<HTMLDivElement>(null);
	const [currentGradient, setCurrentGradient] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentGradient((prev) => (prev + 1) % gradients.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (!cardRef.current) return;
		const gradient = gradients[currentGradient];
		cardRef.current.style.setProperty('--color-from', gradient.from);
		cardRef.current.style.setProperty('--color-via', gradient.via);
		cardRef.current.style.setProperty('--color-to', gradient.to);
	}, [currentGradient]);

	return (
		<motion.div
			ref={cardRef}
			className='relative w-full max-w-4xl aspect-[2/1] rounded-2xl overflow-hidden'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
		>
			{/* Main Gradient */}
			<div className='absolute inset-0 bg-gradient-to-br from-[--color-from] via-[--color-via] to-[--color-to] transition-all duration-1000' />

			{/* Animated Blobs */}
			<div className='absolute inset-0'>
				<div className='absolute w-[500px] h-[500px] -left-48 -top-48 rounded-full bg-gradient-to-br from-white/20 to-transparent mix-blend-overlay filter blur-3xl animate-blob' />
				<div
					className='absolute w-[500px] h-[500px] -right-48 -bottom-48 rounded-full bg-gradient-to-br from-white/20 to-transparent mix-blend-overlay filter blur-3xl animate-blob'
					style={{ animationDelay: '2s' }}
				/>
			</div>

			{/* Noise Texture */}
			<div className='absolute inset-0 opacity-50 mix-blend-overlay'>
				<div
					className="absolute inset-0 bg-[url('/noise.png')] bg-repeat opacity-30"
					style={{ backgroundSize: '200px 200px' }}
				/>
			</div>

			{/* Glass Effect */}
			<div className='absolute inset-0 backdrop-blur-[1px] bg-white/5' />

			{/* Content Overlay */}
			<div className='flex absolute inset-0 justify-center items-center'>
				<motion.div
					className='text-xl text-white text-opacity-80'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}
				>
					{/* Content here */}
				</motion.div>
			</div>
		</motion.div>
	);
}
