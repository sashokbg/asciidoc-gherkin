import { Given, Then, When } from '@cucumber/cucumber';
import { type Page } from 'puppeteer';
import expect from 'expect';

// - Given a first rule
// - When I rule
// - Then you don't rule


Given('a first rule', () => {
    console.log('FIRST');
    expect(true).toBeFalsy();

})

When('I rule', () => {

})

Then(`you don't rule`, function (){

})