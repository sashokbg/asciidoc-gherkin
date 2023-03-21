// @ts-ignore
// @ts-nocheck

const {GherkinDocument} = require("../model/gherkin-document");

describe('document', () => {

    let gherkin = {
        "feature": {
            "tags": [],
            "location": {"line": 1, "column": 3},
            "language": "en",
            "keyword": "Feature",
            "name": "Guest Mode",
            "description": "",
            "children": [{
                "rule": {
                    "id": "c797f9c9-b36f-4f62-a18c-e58ac468c02a",
                    "location": {"line": 7, "column": 4},
                    "keyword": "Rule",
                    "name": "Guest Mode is available at the login screen",
                    "description": "",
                    "children": [{
                        "scenario": {
                            "id": "0883866b-ac72-4f35-a441-22471f96e9d9",
                            "tags": [],
                            "location": {"line": 9, "column": 4},
                            "keyword": "Example",
                            "name": "Guest Mode Button",
                            "description": "",
                            "steps": [{
                                "id": "10030841-7741-48a8-94cf-9df6ed0ad8c4",
                                "location": {"line": 11, "column": 3},
                                "keyword": "Given ",
                                "keywordType": "Context",
                                "text": "an anonymous user"
                            }, {
                                "id": "732d3449-12c5-48a1-88c9-2c09b47cf261",
                                "location": {"line": 12, "column": 3},
                                "keyword": "When ",
                                "keywordType": "Action",
                                "text": "they click on the \"Guest Mode\" button"
                            }, {
                                "id": "3ddb5ec4-c6c9-4b15-ba46-07f5717eb505",
                                "location": {"line": 13, "column": 3},
                                "keyword": "Then ",
                                "keywordType": "Outcome",
                                "text": "they are redirected to the Inteview"
                            }, {
                                "id": "b48fffe3-76f7-4b23-8160-915c27a2355a",
                                "location": {"line": 14, "column": 3},
                                "keyword": "But ",
                                "keywordType": "Conjunction",
                                "text": "they need to manually add demographics data"
                            }],
                            "examples": []
                        }
                    }],
                    "tags": []
                }
            }]
        }, "comments": [], "uri": "../documentation/modules/features/pages/guest_mode.feature.adoc"
    }

    it('should find a child node bu id', () => {
        const doc = new GherkinDocument(gherkin);
        let findAstNode = doc.findAstNode('id', 'b48fffe3-76f7-4b23-8160-915c27a2355a', gherkin);
        expect(findAstNode).toHaveLength(1);
    })

    it('should accept test steps', () => {
        gherkin = {"feature":{"tags":[],"location":{"line":1,"column":3},"language":"en","keyword":"Feature","name":"Outline","description":"","children":[{"rule":{"id":"302ec57b-2b75-4eac-8acd-a8fa6a44bd17","location":{"line":5,"column":4},"keyword":"Rule","name":"Outline Rule","description":"","children":[{"scenario":{"id":"a6177a49-e856-443d-ba02-2687c00c55ac","tags":[],"location":{"line":7,"column":5},"keyword":"Scenario Outline","name":"eating","description":"","steps":[{"id":"98b85926-6091-4464-ba15-a2da641ecc01","location":{"line":8,"column":3},"keyword":"Given ","keywordType":"Context","text":"there are <start> cucumbers"},{"id":"5f862520-6099-41d3-b8a0-2be8798a7d4a","location":{"line":9,"column":3},"keyword":"When ","keywordType":"Action","text":"I eat <eat> cucumbers"},{"id":"8d9ffe94-976a-4d3f-a62f-cd636c69d7b2","location":{"line":10,"column":3},"keyword":"Then ","keywordType":"Outcome","text":"I should have <left> cucumbers"}],"examples":[{"id":"ac1fc898-f1ff-41cd-9b3f-7d5e6d274332","tags":[],"location":{"line":12,"column":6},"keyword":"Examples","name":"","description":"","tableHeader":{"id":"517f4007-ae98-4879-b26a-6cee92024de8","location":{"line":15,"column":1},"cells":[{"location":{"line":15,"column":3},"value":"start"},{"location":{"line":15,"column":11},"value":"eat"},{"location":{"line":15,"column":17},"value":"left"}]},"tableBody":[{"id":"d70bcb89-d3c2-42dd-9464-08758f33a7da","location":{"line":17,"column":1},"cells":[{"location":{"line":17,"column":6},"value":"12"},{"location":{"line":17,"column":13},"value":"5"},{"location":{"line":17,"column":20},"value":"7"}]},{"id":"8308fffc-4b24-48a1-9524-7d691e752eef","location":{"line":18,"column":1},"cells":[{"location":{"line":18,"column":6},"value":"20"},{"location":{"line":18,"column":13},"value":"5"},{"location":{"line":18,"column":19},"value":"15"}]},{"id":"b33bc635-5d4b-4f15-a740-f9e4ed71c9bf","location":{"line":19,"column":1},"cells":[{"location":{"line":19,"column":6},"value":"42"},{"location":{"line":19,"column":13},"value":"55"},{"location":{"line":19,"column":20},"value":"115"}]}]}]}}],"tags":[]}},{"rule":{"id":"6cae5970-38c3-484f-ba60-7e2cec75e2a6","location":{"line":22,"column":4},"keyword":"Rule","name":"Another rule","description":"","children":[{"scenario":{"id":"0be759bb-146c-4ee6-9473-f54ea23cb7af","tags":[],"location":{"line":24,"column":5},"keyword":"Scenario","name":"A","description":"","steps":[{"id":"4c14feb8-1443-441b-a889-dd080f0875e9","location":{"line":25,"column":3},"keyword":"Given ","keywordType":"Context","text":"A"},{"id":"60ef1e94-b978-4981-a462-9f7b55a0fbae","location":{"line":26,"column":3},"keyword":"When ","keywordType":"Action","text":"B"},{"id":"d2495d31-61b7-45e6-a531-b19336871c87","location":{"line":27,"column":3},"keyword":"Then ","keywordType":"Outcome","text":"C"}],"examples":[]}},{"scenario":{"id":"02bb39d6-a88a-4e1a-b2a6-ce0a7a398c43","tags":[],"location":{"line":29,"column":5},"keyword":"Example","name":"B","description":"","steps":[{"id":"35956d3b-a68a-4c0b-bb09-5dc6e8c66ab8","location":{"line":30,"column":3},"keyword":"Given ","keywordType":"Context","text":"B"},{"id":"f12f97d5-fcc1-401c-b866-b2d03de7b98e","location":{"line":31,"column":3},"keyword":"When ","keywordType":"Action","text":"A"},{"id":"760f02c3-c692-4643-a2a7-2292a771975f","location":{"line":32,"column":3},"keyword":"Then ","keywordType":"Outcome","text":"C"}],"examples":[]}}],"tags":[]}}]},"comments":[],"uri":"../documentation/modules/development/outline.feature.adoc"};
        const doc = new GherkinDocument(gherkin);

        const testStepFinished =
            {
                "testCaseStartedId": "366f5f3f-104b-4626-861c-f2eb839c55ab",
                "testStepId": "899a0b4b-a791-460e-9864-3b33a08a19e5",
                "testStepResult": {"duration": {"seconds": 1, "nanos": 878471772}, "status": "PASSED"},
                "timestamp": {"seconds": 1678303835, "nanos": 134000000}
            };

        const testCase =
            {
                "pickleId": "a62ef25e-0ac0-4dd1-8ed8-eb8fb54ecfe0",
                "id": "b414d2ef-9758-444c-aab1-6554e01e3520",
                "testSteps": [{
                    "id": "c0b4038c-891d-41c9-9a06-25d06b7c303e",
                    "hookId": "1bfd0c62-8214-4ee6-96de-48c2cfc9b1c2"
                }, {
                    "id": "899a0b4b-a791-460e-9864-3b33a08a19e5",
                    "pickleStepId": "ca512081-c64e-4899-bc72-e169a2c0bee4",
                    "stepDefinitionIds": ["0c45c571-c032-4ce8-b611-32c97ba253ce"],
                    "stepMatchArgumentsLists": [{"stepMatchArguments": []}]
                }, {
                    "id": "af951612-4094-44c8-af6a-fbe39b6ff4f7",
                    "pickleStepId": "a22c5cf1-aa74-480a-b253-fd331430e640",
                    "stepDefinitionIds": ["92c7b150-3f83-4b10-8a77-045f87682f60"],
                    "stepMatchArgumentsLists": [{"stepMatchArguments": []}]
                }, {
                    "id": "c7d7067a-0cd5-4d1c-96df-2a911fab309d",
                    "pickleStepId": "ea6ae2b5-2dbb-40f5-b7e9-38b1188f7a92",
                    "stepDefinitionIds": ["4058a17a-a57d-4414-9e33-69c47ca307c9"],
                    "stepMatchArgumentsLists": [{"stepMatchArguments": []}]
                }, {"id": "11fe4353-1ab6-4152-a981-bef0536e8997", "hookId": "d13e7c6c-3ba3-4fb9-9403-b8164dc13d92"}]
            };

        doc.pickles = [
            {
                "id": "a62ef25e-0ac0-4dd1-8ed8-eb8fb54ecfe0",
                "uri": "../documentation/modules/development/outline.feature.adoc",
                "astNodeIds": ["0be759bb-146c-4ee6-9473-f54ea23cb7af"],
                "tags": [],
                "name": "A",
                "language": "en",
                "steps": [{
                    "id": "ca512081-c64e-4899-bc72-e169a2c0bee4",
                    "text": "A",
                    "type": "Context",
                    "astNodeIds": ["4c14feb8-1443-441b-a889-dd080f0875e9"]
                }, {
                    "id": "a22c5cf1-aa74-480a-b253-fd331430e640",
                    "text": "B",
                    "type": "Action",
                    "astNodeIds": ["60ef1e94-b978-4981-a462-9f7b55a0fbae"]
                }, {
                    "id": "ea6ae2b5-2dbb-40f5-b7e9-38b1188f7a92",
                    "text": "C",
                    "type": "Outcome",
                    "astNodeIds": ["d2495d31-61b7-45e6-a531-b19336871c87"]
                }]
            }
        ]
        doc.addTestCase(testCase);

        doc.addTestStepFinished(testStepFinished);

        expect(doc.testSteps).toHaveLength(1);
        expect(doc.testSteps[0].getLocation()).toBe(25);
    });
})