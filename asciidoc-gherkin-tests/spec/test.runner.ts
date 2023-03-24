import {loadConfiguration, loadSupport, runCucumber} from '@cucumber/cucumber/api'
import asciidoctor from 'asciidoctor';
import {JSDOM} from "jsdom";
import * as fs from "fs";
import {register} from "@asciidoc-gherkin/extension";

export const cucumberRunner = async function (feature: string): Promise<Document> {
    const {runConfiguration} = await loadConfiguration({profiles: ['test']})
    runConfiguration.sources.paths = [feature];
    const support = await loadSupport(runConfiguration)

    const merged = {...runConfiguration, support}

    await runCucumber(merged)

    const adoc = asciidoctor();
    const registry = adoc.Extensions.create()
    register(registry)

    const doc = adoc.loadFile(feature, {'extension_registry': registry})

    let converted = doc.convert();
    try {
        fs.writeFileSync('spec/features/debug.html', converted);
    } catch (err) {
        console.error(err);
    }

    const dom = new JSDOM(converted);

    return dom.window.document;
};
