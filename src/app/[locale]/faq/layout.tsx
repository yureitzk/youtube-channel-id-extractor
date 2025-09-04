import { getTranslations } from 'next-intl/server';

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'MetaDataFaq' });

	return {
		title: t('title'),
		description: t('description'),
		openGraph: {
			title: t('title'),
			description: t('description'),
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
