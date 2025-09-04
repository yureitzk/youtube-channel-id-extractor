'use server';

import { ChannelDataType } from '../types/channelType';
import {
	customFetch,
	extractChannelIdFromHtml,
	extractChannelNameFromHtml,
	extractHtml,
	getWaybackMachineSnapshotUrl,
} from './helpers';
import { generateChannelUrl } from './utils';

import { logger } from '@/app/lib/logger';

const log = logger.child({ module: 'parser' });

export async function fetchChannelData(url: string): Promise<ChannelDataType> {
	try {
		let response = await customFetch(url);

		if (response && response.status === 404) {
			const waybackMachineSnapshotUrl = await getWaybackMachineSnapshotUrl(url);
			if (waybackMachineSnapshotUrl) {
				response = await customFetch(waybackMachineSnapshotUrl);
				log.debug(`Fetched HTML from wayback machine ${url}`);
			}
		}
		log.debug(`Fetched HTML from ${url}`);

		if (!response) {
			throw new Error('No initial response');
		}

		const html = await extractHtml(response);
		const id = await extractChannelIdFromHtml(html);
		const channelUrl = generateChannelUrl(id);
		const name = await extractChannelNameFromHtml(html, channelUrl);

		return {
			channelId: id,
			name: name,
		};
	} catch (error) {
		log.error(error);
		throw new Error(`Failed to process the URL: ${error}`);
	}
}
