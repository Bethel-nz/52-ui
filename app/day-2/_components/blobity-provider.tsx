'use client'

import useBlobity from 'blobity/lib/react/useBlobity'

export function BlobityProvider() {
	useBlobity({
		licenseKey: 'your_license_key', // Replace with your license key
		focusableElements: '[data-blobity], a:not([data-no-blobity]), button:not([data-no-blobity]), [data-blobity-tooltip]',
		color: 'rgb(180, 180, 180)',
		dotColor: '#000000',
		invert: false,
		focusableElementsOffsetX: 0,
		focusableElementsOffsetY: 0,
		radius: 4,
		font: 'sans-serif',
		fontWeight: 400,
		fontSize: 16,
		fontColor: '#000000',
		magnetic: true,
	})

	return null
} 