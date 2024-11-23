'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useNavigation } from './navigation-context';

const navItems = [
	{ href: '#', label: 'Home' },
	{ href: '#about', label: 'About' },
	{ href: '#services', label: 'Services' },
	{ href: '#work', label: 'Our Work' },
	{ href: '#pricing', label: 'Pricing' },
	{ href: '#testimonials', label: 'Testimonials' },
	{ href: '#contact', label: 'Contact' },
];

export function Navigation() {
	const { isOpen } = useNavigation();

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.nav
					className='fixed inset-x-0 top-0'
					initial={{ height: 0 }}
					animate={{ height: 'auto' }}
					exit={{ height: 0 }}
					transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
				>
					<div className='px-12 py-16'>
						<motion.div
							className='flex flex-row justify-center space-x-8'
							initial={{ opacity: 0.9, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3, delay: 0.1 }}
						>
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className='text-2xl font-medium text-white transition-opacity hover:opacity-70'
								>
									{item.label}
								</Link>
							))}
						</motion.div>
					</div>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}
