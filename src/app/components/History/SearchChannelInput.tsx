import { Input } from '@nextui-org/input';
import { useTranslations } from 'next-intl';

interface SearchChannelInputProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
}

export default function SearchChannelInput({
	searchQuery,
	onSearchChange,
}: SearchChannelInputProps) {
	const t = useTranslations('History');

	return (
		<Input
			type='text'
			onValueChange={onSearchChange}
			placeholder={t('search')}
			value={searchQuery}
			classNames={{
				inputWrapper: 'pr-0 ring-1 ring-neutral-300 dark:ring-0 mb-2',
			}}
		/>
	);
}
