import { useTranslations } from 'next-intl';
import { Button } from '@nextui-org/button';
import { Search } from 'lucide-react';
import Spinner from '@ui/Spinner';
import GenericInput from '@ui/GenericInput';

interface ExtractorInputProps {
	isPending: boolean;
}

export default function ExtractorInput({ isPending }: ExtractorInputProps) {
	const t = useTranslations('ExtractorInput');

	return (
		<GenericInput
			name='channel_url'
			type='text'
			isRequired
			placeholder={t('placeholder')}
			endContent={
				<Button
					type='submit'
					isIconOnly
					variant='light'
					aria-label={t('submitLabel')}
				>
					{isPending ? <Spinner /> : <Search className='h-5 w-5' />}
				</Button>
			}
		/>
	);
}
