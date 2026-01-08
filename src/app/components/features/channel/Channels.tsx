'use client';

import { useTranslations } from 'next-intl';
import { useStore } from '@hooks/useStore';
import { cn } from '@lib/utils';
import ChannelInfo from '@/app/components/features/channel/ChannelInfo';

interface ChannelsProps {
	pageNumber: number;
	pageSize: number;
	searchQuery?: string;
	className?: string;
}

export default function Channels({
	pageNumber,
	pageSize,
	searchQuery,
	className,
}: ChannelsProps) {
	const t = useTranslations('Channels');
	const { getAllChannels } = useStore();
	const channels = getAllChannels(pageNumber, pageSize, searchQuery);

	return (
		<ul className={cn(className)}>
			{channels === undefined ? (
				<li>{t('loadingText')}</li>
			) : (
				<>
					{channels?.map((channel, i) => (
						<li key={i} className='mb-4'>
							<ChannelInfo
								id={channel.id}
								channelId={channel.channelId}
								name={channel.name}
								searchQuery={searchQuery || ''}
							/>
						</li>
					))}
				</>
			)}
		</ul>
	);
}
