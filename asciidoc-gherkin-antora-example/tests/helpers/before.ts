import { Before, BeforeStep } from '@cucumber/cucumber';
import puppeteer from 'puppeteer';

BeforeStep(async function (step) {
	// step.testStepId
	// this.stepName = `${step.gherkinDocument.feature.name}_${step.pickle.name}_${step.pickleStep.text}`
});

Before(async function () {
	const browser = await puppeteer.launch({
		defaultViewport: null,
		headless: false,
	});

	this.browser = browser;
	this.page = (await browser.pages())[0] || (await browser.newPage());
});
