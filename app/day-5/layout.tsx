import { ReactNode } from 'react';
import { LenisWrapper } from './_components/lenis-wrapper';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-space-grotesk',
});

export default function Layout({ children }: { children: Readonly<ReactNode> }) {
	return (
		<div className={`${spaceGrotesk.variable} font-space-grotesk`}>
			<LenisWrapper>{children}</LenisWrapper>
		</div>
	);
}
