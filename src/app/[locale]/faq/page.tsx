import { useTranslations } from 'next-intl';
import Questions from '@/app/components/Faq/Questions';

export default function Faq() {
	const t = useTranslations('Faq');

	return (
		<div className='max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
			<h1 className='text-2xl sm:text-4xl font-bold text-center mb-8'>
				{t('title')}
			</h1>
			<Questions />
		</div>
	);
}
