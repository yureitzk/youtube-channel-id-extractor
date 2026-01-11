import {
	extractChannelIdFromHtmlRss,
	extractChannelIdFromHtmlMetaTag,
} from './helpers';

describe('Extracts channel ID from HTML', () => {
	it('should extract channel ID from HTML containing an RSS link', async () => {
		const html = `
      <html>
        <head>
          <link rel="alternate" type="application/rss+xml" href="http://www.youtube.com/feeds/videos.xml?channel_id=UC-SOME_CHANNEL_ID">
        </head>
        <body></body>
      </html>
    `;
		expect(await extractChannelIdFromHtmlRss(html)).toBe('UC-SOME_CHANNEL_ID');
	});

	it('should extract the channel ID from a YouTube-like HTML meta tag', async () => {
		const youtubeHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>YouTube Channel</title>
          <meta itemprop="channelId" content="UC_xxxxxxxxxxxxxxxxxxxxx">
          <meta name="description" content="A description of the channel">
      </head>
      <body>
          <h1>Welcome to the Channel</h1>
          <p>Some content here.</p>
      </body>
      </html>
    `;

		const channelId = await extractChannelIdFromHtmlMetaTag(youtubeHtml);
		expect(channelId).toBe('UC_xxxxxxxxxxxxxxxxxxxxx');
	});
});
