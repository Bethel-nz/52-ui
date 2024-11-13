'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { use } from 'react'
import { TOCContext } from './toc-context'

const navItems = [
	{ id: "me", label: "Me", tooltip: "About Me" },
	{ id: "work", label: "Work", tooltip: "View My Work" },
	{ id: "contact", label: "Contact", tooltip: "Get In Touch" },
];

export function Nav() {
	const [hoveredTab, setHoveredTab] = useState<string | null>(null);
	const { activeSection, scrollProgress } = use(TOCContext);

	const handleClick = (index: number) => {
		const section = document.querySelector(`[data-section="${index}"]`)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	return (
		<div className='fixed top-8 w-full z-50 flex justify-center'>
			<div className='flex flex-row items-start px-1.5 border border-gray-200/60 py-1 rounded-md bg-white backdrop-blur-sm shadow-sm'>
				{navItems.map((item, index) => (
					<div key={item.id} className="relative w-full">
						<button
							onClick={() => handleClick(index)}
							onMouseEnter={() => setHoveredTab(item.id)}
							onMouseLeave={() => setHoveredTab(null)}
							className="relative w-full text-left px-3 py-1.5 text-[13px] font-medium text-gray-800 transition focus-visible:outline-2"
							data-blobity-tooltip={item.tooltip}
							style={{
								WebkitTapHighlightColor: "transparent",
							}}
						>
							{/* Gooey background with progress indicator */}
							{(hoveredTab === item.id || (activeSection === index && hoveredTab === null)) && (
								<motion.div
									layoutId="bubble"
									className="absolute inset-0 z-0 overflow-hidden rounded-md"
									transition={{
										type: "spring",
										bounce: 0.15,
										duration: 0.4,
										stiffness: 200,
										damping: 20
									}}
								>
									{/* Base gooey effect */}
									<motion.div
										className="absolute inset-0 bg-gray-200/80"
										style={{ borderRadius: 6 }}
									/>

									{/* Progress indicator */}
									{activeSection === index && (
										<motion.div
											className="absolute left-0 top-0 bottom-0 bg-gray-300/80"
											initial={false}
											animate={{ width: `${scrollProgress * 100}%` }}
											transition={{
												duration: 0.15,
												ease: "linear",
												stiffness: 200,
												damping: 20
											}}
										/>
									)}
								</motion.div>
							)}

							{/* Text with animation */}
							<AnimatePresence mode="wait">
								{activeSection === index ? (
									<motion.span
										key="active"
										initial={false}
										animate={{
											scale: 1,
											transition: {
												type: "spring",
												stiffness: 400,
												damping: 25
											}
										}}
										className="relative z-10 whitespace-nowrap text-gray-900/70 font-semibold text-sm block"
									>
										{item.label}
									</motion.span>
								) : (
									<motion.span
										key="inactive"
										className="relative z-10 whitespace-nowrap text-gray-500 block"
									>
										{item.label}
									</motion.span>
								)}
							</AnimatePresence>
						</button>
					</div>
				))}
			</div>
		</div>
	)
}