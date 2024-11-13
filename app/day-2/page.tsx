import { BlurText } from './_components/blur-text'
import ReactCountryFlag from "react-country-flag"
import { SectionCard } from './_components/section-card'
import Image from 'next/image'
import { TrackedSection } from './_components/tracked-section'
import { AnimatedGradient } from './_components/animated-gradient'
import { AnimatedNumber } from './_components/number-flow'

const sections = [
	{
		gradient: {
			from: '#1a1a1a',
			via: '#404040',
			to: '#666666'
		},

		description: "Building digital products with a focus on motion and interaction. Every animation serves a purpose."
	},
	{
		gradient: {
			from: '#2c2c2c',
			via: '#4a4a4a',
			to: '#808080'
		},
		description: "Crafting user interfaces that blend aesthetics with functionality. Simple, yet thoughtfully detailed."
	},
	{
		gradient: {
			from: '#000000',
			via: '#333333',
			to: '#595959'
		},
		description: "Creating design systems that scale. From components to complete experiences."
	},
	{
		gradient: {
			from: '#262626',
			via: '#4d4d4d',
			to: '#737373'
		},
		description: "Exploring the boundaries between code and design. Where creativity meets technology."
	}
]

export default function Page() {
	return (
		<>
			<TrackedSection sectionId={0} className="min-h-fit">
				<div className="min-h-fit px-16 py-24 max-w-6xl mx-auto relative">
					<div className="flex">
						<div className="flex gap-x-16 items-start">
							{/* Profile Image with Effect */}
							<div className="relative w-[400px] h-[300px] group"
								data-blobity="true"
								data-blobity-magnetic="true"
								data-blobity-radius="8"
								data-blobity-offset-x="4"
								data-blobity-offset-y="4">
								<div className="absolute inset-0 rounded-2xl overflow-hidden">
									<Image
										src="/day-2/alex.webp"
										alt="Profile"
										fill
										className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 group-hover:to-black/10 transition-all duration-700" />
									<AnimatedGradient />
								</div>
							</div>

							{/* Text Content */}
							<div className="flex flex-col justify-between h-[250px] max-w-xl">
								{/* Main Content */}
								<div className="space-y-6">
									<BlurText className="text-4xl font-medium tracking-tight">
										Hi, I&apos;m{' '}
										<span className="text-gray-800">Alex</span> - <span>Kepler</span>
									</BlurText>

									<BlurText className="text-xl text-gray-600" delay={0.1}>
										Software engineer and designer crafting interfaces with meticulous attention to detail.
									</BlurText>

									<BlurText className="text-lg text-gray-500" delay={0.2}>
										Currently building user experiences at <a className="text-semibold text-gray-900 hover:text-black"
											href='https://vercel.com'
											data-blobity="true"
											data-blobity-magnetic="true"
											data-blobity-radius="4"
											data-blobity-tooltip="Building the future of web development"
											target='_blank'>Vercel</a>, previously at <a className="text-semibold text-gray-900 hover:text-purple-800"
												data-blobity="true"
												data-blobity-magnetic="true"
												data-blobity-radius="4"
												data-blobity-tooltip="Revolutionizing online payments"
												href='https://stripe.com'
												target='_blank'>Stripe</a>.
									</BlurText>
								</div>

								{/* Middle Stats */}
								<div className="space-y-2 mt-4">
									<BlurText className="text-sm text-gray-400" delay={0.3}>
										<span className="font-medium text-gray-600">
											<AnimatedNumber
												value={5}
												suffix="+"
												delay={1.5}
												className="font-medium text-gray-600"
											/> years
										</span> of experience in web development
									</BlurText>
									<BlurText className="text-sm text-gray-400" delay={0.4}>
										<span className="font-medium text-gray-600">
											<AnimatedNumber
												value={20}
												suffix="+"
												delay={1.6}
												className="font-medium text-gray-600"
											/> projects
										</span> delivered successfully
									</BlurText>
								</div>

								{/* Bottom Info */}
								<div className="mt-5">

									<BlurText
										className="text-sm text-gray-400 flex items-center gap-x-2"
										delay={0.6}
									>
										<span>Stockholm, Sweden</span>
										<ReactCountryFlag countryCode="SE" className='size-4 shadow-sm' svg />
									</BlurText>
								</div>
							</div>
						</div>
					</div>
				</div>
			</TrackedSection>

			<TrackedSection
				sectionId={1}
				className="min-h-screen"
				isArray={true}
				arrayLength={sections.length}
			>
				<div className="w-full px-16 py-24">
					<div className="max-w-6xl mx-auto space-y-[12vh]">
						<BlurText className="text-2xl font-medium text-center">
							Projects
						</BlurText>
						{sections.map((section, index) => (
							<SectionCard
								key={section.gradient.from}
								gradient={section.gradient}
								description={section.description}
								index={index}
							/>
						))}
					</div>
				</div>
			</TrackedSection>

			<TrackedSection sectionId={2} className="min-h-[50vh]">
				<div className="w-full px-16 py-24">
					<div className="max-w-6xl mx-auto text-center space-y-6">
						<BlurText className="text-2xl font-medium">
							Let&apos;s create something together.
						</BlurText>
						<BlurText
							className="text-lg text-gray-600 hover:text-gray-900 transition-colors duration-300"
							delay={0.2}
						>
							<a href="mailto:alex.kepler@mail.box"
								className="relative group"
								data-blobity="true"
								data-blobity-magnetic="true"
								data-blobity-radius="4"
								data-blobity-tooltip="Drop me a line">
								<span className="inline-block">alex.kepler@mail.box</span>
								<span className="absolute bottom-0 left-0 w-0 h-px bg-gray-400 group-hover:w-full transition-all duration-300" />
							</a>
						</BlurText>
					</div>
				</div>
			</TrackedSection>
		</>
	)
}

