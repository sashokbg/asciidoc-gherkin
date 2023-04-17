const fs = require("fs");
const insert = require("./inserter");
const path = require("path");
import {DocumentReader} from "./model/document.reader";

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

export const register = function (registry: any) {
    registry.preprocessor(function () {
        const self = this
        self.process(function (doc: any, reader: any) {
            console.log('Processor started for', reader.file);
            if (!reader.lines.find((line: string) => line.toLowerCase().includes('feature:')) || reader.lines.length === 1) {
                console.log('Skipping', reader.file);
                return reader;
            }

            const docReader = new DocumentReader();

            let messagesFileLocation = 'messages.ndjson';
            if (!fs.existsSync(messagesFileLocation)) {
                console.log(`Messages file not found at ${messagesFileLocation}. Please run your cucumber tests first !`)
                return reader;
            }

            docReader.getDocuments(messagesFileLocation);
            let currentDocument = docReader.findDocumentForAsciidoc(reader.lines);

            let insertions: Insertion[] = [];

            if (!currentDocument) {
                console.log(`Skipping ${reader.file} as no results in ndjson for it`);
                return reader;
            }

            for (let testCase of currentDocument.testCases) {
                insertions.push({
                    line: testCase.getLocation(),
                    content: ` ${testCase.getStatus()}`,
                    inline: true
                });
            }

            for (let testStep of currentDocument.testSteps) {
                insertions.push({
                    line: testStep.getLocation(),
                    content: ` ${testStep.getStatus()}`,
                    inline: true
                });
            }

            let result = insert(reader.source_lines, insertions);
            reader.lines = result.reverse();

            return reader;
        })
    })
};
