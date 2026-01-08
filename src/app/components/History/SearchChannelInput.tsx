import { useTranslations } from 'next-intl';
import GenericInput from '@/app/components/GenericInput';

interface SearchChannelInputProps {
	searchQuery: string;
	onSearchChange: (value: string) => void;
	className?: string;
}

export default function SearchChannelInput({
	searchQuery = '',
	className = '',
	onSearchChange,
}: SearchChannelInputProps) {
	const t = useTranslations('History');

	return (
		<GenericInput
			type='text'
			onValueChange={onSearchChange}
			placeholder={t('search')}
			value={searchQuery}
			inputWrapperClassName={className}
			isClearable
			onClear={() => onSearchChange('')}
		/>
	);
}
