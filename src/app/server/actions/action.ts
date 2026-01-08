'use server';

import { fetchChannelData } from '@lib/parser';
import { urlSchema } from '@lib/schemas';
import { ChannelType } from '@/app/types/channelType';

import { logger } from '@lib/logger';

const log = logger.child({ module: 'action' });

export async function fetchChannelAction(
	_: ChannelType,
	formData: FormData,
): Promise<ChannelType> {
	try {
		log.debug('Server channel action is running');
		const url = formData.get('channel_url') as string;
		const result = urlSchema.safeParse({ url });

		if (result.success) {
			const parsedUrl = result.data?.url;
			const data = await fetchChannelData(parsedUrl);
			return { message: '', data: data ?? null, errors: undefined };
		} else {
			const errorMessage = result.error.issues[0].message;
			const errors = result.error.issues.map((issue) => issue.message);

			return { message: errorMessage, data: null, errors: errors };
		}
	} catch (error) {
		log.error(error);
		if (typeof error === 'string') {
			return {
				message: 'Failed to process the URL',
				data: null,
				errors: [error],
			};
		}
		return {
			message: 'Failed to process the URL',
			data: null,
			errors: ['Unexpected error'],
		};
	}
}
