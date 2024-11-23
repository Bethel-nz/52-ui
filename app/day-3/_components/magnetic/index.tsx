'use client';
import { useRef, useState } from 'react';
import { motion } from 'motion/react';

export function Magnetic({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleMouse = (e: React.MouseEvent) => {
		const { clientX, clientY } = e;
		const { height, width, left, top } = ref.current?.getBoundingClientRect() || {
			height: 0,
			width: 0,
			left: 0,
			top: 0,
		};
		const middleX = clientX - (left + width / 2);
		const middleY = clientY - (top + height / 2);
		setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
	};

	const reset = () => {
		setPosition({ x: 0, y: 0 });
	};

	const { x, y } = position;
	return (
		<motion.div
			className='relative'
			ref={ref}
			onMouseMove={handleMouse}
			onMouseLeave={reset}
			animate={{ x, y }}
			transition={{ type: 'spring', stiffness: 350, damping: 5, mass: 0.5 }}
		>
			{children}
		</motion.div>
	);
}
