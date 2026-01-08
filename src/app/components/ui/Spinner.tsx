import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

export default function Spinner() {
	const t = useTranslations('Spinner');
	const { resolvedTheme } = useTheme();

	const borderColor =
		resolvedTheme === 'dark' ? 'border-white-500' : 'border-gray-400';

	return (
		<div
			className={`inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid ${borderColor} border-t-transparent`}
			role='status'
		>
			<span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
				{t('text')}
			</span>
		</div>
	);
}
