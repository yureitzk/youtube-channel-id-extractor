import type { MetadataRoute } from 'next';
import { getWebsiteDomain } from './lib/utils';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: []
		},
		sitemap: `https://${getWebsiteDomain()}/sitemap.xml`,
	};
}
