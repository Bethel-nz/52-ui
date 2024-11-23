'use client';

import { useEffect } from 'react';
import Wheelz from 'wheelz';

export function ScrollProvider() {
	useEffect(() => {
		const wheelz = new Wheelz({
			preset: 'smooth',
			draggable: false,
		});

		return () => {
			wheelz.off(); // Clean up all event listeners
		};
	}, []);

	return null;
}
