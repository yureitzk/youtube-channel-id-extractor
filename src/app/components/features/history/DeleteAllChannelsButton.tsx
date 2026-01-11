import { useStore } from '@hooks/useStore';
import { cn } from '@lib/utils';
import { Button } from '@nextui-org/button';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/modal';
import { Eraser } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface DeleteAllChannelsButtonProps {
	className?: string;
}

export default function DeleteAllChannelsButton({
	className,
}: DeleteAllChannelsButtonProps) {
	const t = useTranslations('DeleteAllChannelsButton');
	const { deleteAllChannels } = useStore();
	const [loading, setLoading] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const handleDelete = async () => {
		setLoading(true);
		try {
			await deleteAllChannels();
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Button
				size='sm'
				startContent={<Eraser className='h-5 w-5' />}
				color='danger'
				onPress={onOpen}
				className={cn(className, 'font-medium')}
			>
				{t('clear')}
			</Button>

			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>{t('title')}</ModalHeader>
							<ModalBody>
								<p>
									{t.rich('note', {
										strong: (chunks) => <strong>{chunks}</strong>,
									})}
								</p>
								{t('confirmation')}
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									{t('cancel')}
								</Button>
								<Button color='primary' onPress={handleDelete} isLoading={loading}>
									{t('confirm')}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
