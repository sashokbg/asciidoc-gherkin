const DocumentReader = require("../model/document.reader");
const {fail} = require("assert");
const {expect} = require("expect");

describe('document reader', () => {
    it('Should read pickles', () => {
        const docReader = new DocumentReader();
        docReader.getDocuments('messages.ndjson');

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
        docReader.getDocuments('messages.ndjson');

        expect(docReader.documents[0].testCases[0].getStatus()).toBe('PASSED');
        expect(docReader.documents.flatMap(doc => doc.testCases).map(testCase => testCase.getStatus())).toContain('FAILED');

        const lines = docReader.documents.flatMap(doc => doc.testCases).map(testCase => testCase.getLocation());

        expect(lines).not.toContain(undefined);
    })

    it('should find document for asciidoc', () => {
        const docReader = new DocumentReader();
        docReader.getDocuments('messages.ndjson');

        let document = docReader.findDocumentForAsciidoc(['toto', 'Feature: Interview']);

        expect(document).not.toBeUndefined();
    })
})