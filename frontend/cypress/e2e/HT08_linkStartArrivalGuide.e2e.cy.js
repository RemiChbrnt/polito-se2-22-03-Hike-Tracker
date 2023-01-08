/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT8_linkStartArrivalGuide.cy.js
*
* Copyright (c) 2022 - se2022-Team03
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('Link start and arrival points to hike', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should log-in as a local guide', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('antonio.fracassa@live.it');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword2');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);

        //check for guide page informations
        cy.get('#hike-list-option').should('be.visible');
        cy.get('#add-new-hike-option').should('be.visible');
        cy.get('#add-parking-lot-option').should('be.visible');
        cy.get('#link-hut-to-hike-option').should('be.visible');
        cy.get('#add-hut-option').should('be.visible');
        cy.get('#log-out-button').should('be.visible');

        //check for hike list
        cy.get('#title').should('be.visible');
        cy.get('#reset-filter-button').contains(/Reset filters/i).should('be.visible');
        cy.get('#filter-button').contains(/Filter/i).should('be.visible');
        cy.get(':nth-child(1) > .card').should('be.visible');
        cy.get(':nth-child(1) > .card').should('be.visible');
        cy.get('h3').should('be.visible');
        cy.get('#difficulty').should('be.visible');
        cy.get('#time').should('be.visible');
        cy.get('#length').should('be.visible');
        cy.get('#ascent').should('be.visible');
        cy.get('#description').should('be.visible');
    });

    it('should has start/end point in "add new hike" form (existing point)', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('antonio.fracassa@live.it');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword2');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#add-new-hike-option').click();
        cy.wait(500);


        //check for add new hike form
        cy.get('#start-point-label').should('be.visible');
        cy.get('#start-point-select').should('be.visible');
        cy.get('#end-point-label').should('be.visible');
        cy.get('#end-point-select').should('be.visible');
        cy.get('#confirm-button').should('be.visible');
    });

    it('should start/end point in "add new hike" form be editable (existing point)', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('antonio.fracassa@live.it');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword2');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#add-new-hike-option').click();
        cy.wait(500);

        cy.get('#identical-end-start-button').click();
        cy.get('#identical-end-start-button').click();
        cy.wait(500);

        //check for start/end point form editable (existing point)
        cy.get('#start-point-select').select('14');
        cy.get('#end-point-select').select('23');
    });

    it('should has start/end point in "add new hike" form (new point)', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('antonio.fracassa@live.it');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword2');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#add-new-hike-option').click();
        cy.wait(500);


        //check for add new hike form
        cy.get('#start-point-label').should('be.visible');
        cy.get('#new-start-point-button').should('be.visible');
        cy.get('#new-start-point-button').click();
        cy.get('#start-point-name-label').should('be.visible');
        cy.get('#start-point-name-control').should('be.visible');
        cy.get('#start-point-type-label').should('be.visible');
        cy.get('#start-point-type-select').should('be.visible');
        cy.get('#start-point-latitude-label').should('be.visible');
        cy.get('#start-point-latitude-control').should('be.visible');
        cy.get('#start-point-longitude-label').should('be.visible');
        cy.get('#start-point-longitude-control').should('be.visible');
        cy.get('#start-point-altitude-label').should('be.visible');
        cy.get('#start-point-altitude-control').should('be.visible');
        cy.get('#start-point-address-label').should('be.visible');
        cy.get('#start-point-address-control').should('be.visible');
        cy.get('#start-point-town-label').should('be.visible');
        cy.get('#start-point-town-control').should('be.visible');
        cy.get('#start-point-region-label').should('be.visible');
        cy.get('#start-point-region-control').should('be.visible');
        cy.get('#start-point-country-label').should('be.visible');
        cy.get('#start-point-country-control').should('be.visible');

        cy.get('#end-point-label').should('be.visible');
        cy.get('#new-end-point-button').should('be.visible');
        cy.get('#new-end-point-button').click();
        cy.get('#end-point-name-label').should('be.visible');
        cy.get('#end-point-name-control').should('be.visible');
        cy.get('#end-point-type-label').should('be.visible');
        cy.get('#end-point-type-select').should('be.visible');
        cy.get('#end-point-latitude-label').should('be.visible');
        cy.get('#end-point-latitude-control').should('be.visible');
        cy.get('#end-point-longitude-label').should('be.visible');
        cy.get('#end-point-longitude-control').should('be.visible');
        cy.get('#end-point-altitude-label').should('be.visible');
        cy.get('#end-point-altitude-control').should('be.visible');
        cy.get('#end-point-address-label').should('be.visible');
        cy.get('#end-point-address-control').should('be.visible');
        cy.get('#end-point-town-label').should('be.visible');
        cy.get('#end-point-town-control').should('be.visible');
        cy.get('#end-point-region-label').should('be.visible');
        cy.get('#end-point-region-control').should('be.visible');
        cy.get('#end-point-country-label').should('be.visible');
        cy.get('#end-point-country-control').should('be.visible');

        cy.get('#confirm-button').should('be.visible');
    });

    it('should start/end point in "add new hike" form be editable (new point)', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('antonio.fracassa@live.it');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword2');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#add-new-hike-option').click();
        cy.wait(500);

        cy.get('#identical-end-start-button').click();
        cy.get('#identical-end-start-button').click();
        cy.wait(500);
        
        //check for start/end point form editable (new point)
        cy.get('#new-start-point-button').click();
        cy.get('#start-point-name-control').clear();
        cy.get('#start-point-name-control').type('Try');
        cy.get('#start-point-type-select').select('parkinglot');
        cy.get('#start-point-latitude-control').clear();
        cy.get('#start-point-latitude-control').type('2');
        cy.get('#start-point-longitude-control').clear();
        cy.get('#start-point-longitude-control').type('2');
        cy.get('#start-point-altitude-control').clear();
        cy.get('#start-point-altitude-control').type('2');
        cy.get('#start-point-address-control').clear();
        cy.get('#start-point-address-control').type('Try');
        cy.get('#start-point-town-control').clear();
        cy.get('#start-point-town-control').type('Try');
        cy.get('#start-point-region-control').clear();
        cy.get('#start-point-region-control').type('Try');
        cy.get('#start-point-country-control').clear();
        cy.get('#start-point-country-control').type('Try');

        cy.get('#new-end-point-button').click();
        cy.get('#end-point-name-control').clear();
        cy.get('#end-point-name-control').type('Try');
        cy.get('#end-point-type-select').select('parkinglot');
        cy.get('#end-point-latitude-control').clear();
        cy.get('#end-point-latitude-control').type('2');
        cy.get('#end-point-longitude-control').clear();
        cy.get('#end-point-longitude-control').type('2');
        cy.get('#end-point-altitude-control').clear();
        cy.get('#end-point-altitude-control').type('2');
        cy.get('#end-point-address-control').clear();
        cy.get('#end-point-address-control').type('Try');
        cy.get('#end-point-town-control').clear();
        cy.get('#end-point-town-control').type('Try');
        cy.get('#end-point-region-control').clear();
        cy.get('#end-point-region-control').type('Try');
        cy.get('#end-point-country-control').clear();
        cy.get('#end-point-country-control').type('Try');

        cy.get('#confirm-button').click();
    });

    it('should return to home and log-out', () => {
    cy.get('#user-log-in-button').click();
    cy.get('#email').clear();
    cy.get('#email').type('antonio.fracassa@live.it');
    cy.get('#password').clear();
    cy.get('#password').type('testPassword2');
    cy.wait(500);
    cy.get('#log-in-button').click();
    cy.wait(500);
    cy.get('#add-new-hike-option').click();
    cy.wait(500);
    cy.get('#hike-list-option').click();
    cy.wait(500);
    cy.get('#log-out-button').click();
  });
});
