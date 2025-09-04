import { getTranslations } from 'next-intl/server';

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'MetaDataHistory' });

	return {
		title: t('title'),
		openGraph: {
			title: t('title'),
		},
	};
}

export default function FaqLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
