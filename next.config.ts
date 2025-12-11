import type { NextConfig } from 'next';
import withSerwistInit from '@serwist/next';
import createNextIntlPlugin from 'next-intl/plugin';

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
	experimental: {
		serverActions: {
			bodySizeLimit: '1MB',
		},
		optimizePackageImports: ['lucide-react', '@nextui-org/button'],
	},
};

export default withSerwist(withNextIntl(nextConfig));
