import { z } from 'zod';

const allowedYoutubeDomains = [
	'youtube.com',
	'www.youtube.com',
	'youtu.be',
	'm.youtube.com',
];
const waybackMachineDomain = 'web.archive.org';

export const urlSchema = z.object({
	url: z
		.preprocess((value) => {
			if (typeof value === 'string') {
				const trimmedValue = value.trim();
				if (trimmedValue.startsWith('@') && trimmedValue.length > 1) {
					return `https://www.youtube.com/${trimmedValue}`;
				}
				return trimmedValue;
			}
			return value;
		}, z.string().min(1, 'URL cannot be blank').url('URL must be valid'))
		.refine((value) => {
			try {
				const url = new URL(value);
				if (url.hostname.includes(waybackMachineDomain)) {
					return allowedYoutubeDomains.some((domain) =>
						url.pathname.includes(domain),
					);
				}
				return allowedYoutubeDomains.includes(url.hostname);
			} catch {
				return false;
			}
		}, 'Not supported URL'),
});
