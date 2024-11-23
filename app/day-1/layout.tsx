import { ReactNode } from 'react';
import { LoaderProvider } from './_components/LoaderContext';

export default function DayOneLayout({ children }: { children: Readonly<ReactNode> }) {
	return <LoaderProvider>{children}</LoaderProvider>;
}
