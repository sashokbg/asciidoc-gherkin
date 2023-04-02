import { After } from '@cucumber/cucumber';
import type { Browser } from 'puppeteer';

After(async function () {
	const browser: Browser = this.browser;

	if (this.browser) {
		await browser.close();
	}
});
