import { CursorProvider } from './_components/cursor-provider'

export default function DayThreeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<CursorProvider>
			<div className="relative min-h-dvh bg-black text-white cursor-none">
				<main>{children}</main>
			</div>
		</CursorProvider>
	)
} 