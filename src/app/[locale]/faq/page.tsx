import { useTranslations } from 'next-intl';
import Questions from '@/app/components/features/faq/Questions';

export default function Faq() {
	const t = useTranslations('Faq');

	return (
		<div className='mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8'>
			<h1 className='mb-8 text-center text-2xl font-bold sm:text-4xl'>
				{t('title')}
			</h1>
			<Questions />
		</div>
	);
}
