const Document = require('../document');
const {expect} = require('expect');


describe('document', () => {

    const gherkin = {
        "tags": [],
        "location": {
            "line": 1,
            "column": 3
        },
        "language": "en",
        "keyword": "Feature",
        "name": "Outline",
        "description": "",
        "children": [
            {
                "rule": {
                    "id": "884ed839-765d-4804-86d6-9249714c6f31",
                    "location": {
                        "line": 5,
                        "column": 4
                    },
                    "keyword": "Rule",
                    "name": "Outline Rule",
                    "description": "",
                }
            },
        ]
    }

    it('should find a child node bu id', () => {
        const doc = new Document(gherkin);
        let findAstNode = doc.findAstNode(gherkin, 'id', '884ed839-765d-4804-86d6-9249714c6f31');
        expect(findAstNode).toHaveLength(1);
    })
})