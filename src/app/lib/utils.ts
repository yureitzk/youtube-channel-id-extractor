import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function generateChannelUrl(id: string): string {
	const baseUrl = 'https://www.youtube.com/channel';
	return `${baseUrl}/${id}`;
}

export function generateRsslUrl(id: string): string {
	const baseUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id';
	return `${baseUrl}=${id}`;
}
