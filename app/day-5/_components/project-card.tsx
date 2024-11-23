'use client';
import { motion } from 'motion/react';
import Image from 'next/image';

interface ProjectCardProps {
	title: string;
	type: string;
	image: string;
	color: string;
}

export function ProjectCard({ title, type, image, color }: ProjectCardProps) {
	return (
		<motion.div
			className='group relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900'
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.2 }}
		>
			<div className='absolute inset-0'>
				<Image
					src={image}
					alt={title}
					fill
					className='object-cover transition-transform duration-500 group-hover:scale-110'
				/>
				<div
					className='absolute inset-0 mix-blend-overlay opacity-40'
					style={{ backgroundColor: color }}
				/>
			</div>
			<div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/60' />
			<div className='absolute bottom-0 left-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
				<h3 className='text-xl font-semibold mb-2'>{title}</h3>
				<p className='text-sm text-neutral-300 opacity-0 transform -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
					{type}
				</p>
			</div>
		</motion.div>
	);
}
