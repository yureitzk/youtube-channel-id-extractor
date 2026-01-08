'use client';

import { useTranslations } from 'next-intl';
import { Pagination } from '@nextui-org/pagination';
import { useEffect, useState } from 'react';
import Channels from '@/app/components/features/channel/Channels';
import DeleteAllChannelsButton from '@/app/components/features/history/DeleteAllChannelsButton';
import { useStore } from '@hooks/useStore';
import SearchChannelInput from '@/app/components/features/history/SearchChannelInput';

export default function History() {
	const t = useTranslations('History');

	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');

	const { countAllChannels } = useStore();
	const channelsCount = countAllChannels(searchQuery) || 0;
	const channelsLimit = 5;
	const channelsTotal =
		channelsCount < channelsLimit ? 1 : Math.ceil(channelsCount / channelsLimit);

	useEffect(() => {
		if (currentPage > channelsTotal) {
			setCurrentPage(channelsTotal || 1);
		}
	}, [channelsCount, currentPage, channelsTotal]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchQuery]);

	return (
		<>
			<h2 className='font-semibold'>{t('title')}</h2>
			<p className='mb-4'>{t('description')}</p>

			<SearchChannelInput
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
				className='mb-3'
			/>

			{channelsCount > 0 && (
				<>
					<DeleteAllChannelsButton className='mb-5' />

					<Channels
						searchQuery={searchQuery}
						pageNumber={currentPage}
						pageSize={channelsLimit}
						className='mb-5'
					/>

					<Pagination
						page={currentPage}
						total={channelsTotal}
						onChange={setCurrentPage}
					/>
				</>
			)}
		</>
	);
}
