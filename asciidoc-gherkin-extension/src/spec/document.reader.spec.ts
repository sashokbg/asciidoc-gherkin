import {DocumentReader} from "../model/document.reader";
import {FAILED, PASSED} from "../model/status";

const NDJSON_FILE = 'src/spec/messages.ndjson';
const NDJSON_FILE_UNDEFINED = 'src/spec/messages_undefined.ndjson';

describe('document reader', () => {
    it('Should read pickles', () => {
        const docReader = new DocumentReader();
        docReader.getDocuments(NDJSON_FILE);

        docReader.documents.forEach(doc => doc.pickles.map(p => p.pickle.uri).reduce((prev, current) => {
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

        expect(docReader.documents[0].testCases[0].getStatus()).toBe(PASSED);
        expect(docReader.documents.flatMap(doc => doc.testCases).map(testCase => testCase.getStatus())).toContain(FAILED);

        const lines = docReader.documents.flatMap(doc => doc.testCases).map(testCase => testCase.getLocation());

        expect(lines).not.toContain(undefined);
    });

    it('should find document for asciidoc', () => {
        const docReader = new DocumentReader();
        docReader.getDocuments(NDJSON_FILE);

        let document = docReader.findDocumentForAsciidoc(['toto', 'Feature: Interview']);

        expect(document).not.toBeUndefined();
    });

    it('shows undefined steps', () => {
        const docReader = new DocumentReader();
        docReader.getDocuments(NDJSON_FILE_UNDEFINED);

        expect(docReader.documents[0].testCases[0].getStatus()).toBe(FAILED);
    });
})