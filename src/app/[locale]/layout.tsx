import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import '@/app/globals.css';
import { getWebsiteDomain } from '@lib/utils';
import { Providers } from '@/app/providers';
import { routing } from '@/i18n/routing';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export async function generateMetadata({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'MetaData' });

	const titleContent = t('title');
	const descriptionContent = t('description');
	const keywords = t('keywords');

	return {
		authors: [
			{
				url: 'https://github.com/yureitzk',
				name: 'yureitzk',
			},
		],
		title: {
			template: `%s | ${titleContent}`,
			default: `${titleContent}`,
		},
		openGraph: {
			type: 'website',
			url: `https://${getWebsiteDomain()}`,
			description: `${descriptionContent}`,
			title: {
				template: `%s | ${titleContent}`,
				default: `${titleContent}`,
			},
			siteName: `${titleContent}`,
		},
		description: `${descriptionContent}`,
		keywords: keywords,
	};
}

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		// Add suppressHydrationWarning this is what the official documentation says
		// https://github.com/pacocoursey/next-themes
		<html lang={locale} suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<NextIntlClientProvider>
					<Providers themeProps={{ attribute: 'class' }}>
						<div className='m-auto flex min-h-full max-w-screen-md flex-col px-4'>
							<Header />
							<main>{children}</main>
							<Footer className='mt-auto' />
						</div>
					</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
