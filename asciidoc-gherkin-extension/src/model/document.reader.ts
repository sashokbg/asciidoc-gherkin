import {GherkinDocument} from "./gherkin-document";
import fs from "fs";

export class DocumentReader {
    public documents: Array<GherkinDocument>;

    constructor() {
        this.documents = [];
    }

    getDocuments(file: string) {
        const fileLines = fs.readFileSync(file).toString('utf-8').split("\n");
        const ndjsonObjects = [];

        for (const line of fileLines) {
            if (line) {
                ndjsonObjects.push(JSON.parse(line));
            }
        }

        for (let obj of ndjsonObjects) {
            if (obj.gherkinDocument) {
                this.documents.push(new GherkinDocument(obj.gherkinDocument));
            }
            if (obj.pickle) {
                this.documents.forEach(doc => doc.addPickle(obj));
            }
            if (obj.testCase) {
                this.documents.forEach(doc => doc.addTestCase(obj.testCase));
            }
            if(obj.testCaseStarted) {
               this.documents.forEach(doc => doc.addTestCaseStarted(obj.testCaseStarted));
            }
            if(obj.testStepFinished) {
                this.documents.forEach(doc => doc.addTestStepFinished(obj.testStepFinished));
            }
        }
    }

    findDocumentForAsciidoc(lines: string[]) {
        let featureLine = lines.find(line => line.toLowerCase().includes('feature:'));

        if(!featureLine) {
            return undefined;
        }

        for(let document of this.documents){
            const documentFeatureTitle = document.title;
            if(featureLine.toLowerCase().includes(documentFeatureTitle.toLowerCase())) {
                return document;
            }
        }
    }
}