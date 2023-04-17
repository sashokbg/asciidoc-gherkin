import expect from "expect";

let cucumberRunner: (arg: string) => Promise<Document> = undefined;

describe('Gherkin With Asciidoc', () => {
    beforeEach(() => {
        cucumberRunner = require("./test.runner").cucumberRunner;
    })

    afterEach(() => {
        jest.resetModules();
    })

    it('Inserts results on Rule / Example', async () => {
        let document = await cucumberRunner('spec/features/simple.feature.adoc');

        expect(document.getElementById('_example_simple_example').textContent).toContain('✔');
    });

    it('Insert results on Scenarios', async () => {
        let document = await cucumberRunner('spec/features/simple-scenario.feature.adoc');
        expect(document.getElementById('_scenario_simple_example').textContent).toContain('✔');
    });

    it('Puts question mark for non-implemented features', async () => {
        let document = await cucumberRunner('spec/features/non-implemented-steps.feature.adoc');

        expect(document.getElementById('_example_non_implemented_example').textContent).toContain('❓');
    });


    it('Insert results on Steps', async () => {
        let document = await cucumberRunner('spec/features/simple-scenario.feature.adoc');
        let stepText = 'Given A';

        const xpath = `//*[contains(text(),'${stepText}')]`;
        const res = document.evaluate(xpath, document, null, 9);

        expect(res.singleNodeValue.textContent).toContain('✔');
    });

    it('Has multiple results for scenario outlines', async () => {
        let document = await cucumberRunner('spec/features/outline.feature.adoc');

        expect(document.getElementById('_scenario_outline_eating').textContent).toContain('✔ ✔ ✔');
    })
});
