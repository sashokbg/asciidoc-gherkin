import {Given, Then, When} from '@cucumber/cucumber';
import expect from "expect";

Given('Batman is surrounded by villains', function () {
    console.log('ok');
});

When('He throws his bat-shuriken', function () {
    console.log('ok');
});

Then('It will bounce of off the baddies\' guns', function () {
    console.log('ok');
});

Given('Batman encounters {string}', function (villain) {
    console.log('ok');
});

Given('the following gadgets', function (dataTable) {
    console.log('ok');
});

When('batman looses one', function () {
   console.log('ok');
});

Then('Alfred will replace it', function() {
    console.log('ok');
})

When('Batman fights him in the movie {string}', function (movie) {
    console.log('ok');
});

Then('Batman wins', function () {
    console.log('ok');
});

Given('The police put the #bat-light# in the sky', function () {
    console.log('ok');
});

When('Batman sees it', function () {
    console.log('ok');
});

Then('He arrives at the crime scene', function () {
    console.log('ok');
});

Given('the Joker has robbed a bank', function () {
    console.log('ok');
});

When('the police reports the crime', function () {
    console.log('ok');
});

Then('Batman arrives at crime scene', function () {
    console.log('ok');
});

Given('Batman encounters a terminal in the lair of Bane', function () {
    console.log('ok');
});

When('Batman enters the following python code', function (docString) {
    console.log('ok');
    expect(true).toBeFalsy();
});

Then('He manages to hack into the terminal', function () {
    console.log('ok');
});
