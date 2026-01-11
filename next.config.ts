import type { NextConfig } from 'next';
import withSerwistInit from '@serwist/next';
import createNextIntlPlugin from 'next-intl/plugin';
import { getWebsiteDomain } from '@lib/utils';

const allowedDomains = [
	getWebsiteDomain(),
	...(process.env.NODE_ENV !== 'production'
		? ['localhost:3000', '127.0.0.1:3000']
		: []),
];

const withSerwist = withSerwistInit({
	cacheOnNavigation: true,
	swSrc: 'src/app/sw.ts',
	swDest: 'public/sw.js',
	disable: process.env.NODE_ENV !== 'production',
});

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	serverExternalPackages: ['header-generator', 'pino', 'pinno-pretty'],
	reactStrictMode: true,
	allowedDevOrigins: allowedDomains,
	experimental: {
		serverActions: {
			bodySizeLimit: '1MB',
			allowedOrigins: allowedDomains,
		},
		optimizePackageImports: ['lucide-react', '@nextui-org/button'],
	},
};

export default withSerwist(withNextIntl(nextConfig));
