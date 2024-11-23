'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CursorProvider({ children }: { children: React.ReactNode }) {
	const [isHovered, setIsHovered] = useState(false);
	const cursor = useRef(null);
	const cursorSize = isHovered ? 60 : 15;

	const mouse = {
		x: useMotionValue(0),
		y: useMotionValue(0),
	};

	const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
	const smoothMouse = {
		x: useSpring(mouse.x, smoothOptions),
		y: useSpring(mouse.y, smoothOptions),
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const { clientX, clientY } = e;
			const magneticElements = document.querySelectorAll('[data-magnetic="true"]');

			let isOverMagnetic = false;
			magneticElements.forEach((element) => {
				const rect = element.getBoundingClientRect();
				if (
					clientX >= rect.left &&
					clientX <= rect.right &&
					clientY >= rect.top &&
					clientY <= rect.bottom
				) {
					isOverMagnetic = true;
					const center = {
						x: rect.left + rect.width / 2,
						y: rect.top + rect.height / 2,
					};

					const distance = {
						x: clientX - center.x,
						y: clientY - center.y,
					};

					mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
					mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
				}
			});

			if (!isOverMagnetic) {
				mouse.x.set(clientX - cursorSize / 2);
				mouse.y.set(clientY - cursorSize / 2);
			}

			setIsHovered(isOverMagnetic);
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [cursorSize, mouse.x, mouse.y]);

	return (
		<>
			<motion.div
				className='fixed pointer-events-none z-50 rounded-full bg-neutral-300 mix-blend-difference'
				style={{
					left: smoothMouse.x,
					top: smoothMouse.y,
					width: cursorSize,
					height: cursorSize,
					scale: isHovered ? 1.2 : 1,
				}}
				transition={{
					type: 'spring',
					stiffness: 350,
					damping: 5,
				}}
				ref={cursor}
			/>
			{children}
		</>
	);
}
