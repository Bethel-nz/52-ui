"use client"

import Lenis from '@studio-freight/lenis'
import { ReactNode, useEffect } from 'react';

export function LenisWrapper({ children }: { children: Readonly<ReactNode> }) {
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			smoothWheel: true,
			wheelMultiplier: 1,
			touchMultiplier: 2,
		})

		function raf(time: number) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)

		return () => {
			lenis.destroy()
		}
	}, [])

	return children
}