import Link from 'next/link';
import Image from 'next/image';

interface DayListProps {
	title: string;
	href: string;
	preview_image?: string;
}

export function DayList({ title, href, preview_image }: DayListProps) {
	return (
		<div className='border rounded-lg p-4 w-80 h-fit'>
			<Link href={href} prefetch={true}>
				<h3 className='text-lg font-semibold mb-2'>{title}</h3>
			</Link>
			{preview_image && (
				<Image
					src={preview_image}
					alt={title}
					width={100}
					height={100}
					className='rounded-lg object-contain '
				/>
			)}
		</div>
	);
}
