const {CustomFlavorRegistry} = require("@cucumber/gherkin");
const {GherkinInAsciidocTokenMatcher} = require("@asciidoc-gherkin/flavor");

CustomFlavorRegistry.getInstance().registerFlavor('asciidoc', 'adoc', new GherkinInAsciidocTokenMatcher());

module.exports = {
    default: {
        format: ['summary', 'progress-bar', 'message:messages.ndjson'],
        paths: ["spec/features/**/*.{feature,feature.adoc}"],
        require: ["spec/glue/**/*.ts"],
        requireModule: ['ts-node/register']
    },
    test: {
        format: ['message:messages.ndjson'],
        require: ["spec/glue/**/*.ts"],
        requireModule: ['ts-node/register']
    }
}
