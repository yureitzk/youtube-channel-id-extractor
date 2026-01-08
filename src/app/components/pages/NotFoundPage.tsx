import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
	const t = useTranslations('NotFoundPage');

	return (
		<>
			<h1 className='text-center mx-auto mb-3'>{t('title')}</h1>
			<p className='max-w-[460px] mx-auto text-center'>{t('description')}</p>
		</>
	);
}
