/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT9_linkHutToHikeGuide.cy.js
*
* Copyright (c) 2022 - se2022-Team03
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('Search for hut from hut list', () => {
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

    it('should has linkable hut table', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('antonio.fracassa@live.it');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword2');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#link-hut-to-hike-option').click();
        cy.wait(500);


        //check for linkable hut table
        cy.get('#hut-name-title').should('be.visible');
        cy.get('#hut-latitude-title').should('be.visible');
        cy.get('#hut-longitude-title').should('be.visible');
        cy.get('#hut-altitude-title').should('be.visible');
        cy.get('#hut-country-title').should('be.visible');
        cy.get('#hut-region-title').should('be.visible');
        cy.get('#hut-town-title').should('be.visible');
        cy.get('#hut-info-title').should('be.visible');
        cy.get('#hut-link-title').should('be.visible');

        cy.get('#hut-name').should('be.visible');
        cy.get('#hut-latitude').should('be.visible');
        cy.get('#hut-longitude').should('be.visible');
        cy.get('#hut-altitude').should('be.visible');
        cy.get('#hut-country').should('be.visible');
        cy.get('#hut-region').should('be.visible');
        cy.get('#hut-town').should('be.visible');
        cy.get('#hut-info').should('be.visible');
        cy.get('#hut-link').should('be.visible');
        cy.get('#hut-info-button').should('be.visible');
        cy.get('#hut-link-button').should('be.visible');

        cy.get('#hut-info-button').click();
        cy.wait(500);

        cy.get('#phone').should('be.visible');
        cy.get('#email').should('be.visible');
        cy.get('#website').should('be.visible');
        cy.get('#opening-time').should('be.visible');
        cy.get('#closing-time').should('be.visible');
        cy.get('#number-of-beds').should('be.visible');
        cy.get('#food').should('be.visible');
        cy.get('#description-title').should('be.visible');
        //cy.get('#description').should('be.visible');
    });

    it('should has hut table', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('antonio.fracassa@live.it');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword2');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#link-hut-to-hike-option').click();
        cy.wait(500);


        //check for linkable hut table
        cy.get('#hut-name-title').should('be.visible');
        cy.get('#hut-latitude-title').should('be.visible');
        cy.get('#hut-longitude-title').should('be.visible');
        cy.get('#hut-altitude-title').should('be.visible');
        cy.get('#hut-country-title').should('be.visible');
        cy.get('#hut-region-title').should('be.visible');
        cy.get('#hut-town-title').should('be.visible');
        cy.get('#hut-info-title').should('be.visible');
        cy.get('#hut-link-title').should('be.visible');

        cy.get('#hut-name').should('be.visible');
        cy.get('#hut-latitude').should('be.visible');
        cy.get('#hut-longitude').should('be.visible');
        cy.get('#hut-altitude').should('be.visible');
        cy.get('#hut-country').should('be.visible');
        cy.get('#hut-region').should('be.visible');
        cy.get('#hut-town').should('be.visible');
        cy.get('#hut-info').should('be.visible');
        cy.get('#hut-link').should('be.visible');
        cy.get('#hut-info-button').should('be.visible');
        cy.get('#hut-link-button').should('be.visible');

        cy.get('#hut-info-button').click();
        cy.wait(500);

        cy.get('#phone').should('be.visible');
        cy.get('#email').should('be.visible');
        cy.get('#website').should('be.visible');
        cy.get('#opening-time').should('be.visible');
        cy.get('#closing-time').should('be.visible');
        cy.get('#number-of-beds').should('be.visible');
        cy.get('#food').should('be.visible');
        cy.get('#description-title').should('be.visible');
        //cy.get('#description').should('be.visible');
    });

    it('should has link to hike form', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('antonio.fracassa@live.it');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword2');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#link-hut-to-hike-option').click();
        cy.wait(500);

        cy.get('#hut-link-button').click();
        cy.wait(500);
        
        cy.get('#link-to-hike-title').should('be.visible');
        cy.get('#select-hike-label').should('be.visible');
        cy.get('#select-hike-select').should('be.visible');
        cy.get('#confirm-button').should('be.visible');
    });

    it('should link to hike form be editable', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('antonio.fracassa@live.it');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword2');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);
        cy.get('#link-hut-to-hike-option').click();
        cy.wait(500);

        cy.get('#hut-link-button').click();
        cy.wait(500);
        
        //cy.get('#select-hike-select').select();
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
    cy.get('#link-hut-to-hike-option').click();
    cy.wait(500);
    cy.get('#hut-link-button').click();
    cy.wait(500);
    cy.get('#hike-list-option').click();
    cy.wait(500);
    cy.get('#log-out-button').click();
  });
});