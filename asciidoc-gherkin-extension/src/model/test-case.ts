import {GherkinDocument} from "./gherkin-document";

export class TestCase {
    public gherkin: any;
    private pickle: any;
    private document: GherkinDocument;
    public startEvents: any[];
    private finishEvents: any[];

    constructor(gherkin: any, pickle: any, document: GherkinDocument) {
        this.gherkin = gherkin;
        this.pickle = pickle;
        this.document = document;

        this.startEvents = [];
        this.finishEvents = [];
    }

    addStartEvent(startEvent: any) {
        this.startEvents.push(startEvent);
    }

    addFinishEvent(finishEvent: any) {
        this.finishEvents.push(finishEvent);
    }

    getStatus() {
        if(this.finishEvents.find(event => event.testStepResult.status !== 'PASSED')){
            return '❌';
        }
        return '☑';
    }

    getLocation() {
        let astNodeId = this.pickle.astNodeIds[0];
        let astNode = this.document.findAstNode('id', astNodeId);
        return astNode[0]?.location.line;
    }
}
