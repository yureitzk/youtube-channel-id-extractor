import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
	const t = useTranslations('NotFoundPage');

	return (
		<>
			<h1 className='mx-auto mb-3 text-center'>{t('title')}</h1>
			<p className='mx-auto max-w-[460px] text-center text-sm'>
				{t('description')}
			</p>
		</>
	);
}
