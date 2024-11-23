'use client';

import localFont from 'next/font/local';
import { LenisWrapper } from './_components/lenis-wrapper';
import { NavigationProvider } from './_components/navigation-context';
import { motion } from 'motion/react';
import { Navigation } from './_components/navigation';
import { ReactNode } from 'react';
import { useNavigation } from './_components/navigation-context';

const proximaNova = localFont({
	src: [
		{
			path: '../fonts/proximanova-regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../fonts/proximanova-medium.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../fonts/proximanova-semibold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../fonts/proximanova-bold.otf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-proxima-nova',
});

function LayoutContent({ children }: { children: ReactNode }) {
	const { isOpen } = useNavigation();

	return (
		<div className={`min-h-screen bg-neutral-800 ${proximaNova.variable} font-proxima-nova`}>
			<Navigation />
			<motion.main
				className={`origin-top transition-all duration-300 ${isOpen && ' rounded-lg shadow-2xl '}`}
				animate={{
					scale: isOpen ? 0.98 : 1,
					y: isOpen ? 240 : 0,
				}}
				transition={{
					duration: 0.4,
					ease: [0.32, 0.72, 0, 1],
				}}
			>
				<LenisWrapper>{children}</LenisWrapper>
			</motion.main>
		</div>
	);
}

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<NavigationProvider>
			<LayoutContent>{children}</LayoutContent>
		</NavigationProvider>
	);
}
