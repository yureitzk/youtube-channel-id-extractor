import 'server-only';

import * as cheerio from 'cheerio';
import { HeaderGenerator } from 'header-generator';

function findValueByKeyPath<T>(
	obj: T,
	keyPath: (obj: T) => string | null,
): string | null {
	if (typeof obj !== 'object' || obj === null) return null;

	const browseId = keyPath(obj);
	if (browseId) return browseId;

	for (const key in obj) {
		const value = obj[key as keyof T];
		if (typeof value === 'object' && value !== null) {
			const result = findValueByKeyPath(value as T, keyPath);
			if (result) return result;
		}
	}

	return null;
}

type Headers = Record<string, string>;
export function getHeaders(headers = {}): Headers {
	const headerGenerator = new HeaderGenerator({
		browsers: [
			{ name: 'firefox', minVersion: 95 },
			{ name: 'chrome', minVersion: 114 },
			{ name: 'edge', minVersion: 114 },
			'safari',
		],
		devices: ['desktop', 'mobile'],
		operatingSystems: ['windows', 'macos'],
		locales: ['en-US', 'en'],
	});

	return Object.assign(headers, headerGenerator.getHeaders());
}

export async function extractChannelIdFromHtml(html: string): Promise<string> {
	try {
		const extractors = [
			extractChannelIdFromHtmlRss,
			extractChannelIdFromHtmlJson,
			extractChannelIdFromHtmlMetaTag,
			extractChannelIdFromFeedXml,
		];

		for (const extractor of extractors) {
			const id = await extractor(html);
			if (id) return id.trim();
		}

		throw new Error('Channel ID not found in HTML');
	} catch (error) {
		throw new Error(
			`An error occurred while extracting channel ID from HTML: ${error}`,
		);
	}
}

export async function extractChannelIdFromHtmlRss(
	html: string,
): Promise<string | null> {
	const rssHref = extractRssHrefFromHtml(html);
	if (rssHref) {
		const id = await extractChannelIdFromRsslHref(rssHref);
		return id;
	}
	return null;
}

function extractRssHrefFromHtml(html: string): string | null {
	const $ = cheerio.load(html);

	const linkElement = $('link[rel="alternate"][type="application/rss+xml"]');
	const href = linkElement.attr('href');

	return href || null;
}

async function extractChannelIdFromRsslHref(
	href: string,
): Promise<string | null> {
	const url = new URL(href);
	const searchParams = url.searchParams;
	const channelId = searchParams.get('channel_id');

	return channelId;
}

export async function extractChannelIdFromHtmlMetaTag(
	html: string,
): Promise<string | null> {
	const $ = cheerio.load(html);

	const linkElement = $('meta[itemprop="channelId"]');
	const id = linkElement.attr('content');

	return id || null;
}

async function extractChannelIdFromFeedXml(
	html: string,
): Promise<string | null> {
	const $ = cheerio.load(html);

	const idElement = $('yt\\:channelId').first();
	const id = `UC${idElement.text()}`;

	return id || null;
}

export async function extractChannelIdFromHtmlJson(
	html: string,
): Promise<string | null> {
	const $ = cheerio.load(html);
	let channelId: string | null = null;

	$('script').each((_, element) => {
		const scriptContent = $(element).html();
		if (
			scriptContent &&
			(scriptContent.includes('structuredDescriptionContentRenderer') ||
				scriptContent.includes('twoColumnWatchNextResults') ||
				scriptContent.includes('twoColumnBrowseResultsRenderer'))
		) {
			const match =
				scriptContent.match(/var ytInitialData = ({[\s\S]*?});/) ||
				scriptContent.match(/window\["ytInitialData"\] = ({[\s\S]*?});/);

			if (match) {
				try {
					const jsonData = JSON.parse(match[1]);

					channelId = findValueByKeyPath(
						jsonData,
						(obj) =>
							obj.videoDescriptionHeaderRenderer?.channelNavigationEndpoint
								?.browseEndpoint?.browseId || null,
					);

					if (!channelId) {
						channelId = findValueByKeyPath(
							jsonData,
							(obj) =>
								obj.videoOwnerRenderer?.title?.runs?.[0]?.navigationEndpoint
									?.browseEndpoint?.browseId || null,
						);
					}

					if (!channelId) {
						channelId = findValueByKeyPath(
							jsonData,
							(obj) => obj.tabRenderer?.endpoint?.browseEndpoint?.browseId || null,
						);
					}
					if (channelId) return false;
				} catch (error) {
					console.error('Failed to parse JSON:', error);
				}
			}
		}
	});

	return channelId;
}

export async function extractChannelNameFromHtml(
	html: string,
	channelUrl: string,
): Promise<string> {
	try {
		const extractors = [
			extractChannelNameFromHtmlJson,
			extractChannelNameFromHtmlLinkTag,
			async () => {
				const response = await customFetch(channelUrl);
				const newHtml = await extractHtml(response);
				return extractChannelNameFromHtmlLinkTag(newHtml);
			},
			extractChannelNameFromHtmlMetaTag,
			extractChannelNameFromAuthorXmlTag,
		];

		for (const extractor of extractors) {
			const name = await extractor(html);
			if (name) return name.trim();
		}

		throw new Error('Channel name not found in HTML');
	} catch (error) {
		throw new Error(
			`Failed to extract channel name from HTML: ${(error as Error).message}`,
		);
	}
}

async function extractChannelNameFromHtmlMetaTag(
	html: string,
): Promise<string | null> {
	const $ = cheerio.load(html);

	const metaElement = $('meta[itemprop="name"]');
	const name = metaElement.attr('content');

	return name || null;
}

async function extractChannelNameFromAuthorXmlTag(
	html: string,
): Promise<string | null> {
	const $ = cheerio.load(html);

	const nameElement = $('feed author name').first();
	const name = nameElement.text();

	return name || null;
}

async function extractChannelNameFromHtmlLinkTag(
	html: string,
): Promise<string | null> {
	const $ = cheerio.load(html);

	const linkElement = $('link[itemprop="name"]');
	const name = linkElement.attr('content');

	return name || null;
}

async function extractChannelNameFromHtmlJson(
	html: string,
): Promise<string | null> {
	const $ = cheerio.load(html);
	let channelName: string | null = null;

	$('script').each((_, element) => {
		const scriptContent = $(element).html();
		if (
			scriptContent &&
			(scriptContent.includes('structuredDescriptionContentRenderer') ||
				scriptContent.includes('twoColumnWatchNextResults') ||
				scriptContent.includes('afv_ad_tag_restricted_to_instream') ||
				scriptContent.includes('args'))
		) {
			// Only in old versions of YouTube
			const match =
				scriptContent.match(/window\["ytInitialData"\] = ({[\s\S]*?});/) ||
				scriptContent.match(
					/var\s+ytplayer\s*=\s*ytplayer\s*\|\|\s*{};\s*ytplayer\.config\s*=\s*(\{[\s\S]*?\})(?=;|\n)/,
				);

			if (match) {
				const jsonData = JSON.parse(match[1]);

				channelName = findValueByKeyPath(
					jsonData,
					(obj) => obj.videoOwnerRenderer?.title?.runs?.[0]?.text || null,
				);

				if (!channelName)
					channelName = findValueByKeyPath(
						jsonData,
						(obj) => obj.args?.author || null,
					);

				if (channelName) return false;
			}
		}
	});

	return channelName;
}

export async function extractHtml(response: Response): Promise<string> {
	const text = await response.text();

	return text;
}

export async function customFetch(
	url: string,
	headers: Record<string, string> = {},
): Promise<Response> {
	const maxRetries = 2;

	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: getHeaders(headers),
			});

			if (!response.ok && response.status !== 404) {
				throw new Error(`Failed to access the host. Status: ${response.status}`);
			}

			return response;
		} catch (e: unknown) {
			if (attempt === maxRetries) {
				if (typeof e === 'string') {
					throw new Error(`Max retries reached. ${e}`);
				} else if (e instanceof Error) {
					throw new Error(`Max retries reached. ${e.message}`);
				} else {
					throw new Error('Max retries reached. Unknown error.');
				}
			}

			const delayMs = Math.pow(2, attempt) * 1000;
			await delay(delayMs);
		}
	}

	throw new Error('Max retries reached. Request failed without a response.');
}

export const delay = (ms: number) => {
	return new Promise(function (resolve) {
		setTimeout(resolve, ms);
	});
};

export function getWebsiteDomain(): string {
	const websiteDomain = process.env.WEBSITE_DOMAIN || 'example.com';

	return websiteDomain;
}

export async function getWaybackMachineSnapshotUrl(
	url: string,
): Promise<string | undefined> {
	try {
		const waybackMachineUrlConstructor = (url: string) => {
			return `https://archive.org/wayback/available?url=${url}`;
		};
		const response = await customFetch(waybackMachineUrlConstructor(url));

		if (!response) {
			throw new Error('No initial response');
		}

		const responseJson = await response.json();
		const snapshotUrl = responseJson?.archived_snapshots.closest?.url;

		if (!snapshotUrl) throw new Error('No snapshot URL');

		return snapshotUrl;
	} catch (error) {
		throw new Error(`Failed to process the URL: ${error}`);
	}
}
