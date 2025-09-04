import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/schema';

export const useStore = () => {
	const addUniqueChannel = async (channelId: string, name: string) => {
		const existingChannel = await db.channels
			.where('channelId')
			.equals(channelId)
			.first();

		if (existingChannel && existingChannel.id !== undefined) {
			await deleteChannel(existingChannel.id);
		}

		await addChannel(channelId, name);
	};

	const addChannel = async (channelId: string, name: string) => {
		await db.channels.add({
			channelId,
			name,
		});
	};

	const deleteChannel = async (id: number) => {
		await db.channels.delete(id);
	};

	const deleteAllChannels = async () => {
		await db.channels.clear();
	};

	/* eslint-disable react-hooks/rules-of-hooks */
	const getAllChannels = (pageNumber: number, pageSize: number) => {
		const offset = (pageNumber - 1) * pageSize;

		return useLiveQuery(
			() => db.channels.reverse().offset(offset).limit(pageSize).toArray(),
			[offset, pageSize],
		);
	};

	const countAllChannels = useLiveQuery(async () => {
		return await db.channels.count();
	});

	return {
		addUniqueChannel,
		countAllChannels,
		deleteChannel,
		deleteAllChannels,
		getAllChannels,
	};
};
