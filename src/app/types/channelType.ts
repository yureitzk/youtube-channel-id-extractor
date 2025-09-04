export type ChannelType = {
	message: string;
	data: ChannelDataType | null;
	errors: undefined | string[];
};

export type ChannelDataType = {
	channelId: string;
	name: string;
};
