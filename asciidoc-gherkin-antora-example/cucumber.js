const { GherkinInAsciidocTokenMatcher } = require('@asciidoc-gherkin/flavor');
const { CustomFlavorRegistry } = require('@cucumber/gherkin');

CustomFlavorRegistry.getInstance().registerFlavor(
	'asciidoc',
	'adoc',
	new GherkinInAsciidocTokenMatcher(),
);

module.exports = {
	default: {
		requireModule: ['ts-node/register'],
		format: ['message:messages.ndjson', 'html:report.html'],
		paths: [
			'modules/**/pages/**/*.{feature,feature.adoc}',
		],
		require: ['tests/**/*.ts'],
	},
};
