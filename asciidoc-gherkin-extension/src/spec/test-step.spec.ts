// @ts-ignore
// @ts-nocheck

import {TestStep} from "../model/test-step";
import expect from "expect";
import {UNDEFINED} from "../model/status";

describe('test step', () => {
   it('Can have an undefined status', () => {
      const pickle = {"pickle":{"id":"32607b6a-876c-49ac-a556-71aea874440a","uri":"spec/features/non-implemented-steps.feature.adoc","astNodeIds":["e39150f1-b909-4ad9-bdb6-904e6f6a8505"],"tags":[],"name":"Non-Implemented Example","language":"en","steps":[{"id":"7822f1e8-4ab7-473e-8c84-5a853aed8cb4","text":"Non Implemented Step","type":"Context","astNodeIds":["fafad44e-59cb-48fa-8f25-1b2fa9a687b1"]}]}};
      let testStep = new TestStep(pickle, 0, 'UNDEFINED');
      expect(testStep.getStatus()).toBe(UNDEFINED);
   })
});