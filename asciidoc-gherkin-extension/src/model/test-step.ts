export class TestStep {
    public gherkin: any;
    private readonly location: number;
    private readonly status: string;

    constructor(gherkin: any, location: number, status: string) {
        this.gherkin = gherkin;
        this.location = location;
        this.status = status;
    }

    getLocation() {
        return this.location;
    }

    getStatus() {
        if (this.status !== 'PASSED') {
            return '❌';
        }
        return '☑';
    }
}