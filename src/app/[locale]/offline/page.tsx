import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import RefreshButton from '@/app/components/offline/RefreshButton';

export const metadata: Metadata = {
	title: 'Offline',
};

export default function Offline() {
	const t = useTranslations('Offline');

	return (
		<>
			<div className='flex flex-col items-center justify-center p-6 text-center'>
				<h1 className='mb-4 text-3xl'>{t('title')}</h1>
				<p className='mb-6'>{t('message')}</p>
				<RefreshButton />
			</div>
		</>
	);
}
