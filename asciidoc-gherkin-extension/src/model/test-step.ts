import {Pickle} from "./gherkin-document";
import {FAILED, PASSED, UNDEFINED} from "./status";

export class TestStep {
    public gherkin: any;
    private readonly location: number;
    private readonly status: string;

    constructor(gherkin: Pickle, location: number, status: string) {
        this.gherkin = gherkin;
        this.location = location;
        this.status = status;
    }

    getLocation() {
        return this.location;
    }

    getStatus() {
        if (this.status === 'PASSED') {
            return PASSED;
        } else if (this.status === 'UNDEFINED') {
            return UNDEFINED;
        } else {
            return FAILED;
        }
    }
}