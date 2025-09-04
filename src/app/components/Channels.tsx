'use client';

import { useTranslations } from 'next-intl';
import { useStore } from '../hooks/useStore';
import { cn } from '../lib/utils';
import ChannelInfo from './ChannelInfo/ChannelInfo';

interface ChannelsProps {
	pageNumber: number;
	pageSize: number;
	className?: string;
}

export default function Channels({
	pageNumber,
	pageSize,
	className,
}: ChannelsProps) {
	const t = useTranslations('Channels');
	const { getAllChannels } = useStore();
	const channels = getAllChannels(pageNumber, pageSize);

	return (
		<ul className={cn(className)}>
			{channels === undefined ? (
				<li>{t('loadingText')}</li>
			) : (
				<>
					{channels?.map((channel, i) => (
						<li key={i} className='mb-3'>
							<ChannelInfo
								id={channel.id}
								channelId={channel.channelId}
								name={channel.name}
							/>
						</li>
					))}
				</>
			)}
		</ul>
	);
}
