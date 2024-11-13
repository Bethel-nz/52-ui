import { TOCProvider } from './_components/toc-context'
import { Nav } from './_components/nav'
import { LenisWrapper } from './_components/lenis-wrapper'
import { BlobityProvider } from './_components/blobity-provider'

export default function DayTwoLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<BlobityProvider />
			<div className="relative min-h-dvh bg-white text-gray-800" data-blobity="true" data-blobity-magnetic="false">
				<TOCProvider>
					<Nav />
					<main>
						<LenisWrapper>
							{children}
						</LenisWrapper>
					</main>
				</TOCProvider>
			</div>
		</>
	)
}
