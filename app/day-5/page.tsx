import { Nav } from './_components/nav'
// import Image from 'next/image'
// import { GradientCard } from './_components/gradient-card'

export default function Page() {
	return (
		<main className="bg-neutral-950">
			<Nav />

			{/* Hero Section */}
			<section className="flex flex-col justify-center items-center px-4 pt-16 pb-20 min-h-screen">
				<div className="flex flex-col items-center mx-auto w-full max-w-7xl">
					<div className="flex flex-col items-center space-y-8 text-white">
						<span className="px-4 py-2 text-sm font-medium rounded-full bg-white/10">
							Design & Development Studio
						</span>
						<h1 className="max-w-4xl text-6xl font-bold leading-tight text-center">
							Crafting Digital
							<span className="text-neutral-400"> Excellence</span>
						</h1>
						<p className="max-w-2xl text-lg text-center text-neutral-400">
							At Prism Digital, we transform ideas into exceptional digital experiences through innovative design and cutting-edge technology.
						</p>
					</div>

					<div className="flex gap-4 mt-12">
						<button className="px-6 py-3 text-black bg-white rounded-lg transition-all hover:bg-neutral-200 hover:scale-105">
							View Our Work
						</button>
						<button className="px-6 py-3 rounded-lg border transition-all hover:bg-white/10">
							Get in Touch
						</button>
					</div>
				</div>
			</section>


			<div className='min-h-screen'></div>
		</main>
	)
} 