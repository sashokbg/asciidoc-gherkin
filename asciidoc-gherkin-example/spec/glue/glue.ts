import {Given} from "@cucumber/cucumber";

console.log('Loading again');

Given("A", function () {
    console.log("Executing A");
})

Given("B", function () {
    console.log("Executing B");
})
