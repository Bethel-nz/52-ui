'use client';
import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useLoader } from './LoaderContext';

export default function Navbar() {
	const { isLoading } = useLoader();

	if (isLoading) return null;

	return (
		<AnimatePresence>
			<motion.div
				className='flex justify-between items-center px-16 py-8'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.3,
					ease: 'easeOut',
				}}
			>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						duration: 0.8,
						delay: 0.5,
						ease: 'easeOut',
					}}
				>
					<Image
						src={'/day-1/soga-logo.svg'}
						alt='logo'
						width={100}
						height={56}
						className='w-auto h-14'
						priority
					/>
				</motion.div>

				<motion.div
					className='flex gap-4 items-center'
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						duration: 0.8,
						delay: 0.7,
						ease: 'easeOut',
					}}
				>
					<span>
						<Image
							src={'/day-1/soga-cart.svg'}
							alt='menu'
							width={100}
							height={48}
							className='w-auto h-12'
						/>
					</span>
					<span className='px-5 py-3 font-medium text-white bg-black rounded-full text-md'>
						Shop Now
					</span>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
