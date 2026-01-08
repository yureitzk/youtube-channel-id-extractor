'use client';

import { useTranslations } from 'next-intl';
import { Pagination } from '@nextui-org/pagination';
import { useEffect, useState } from 'react';
import Channels from '@/app/components/features/channel/Channels';
import DeleteAllChannelsButton from '@/app/components/features/history/DeleteAllChannelsButton';
import { useStore } from '@hooks/useStore';
import SearchChannelInput from '@/app/components/features/history/SearchChannelInput';
import { useDebounce } from '@hooks/useDebounce';

export default function History() {
	const t = useTranslations('History');
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');

	const debouncedSearchQuery = useDebounce(searchQuery, 200);

	const { countAllChannels } = useStore();
	const totalChannelsCount = countAllChannels() || 0;

	const filteredChannelsCount = countAllChannels(debouncedSearchQuery) || 0;

	const channelsLimit = 5;
	const channelsTotal =
		filteredChannelsCount < channelsLimit
			? 1
			: Math.ceil(filteredChannelsCount / channelsLimit);

	useEffect(() => {
		if (currentPage > channelsTotal) {
			setCurrentPage(channelsTotal || 1);
		}
	}, [filteredChannelsCount, currentPage, channelsTotal]);

	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearchQuery]);

	const hasChannels = totalChannelsCount > 0;

	return (
		<>
			<h2 className='font-semibold'>{t('title')}</h2>
			<p className='mb-4'>{t('description')}</p>
			{hasChannels && (
				<>
					<SearchChannelInput
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						className='mb-3'
					/>
					<DeleteAllChannelsButton className='mb-5' />
				</>
			)}
			{filteredChannelsCount > 0 ? (
				<>
					<Channels
						searchQuery={debouncedSearchQuery}
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
			) : hasChannels && debouncedSearchQuery ? (
				<p className='text-center text-gray-600/90 dark:text-gray-300 py-8'>
					{t('noResultsFound')}
				</p>
			) : !hasChannels ? (
				<div className='text-center py-6'>
					<p className='mb-1'>{t('emptyState.title')}</p>
					<p className='text-sm'>{t('emptyState.description')}</p>
				</div>
			) : null}
		</>
	);
}
