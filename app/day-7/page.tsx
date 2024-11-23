import { NavButton } from './_components/nav-button';
import { HeroSection } from './_components/hero-section';

export default function Page() {
	return (
		<div className='relative min-h-screen'>
			<NavButton />
			<HeroSection />
			<section className='flex justify-center items-center w-full min-h-screen bg-neutral-900'>
				RANDOM SPACE
			</section>
		</div>
	);
}
