import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
	subsets: ['latin'],
	variable: '--font-space-grotesk',
})

export default function DayLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className={`${spaceGrotesk.variable} font-sans min-h-screen`}>
			{children}
		</div>
	)
} 