'use client';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
	ssr: false,
	loading: () => <div className='w-full h-full bg-neutral-950 animate-pulse' />,
});

export function SplineBackground() {
	return (
		<div className='fixed inset-0 z-0 bg-neutral-950'>
			<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(23,23,23,0)_0%,_rgba(23,23,23,0.8)_100%)]' />
			<Spline
				scene='https://prod.spline.design/CVivIgO9hTQPuKUA/scene.splinecode'
				className='w-full h-full opacity-70'
			/>
		</div>
	);
}
