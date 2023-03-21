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


export const plugin = function (registry: any) {
    registry.preprocessor(function () {
        const self = this
        self.process(function (doc: any, reader: any) {
            if (!reader.lines.find((line: string) => line.toLowerCase().includes('feature:')) || reader.lines.length === 1) {
                return reader;
            }

            //const dir = fs.readdirSync('images');
            //cleanImages(dir);

            const docReader = new DocumentReader();
            docReader.getDocuments('messages.ndjson');
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
