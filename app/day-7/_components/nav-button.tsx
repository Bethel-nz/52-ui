'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useNavigation } from './navigation-context'

export function NavButton() {
	const { isOpen, toggleNav } = useNavigation()

	return (
		<button
			onClick={toggleNav}
			className="flex fixed top-8 right-8 z-50 flex-row gap-2 justify-between items-center p-2 w-32 rounded-lg backdrop-blur-sm bg-black/80"
		>
			<AnimatePresence mode="wait">
				<motion.span
					className="font-medium text-white text-md"
					key={isOpen ? 'close' : 'menu'}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
				>
					{isOpen ? 'Close' : 'Menu'}
				</motion.span>
			</AnimatePresence>
			<div className="flex flex-col gap-1 relative h-[14px] w-8">
				<motion.div
					className="h-[2px] w-full bg-white absolute"
					initial={false}
					animate={{ y: isOpen ? 6 : 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				/>
				<motion.div
					className="h-[2px] w-full bg-white absolute"
					initial={false}
					animate={{ y: isOpen ? 6 : 12 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
				/>
			</div>
		</button>
	)
} 