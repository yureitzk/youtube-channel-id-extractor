import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Youtube Channel Id Extractor',
		short_name: 'YT Channel Id Extractor',
		description: 'A tool to extract Youtube Channel ID',
		start_url: '/',
		display: 'standalone',
		background_color: '#ffffff',
		theme_color: '#374151',
		icons: [
			{
				src: '/icon-192x192.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/icon-512x512.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}
