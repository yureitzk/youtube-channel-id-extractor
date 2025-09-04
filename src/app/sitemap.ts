import type { MetadataRoute } from 'next';
import { getWebsiteDomain } from './lib/helpers';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `https://${getWebsiteDomain()}`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `https://${getWebsiteDomain()}/faq`,
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.7,
		},
	];
}
