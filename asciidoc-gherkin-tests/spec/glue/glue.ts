import {Given} from "@cucumber/cucumber";

console.log('Loading again');

Given("A", function () {
    console.log("Executing A");
})

Given("B", function () {
    console.log("Executing B");
})

Given('there are {int} cucumbers', function (cucumbers: number) {

});

Given('I eat {int} cucumbers', function (cucumbers: number) {

});

Given('I should have {int} cucumbers', function (cucumbers: number) {

});