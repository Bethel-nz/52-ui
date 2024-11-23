'use client';

import Lenis from '@studio-freight/lenis';
import { ReactNode, useEffect } from 'react';

export function LenisWrapper({ children }: { children: Readonly<ReactNode> }) {
	useEffect(() => {
		const lenis = new Lenis();
		function raf(time: unknown) {
			lenis.raf(time as number);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
	});

	return <>{children}</>;
}
