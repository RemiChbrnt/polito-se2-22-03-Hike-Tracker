/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT7_searchForHut.cy.js
*
* Copyright (c) 2022 - se2022-Team03
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('Search for hut from hut list', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should log-in as an hiker', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('maurizio.merluzzo@donkeykong.com');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword1');
        cy.wait(500);
        cy.get('#log-in-button').click();

        //check for hike page informations
        cy.get('#hike-list-option').should('be.visible');
        cy.get('#hut-list-option').should('be.visible');
        cy.get('#completed-hike-option').should('be.visible');
        cy.get('#personal-page-option').should('be.visible');
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

    it('should has hut list', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('maurizio.merluzzo@donkeykong.com');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword1');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#hut-list-option').click();
        cy.wait(500);


        //check for hut list
        cy.get('#hut-list-title').should('be.visible');
        cy.get('#reset-filter-button').contains(/Reset filters/i).should('be.visible');
        cy.get('#search-button').contains(/Search/i).should('be.visible');
        cy.get(':nth-child(1) > .card').should('be.visible');
        cy.get(':nth-child(1) > .card').should('be.visible');
        cy.get('#hut-title').should('be.visible');
        cy.get('#address').should('be.visible');
        cy.get('#altitude').should('be.visible');
        cy.get('#number-of-beds').should('be.visible');
        cy.get('#cost').should('be.visible');
        cy.get('#opening-time').should('be.visible');
        cy.get('#closing-time').should('be.visible');
        cy.get('#food').should('be.visible');
    });

    it('should has search for hut form', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('maurizio.merluzzo@donkeykong.com');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword1');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#hut-list-option').click();
        cy.wait(500);

        cy.get('#search-button').click();
        cy.wait(500);

        //check for search for hut form
        cy.get('#name-label').should('be.visible');
        cy.get('#name-control').should('be.visible');
        cy.get('#address-check').should('be.visible');
        cy.get('#coordinates-check').should('be.visible');
        cy.get('#country-label').should('be.visible');
        cy.get('#country-select').should('be.visible');
        cy.get('#region-label').should('be.visible');
        cy.get('#region-select').should('be.visible');
        cy.get('#town-label').should('be.visible');
        cy.get('#town-control').should('be.visible');
        cy.get('#address-label').should('be.visible');
        cy.get('#address-control').should('be.visible');

        //scroll the form
        cy.get('#min-cost-label').scrollIntoView();
        cy.wait(500);

        cy.get('#min-cost-label').should('be.visible');
        cy.get('#min-cost-control').should('be.visible');
        cy.get('#max-cost-label').should('be.visible');
        cy.get('#max-cost-control').should('be.visible');
        cy.get('#min-altitude-label').should('be.visible');
        cy.get('#min-altitude-control').should('be.visible');
        cy.get('#max-altitude-label').should('be.visible');
        cy.get('#max-altitude-control').should('be.visible');
        cy.get('#food-label').should('be.visible');
        cy.get('#food-select').should('be.visible');
        cy.get('#min-number-of-beds-label').should('be.visible');
        cy.get('#min-number-of-beds-control').should('be.visible');
        cy.get('#max-number-of-beds-label').should('be.visible');
        cy.get('#max-number-of-beds-control').should('be.visible');
        cy.get('#back-button').should('be.visible');
        cy.get('#confirm-button').should('be.visible');
    });

    it('should search for hut form be editable', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('maurizio.merluzzo@donkeykong.com');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword1');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#hut-list-option').click();
        cy.wait(500);

        cy.get('#search-button').click();
        cy.wait(500);

        //check for search hut form editable
        cy.get('#name-control').clear();
        cy.get('#name-control').type('Try');
        cy.get('#coordinates-check').check();
        cy.wait(500);
        cy.get('#latitude-control').clear();
        cy.get('#latitude-control').type('2');
        cy.get('#longitude-control').clear();
        cy.get('#longitude-control').type('2');
        cy.get('#address-check').check();
        cy.get('#country-select').select('{"name":"Afghanistan","isoCode":"AF","flag":"🇦🇫","phonecode":"93","currency":"AFN","latitude":"33.00000000","longitude":"65.00000000","timezones":[{"zoneName":"Asia/Kabul","gmtOffset":16200,"gmtOffsetName":"UTC+04:30","abbreviation":"AFT","tzName":"Afghanistan Time"}]}');
        cy.get('#region-select').select('Badakhshan');
        cy.get('#town-control').clear();
        cy.get('#town-control').type('Ashkāsham');
        cy.get('#address-control').clear();
        cy.get('#address-control').type('Try');

        cy.get('#min-cost-control').clear();
        cy.get('#min-cost-control').type('2');
        cy.get('#max-cost-control').clear();
        cy.get('#max-cost-control').type('3');
        cy.get('#min-altitude-control').clear();
        cy.get('#min-altitude-control').type('2');
        cy.get('#max-altitude-control').clear();
        cy.get('#max-altitude-control').type('3');
        cy.get('#food-select').select('buffet');
        cy.get('#min-number-of-beds-control').clear();
        cy.get('#min-number-of-beds-control').type('2');
        cy.get('#max-number-of-beds-control').clear();
        cy.get('#max-number-of-beds-control').type('3');
    });

    it('should return to home and log-out', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('maurizio.merluzzo@donkeykong.com');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword1');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#hut-list-option').click();
        cy.wait(500);

        cy.get('#search-button').click();
        cy.wait(500);

        cy.get('#back-button').click();
        cy.wait(500);
        cy.get('#hike-list-option').click();
        cy.wait(500);
        cy.get('#log-out-button').click();
    });
});