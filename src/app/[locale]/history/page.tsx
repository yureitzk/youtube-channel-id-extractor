'use client';

import { useTranslations } from 'next-intl';
import { Pagination } from '@nextui-org/pagination';
import { useEffect, useState } from 'react';
import Channels from '@/app/components/Channels';
import DeleteAllChannelsButton from '@/app/components/History/DeleteAllChannelsButton';
import { useStore } from '@/app/hooks/useStore';

export default function History() {
	const t = useTranslations('History');

	const [currentPage, setCurrentPage] = useState(1);

	const { countAllChannels } = useStore();
	const channelsCount = countAllChannels || 0;
	const channelsLimit = 5;
	const channelsTotal =
		channelsCount < channelsLimit ? 1 : Math.ceil(channelsCount / channelsLimit);

	useEffect(() => {
		if (currentPage > channelsTotal) {
			setCurrentPage(channelsTotal);
		}
	}, [channelsCount, currentPage, channelsTotal]);

	return (
		<>
			<h2 className='font-semibold'>{t('title')}</h2>
			<p className='mb-4'>{t('description')}</p>

			{channelsCount > 0 && (
				<>
					<DeleteAllChannelsButton className='mb-5' />

					<Channels
						pageNumber={currentPage}
						pageSize={channelsLimit}
						className='mb-2'
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
