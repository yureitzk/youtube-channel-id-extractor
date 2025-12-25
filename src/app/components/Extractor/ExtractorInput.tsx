import { useTranslations } from 'next-intl';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Search } from 'lucide-react';
import Spinner from './Spinner';

interface ExtractorInputProps {
	isPending: boolean;
}

export default function ExtractorInput({ isPending }: ExtractorInputProps) {
	const t = useTranslations('ExtractorInput');

	return (
		<Input
			name='channel_url'
			type='text'
			isRequired
			placeholder={t('placeholder')}
			size='lg'
			classNames={{
				inputWrapper: 'pr-0 ring-1 ring-neutral-300 dark:ring-0',
			}}
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
