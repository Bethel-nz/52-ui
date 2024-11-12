"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import NumberFlow from '@number-flow/react'
import { aeonik } from '~app/fonts'
import { useLoader } from './LoaderContext'

export function Loader() {
	const [count, setCount] = useState(0)
	const [isComplete, setIsComplete] = useState(false)
	const { setIsLoading } = useLoader()

	useEffect(() => {
		// Initial delay before starting animation
		const startDelay = setTimeout(() => {
			// Fast counting from 0 to 80 (4s)
			const duration = 4000;
			const startTime = Date.now();

			const animate = () => {
				const elapsed = Date.now() - startTime;
				const progress = Math.min(elapsed / duration, 1);

				// Ease out cubic for smooth deceleration
				const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
				const currentCount = Math.min(80, Math.floor(easeOut(progress) * 80));

				setCount(currentCount);

				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					// Slow counting from 80 to 90 (2s)
					const slowCount = setInterval(() => {
						setCount(prev => {
							if (prev < 90) return prev + 1;
							clearInterval(slowCount);
							return prev;
						});
					}, 200);

					// After 2s pause at 90, jump to 100
					setTimeout(() => {
						setCount(100);
						// Wait 3s at 100 before exit
						setTimeout(() => {
							setIsComplete(true);
							setTimeout(() => setIsLoading(false), 800);
						}, 3000);
					}, 2000);
				}
			};

			requestAnimationFrame(animate);
		}, 500);

		return () => clearTimeout(startDelay);
	}, [setIsLoading]);

	return (
		<AnimatePresence mode="wait">
			{!isComplete && (
				<motion.div
					className={`relative w-full flex flex-col bg-white h-dvh ${aeonik.className}`}
					exit={{
						y: '-100%',
						transition: {
							duration: 0.8,
							ease: [0.4, 0, 0.2, 1]
						}
					}}
				>
					<div className="flex-1 flex items-center justify-center">
						<motion.div
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{
								type: "spring",
								stiffness: 200,
								damping: 20
							}}
						>
							<Image
								src={"/day-1/soga.svg"}
								alt="loader"
								width={100}
								height={100}
								className="w-fit object-contain"
								priority
							/>
						</motion.div>
					</div>

					<motion.div
						className="flex items-center justify-end px-16 pb-16"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.5,
							delay: 0.3
						}}
					>
						<div className="text-4xl font-bold text-black flex items-center gap-4">
							<NumberFlow
								value={count}
								format={{ maximumFractionDigits: 0 }}
								continuous={true}
							/>
							<span>%</span>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
