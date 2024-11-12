"use client"
import React from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoader } from './LoaderContext'

export default function Navbar() {
	const { isLoading } = useLoader()

	if (isLoading) return null

	return (
		<AnimatePresence>
			<motion.div
				className="flex items-center justify-between px-16 py-8"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{
					duration: 0.8,
					delay: 0.3,
					ease: "easeOut"
				}}
			>
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						duration: 0.8,
						delay: 0.5,
						ease: "easeOut"
					}}
				>
					<Image
						src={"/day-1/soga-logo.svg"}
						alt="logo"
						width={100}
						height={56}
						className="h-14 w-auto"
						priority
					/>
				</motion.div>

				<motion.div
					className="flex items-center gap-4"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{
						duration: 0.8,
						delay: 0.7,
						ease: "easeOut"
					}}
				>
					<span>
						<Image
							src={"/day-1/soga-cart.svg"}
							alt="menu"
							width={100}
							height={48}
							className="h-12 w-auto"
						/>
					</span>
					<span className="text-md font-medium bg-black text-white px-5 py-3 rounded-full">
						Shop Now
					</span>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
