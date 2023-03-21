import {DocumentReader} from "../model/document.reader";

const NDJSON_FILE = 'src/spec/messages.ndjson';

describe('document reader', () => {
    it('Should read pickles', () => {
        const docReader = new DocumentReader();
        docReader.getDocuments(NDJSON_FILE);

        docReader.documents.forEach(doc => doc.pickles.map(p => p.uri).reduce((prev, current) => {
            if (!prev) {
                return current
            }
            if (prev !== current) {
                fail('Bad');
            }
        }, undefined));
    });

    it('should read test cases lines', () => {
        const docReader = new DocumentReader();
        docReader.getDocuments(NDJSON_FILE);

        expect(docReader.documents[0].testCases[0].getStatus()).toBe('☑');
        expect(docReader.documents.flatMap(doc => doc.testCases).map(testCase => testCase.getStatus())).toContain('❌');

        const lines = docReader.documents.flatMap(doc => doc.testCases).map(testCase => testCase.getLocation());

        expect(lines).not.toContain(undefined);
    })

    it('should find document for asciidoc', () => {
        const docReader = new DocumentReader();
        docReader.getDocuments(NDJSON_FILE);

        let document = docReader.findDocumentForAsciidoc(['toto', 'Feature: Interview']);

        expect(document).not.toBeUndefined();
    })
})