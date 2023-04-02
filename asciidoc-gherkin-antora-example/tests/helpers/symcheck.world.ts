import { setWorldConstructor, World } from '@cucumber/cucumber';
import type { Browser, Page } from 'puppeteer';

export class SymcheckWorld extends World {
	public browser: Browser;
	public page: Page;
	public stepName: string;
}

setWorldConstructor(SymcheckWorld);
