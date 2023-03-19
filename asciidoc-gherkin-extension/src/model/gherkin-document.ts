import {TestCase} from "./test-case";

export class GherkinDocument {
    public testCases: Array<TestCase>;
    private pickles: any[];
    private gherkinDocument: any;
    public title: string;

    constructor(gherkinDocument: any) {
        this.testCases = [];
        this.pickles = [];
        this.gherkinDocument = gherkinDocument;
        this.title = this.gherkinDocument.feature.keyword + ': ' + this.gherkinDocument.feature.name;
    }

    //get title() {
    //    return this.gherkinDocument.feature.keyword + ': ' + this.gherkinDocument.feature.name;
    //}

    addTestCaseStarted(testCaseStarted: any) {
        let testCase = this.testCases.find(testCase => testCase.gherkin.id === testCaseStarted.testCaseId);
        testCase?.addStartEvent(testCaseStarted);
    }

    addTestStepFinished(testStepFinished: any) {
        let testCaseStartedEvents = this.testCases.flatMap(testCase => testCase.startEvents);
        let testCaseStartedEvent = testCaseStartedEvents.find(event => event.id === testStepFinished.testCaseStartedId);
        if(!testCaseStartedEvent) {
            return;
        }
        let testCase = this.testCases.find(testCase => testCase.gherkin.id === testCaseStartedEvent.testCaseId);
        testCase?.addFinishEvent(testStepFinished);
    }

    addTestCase(testCase: any) {
        const pickles = this.pickles.filter(pickle => pickle.id === testCase.pickleId);
        if (pickles && pickles.length > 0) {
            this.testCases.push(new TestCase(testCase, pickles[0], this));
        }
    }

    findAstNode(key: string, value: string, obj = this.gherkinDocument, results: any[] = []) {
        if (obj.hasOwnProperty(key) && obj[key] === value) {
            results.push(obj);
            return results;
        } else {
            for (const [k, v] of Object.entries(obj)) {
                if (typeof v === "object") {
                    this.findAstNode(key, value, v, results);
                }
            }
        }

        return results;
    }

    addPickle(pickle: any) {
        let astNode = this.findAstNode('id', pickle.astNodeIds[0]);

        if (astNode && astNode.length > 0) {
            this.pickles.push(pickle);
        }
    }
}