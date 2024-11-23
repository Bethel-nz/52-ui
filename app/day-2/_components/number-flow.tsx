'use client';

import { useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import NumberFlow from '@number-flow/react';

interface AnimatedNumberProps {
	value: number;
	suffix?: string;
	prefix?: string;
	delay?: number;
	className?: string;
}

export function AnimatedNumber({
	value,
	suffix = '',
	prefix = '',
	delay = 0,
	className = '',
}: AnimatedNumberProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	const [shouldShow, setShouldShow] = useState(false);

	useEffect(() => {
		if (isInView) {
			const timer = setTimeout(() => {
				setShouldShow(true);
			}, delay * 1000);

			return () => clearTimeout(timer);
		}
	}, [isInView, delay]);

	return (
		<span ref={ref} className={className}>
			{shouldShow ? (
				<>
					{prefix}
					<NumberFlow
						value={value}
						format={{ maximumFractionDigits: 0 }}
						transformTiming={{ duration: 1500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
						spinTiming={{ duration: 1500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
						opacityTiming={{ duration: 750, easing: 'ease-out' }}
						continuous={true}
						trend='increasing'
					/>
					{suffix}
				</>
			) : (
				<>
					{prefix}0{suffix}
				</>
			)}
		</span>
	);
}
