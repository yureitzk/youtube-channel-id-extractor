import { test as it, expect } from '@playwright/test';

it('handles i18n routing', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveURL('/en');
});

it('handles not found pages', async ({ page }) => {
	await page.goto('/unknown');
	page.getByRole('heading', { name: 'Page not found' });
});

it("handles not found pages for routes that don't match the middleware", async ({
	page,
}) => {
	await page.goto('/test.png');
	page.getByRole('heading', { name: 'This page could not be found.' });

	await page.goto('/api/hello');
	page.getByRole('heading', { name: 'This page could not be found.' });
});
