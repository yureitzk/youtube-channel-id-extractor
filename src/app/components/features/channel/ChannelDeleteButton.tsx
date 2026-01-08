import { useStore } from '@hooks/useStore';
import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';

interface ChannelDeleteButtonProps {
	id: number;
}

export default function ChannelDeleteButton({ id }: ChannelDeleteButtonProps) {
	const t = useTranslations('ChannelDeleteButton');
	const { deleteChannel } = useStore();
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		setLoading(true);
		try {
			await deleteChannel(id);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Button
			isIconOnly
			aria-label={t('label')}
			title={t('label')}
			size='sm'
			variant='light'
			onPress={handleDelete}
			isLoading={loading}
		>
			<Trash2 />
		</Button>
	);
}
