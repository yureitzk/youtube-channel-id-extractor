import Dexie, { Table } from 'dexie';

export interface Channel {
	id?: number;
	channelId: string;
	name: string;
}

export class DB extends Dexie {
	channels!: Table<Channel>;
	constructor() {
		super('youtubeData');
		this.version(1).stores({
			channels: '++id, channelId, name',
		});
	}
}

export const db = new DB(); 
