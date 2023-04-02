import {GherkinDocument, Pickle} from "./gherkin-document";
import {FAILED, PASSED} from "./status";

export class TestCase {
    public gherkin: any;
    private pickle: Pickle;
    private document: GherkinDocument;
    public startEvents: any[];
    private finishEvents: any[];

    constructor(gherkin: any, pickle: Pickle, document: GherkinDocument) {
        this.gherkin = gherkin;
        this.pickle = pickle;
        this.document = document;

        this.startEvents = [];
        this.finishEvents = [];
    }

    addStartEvent(startEvent: any) {
        this.startEvents.push(startEvent);
    }

    addStepFinishEvent(finishEvent: any) {
        this.finishEvents.push(finishEvent);
    }

    getStatus() {
        if(this.finishEvents.find(event => event.testStepResult.status !== 'PASSED')){
            return FAILED;
        }
        return PASSED;
    }

    getLocation() {
        let astNodeId = this.pickle.pickle.astNodeIds[0];
        let astNode = this.document.findAstNode('id', astNodeId);
        return astNode[0]?.location.line;
    }
}
