'use client'

import { motion } from 'motion/react'

export function HeroSection() {
	return (
		<section className="flex overflow-hidden relative justify-center items-center min-h-screen">
			{/* Video Background */}
			<motion.div
				className="absolute inset-0 w-full h-full"
				initial={{ scale: 1.1 }}
				animate={{ scale: 1 }}
				transition={{ duration: 1.5, ease: "easeOut" }}
			>
				<video
					autoPlay
					muted
					loop
					playsInline
					className="object-cover w-full h-full rounded-lg"
					src="/day-7/day-7-video-bg.mp4"
				/>
				<div className="absolute inset-0 rounded-lg bg-black/50" />
			</motion.div>

			{/* Content */}
			<div className="absolute bottom-8 left-8 z-20 w-[600px] text-white">
				<h1 className="text-6xl">Scaled Content Nav</h1>
				<p className="mt-4 text-xl">Welcome to Day 7</p>
			</div>


		</section>
	)
} 