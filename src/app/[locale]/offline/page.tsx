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
			<div className='p-6 flex flex-col items-center justify-center text-center'>
				<h1 className='text-3xl mb-4'>{t('title')}</h1>
				<p className='mb-6'>{t('message')}</p>
				<RefreshButton />
			</div>
		</>
	);
}
