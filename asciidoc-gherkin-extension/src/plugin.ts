const fs = require("fs");
const insert = require("./inserter");
const path = require("path");
import {DocumentReader} from "./model/document.reader";

// function search(obj: any, key: string, value: string, results: any[]) {
//    if (obj.hasOwnProperty(key) && obj[key] === value) {
//         results.push(obj);
//     } else {
//         for (const [k, v] of Object.entries(obj)) {
//             if (typeof v === "object") {
//                 search(v, key, value, results);
//             }
//         }
//     }
// }
//
// function pickleToAstNode(pickles, pickleId) {
//     //let tc = pickles.reduce([], p, n => p.push(...p.steps)); find(p => p.id === pickleId);
//     let pickle = pickles.reduce((p, n) => p.concat(n.steps), []).find(pickle => pickle.id === pickleId);
//     return pickle.astNodeIds;
// }

// function findDocument(feature, gherkinDocuments) {
//     for(let document of gherkinDocuments){
//         const documentFeatureTitle = document.feature.keyword + ': ' + document.feature.name;
//         if(feature.toLowerCase().includes(documentFeatureTitle.toLowerCase())) {
//             return document;
//         }
//     }

//     return null;
// }

// function astNodeIdToLines(astNodesIds, gherkinDocument, getSteps = false) {
//     let nodeToGet = getSteps ? astNodesIds.length - 1 : 0;
//     let results = [];
//     search(gherkinDocument, 'id', astNodesIds[nodeToGet], results);
//     return results.map(r => r.location);
// }

// function isTestCasePassed(testCaseId, testCaseSteps) {
//     let find = testCaseSteps
//         .filter(t => t.testCaseStartedId === testCaseId)
//         .find(t => t.testStepResult.status !== "PASSED");
//     return !find;
// }

// function getAstNodesForAttachment(attachment, startedTestCases, testCases, pickles) {
//     let startedTestCase = startedTestCases.find(tc => tc.id === attachment.testCaseStartedId)
//     let testCase = testCases.find(tc => tc.id === startedTestCase.testCaseId);
//     let testStep = testCase.testSteps.find(step => step.id === attachment.testStepId);
//     let pickleStep = pickles.flatMap(p => p.steps).find(s => s.id === testStep.pickleStepId)
//     return pickleStep.astNodeIds;
// }

// function getTestCaseInfoFromStartEvent(finishedTestCase, startedTestCases, testCases, pickles) {
//     let startedTestCase = startedTestCases.find(testCase => testCase.id === finishedTestCase.testCaseStartedId);
//     let testCase = testCases.find(testCase => testCase.id === startedTestCase.testCaseId);
//     let testCasePickle = pickles.find(pickle => testCase.pickleId === pickle.id);
//     return {testCase, testCasePickle};
// }

// function getTestCasesForCurrentDocument(testCases, pickles, gherkinDocument) {
//     let testCasePickles = pickles.filter(pickle => testCases.find((testCase) => testCase.pickleId === pickle.id));
//     let results = [];
//     let toReturn = [];
//     testCasePickles.map(pickle => search(gherkinDocument, 'id', pickle.astNodeIds[0], results));
//     return testCases.filter(testCase => results.find(res => res.id === testCases.id));
// }

function cleanImages(dir: string) {
    for (const file of dir) {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif')) {
            fs.unlink(path.join('images', file), (err: Error) => {
                if (err) throw err;
            });
        }
    }
}

export type Insertion = {
    line: number,
    content: string,
    inline: boolean
}


export const plugin = function (registry: any) {
    registry.preprocessor(function () {
        const self = this
        self.process(function (doc: any, reader: any) {
            if(!reader.lines.find((line: string) => line.toLowerCase().includes('feature:')) || reader.lines.length === 1) {
                return reader;
            }

            //const dir = fs.readdirSync('images');
            //cleanImages(dir);

            const docReader = new DocumentReader();
            docReader.getDocuments('messages.ndjson');
            let currentDocument = docReader.findDocumentForAsciidoc(reader.lines);

            let insertions: Insertion[] = [];

            if(!currentDocument){
                console.log(`Skipping ${reader.file} as no results in ndjson for it`);
                return reader;
            }

            for(let testCase of currentDocument.testCases) {
                insertions.push({
                    line: testCase.getLocation(),
                    content: ` ${testCase.getStatus()}`,
                    inline: true
                });
                //insertions.push({
                //    line: testCase.getLocation(),
                //    content: '+'
                //});
                //insertions.push({
                //    line: testCase.getLocation(),
                //    content: `.Screenshot`
                //});
                //insertions.push({
                //    line: testCase.getLocation(),
                //    content: `[%collapsible%close]`
                //});
                //insertions.push({
                //    line: testCase.getLocation()
                //    content: '===='
                //});
                // insertions.push({
                //     line: stepLines[0]?.line,
                //     content: ''
                // });
                //insertions.push({
                //    line: stepLines[0]?.line,
                //    // content: `image::${imageLocation}[]`
                //    content: `MY IMAGE`
                //});
                // insertions.push({
                //     line: stepLines[0]?.line,
                //     content: ''
                // });
                //insertions.push({
                //    line: stepLines[0]?.line,
                //    content: '===='
                //});
            }


            let result = insert(reader.source_lines, insertions);
            reader.lines = result.reverse();

            return reader;
        })
    })
};
