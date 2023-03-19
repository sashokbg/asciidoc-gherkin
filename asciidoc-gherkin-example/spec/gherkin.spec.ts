import expect from "expect";

let cucumberRunner: any = undefined;

describe('Gherkin With Asciidoc', () => {
    beforeEach(() => {
        cucumberRunner = require("./test.runner").cucumberRunner;
    })

    afterEach(() => {
        jest.resetModules();
    })

    it('Should insert results for Examples', async () => {
        let document = await cucumberRunner('spec/features/simple.feature.adoc');

        expect(document.getElementById('_example_simple_example').textContent).toContain('☑');
    });

    it('Should insert results for Scenarios', async () => {
        let document = await cucumberRunner('spec/features/simple-scenario.feature.adoc');

        expect(document.getElementById('_scenario_simple_example').textContent).toContain('☑');
    });
});
