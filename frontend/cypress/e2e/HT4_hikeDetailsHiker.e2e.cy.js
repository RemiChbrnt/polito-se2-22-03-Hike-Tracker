/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT4_hikeDeilsHiker.cy.js
*
* Copyright (c) 2022 - se2022-Team03
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('add a new hike with relative description', () => {
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

        //check for guide page informations
        cy.get('#hike-list-option').should('be.visible');
        cy.get('#hut-list-option').should('be.visible');
        cy.get('#completed-hike-option').should('be.visible');
        cy.get('#personal-page-option').should('be.visible');
        cy.get('#log-out-button').should('be.visible');

        //check for hike list
        cy.get('#title').should('be.visible');
        cy.get('#suggested-hike-button').contains(/Suggested hikes/i).should('be.visible');
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

    it('should has hike informations and hike options', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('maurizio.merluzzo@donkeykong.com');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword1');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);

        //check for guide page informations
        cy.get('#hike-list-option').should('be.visible');
        cy.get('#hut-list-option').should('be.visible');
        cy.get('#completed-hike-option').should('be.visible');
        cy.get('#personal-page-option').should('be.visible');
        cy.get('#log-out-button').should('be.visible');

        cy.get(':nth-child(1) > .card > .card-body').click();
        cy.wait(500);

        cy.get('#hike-status').should('be.visible');
        cy.get('#hike-difficulty').should('be.visible');
        cy.get('#hike-expected-time').should('be.visible');
        cy.get('#hike-length').should('be.visible');
        cy.get('#hike-ascent').should('be.visible');
        cy.get('#hike-description').should('be.visible');

        cy.get('[for="show-parkings"]').click();
        cy.get('[for="show-parkings"]').click();

        cy.get('[for="show-huts"]').click();
        cy.get('[for="show-huts"]').click();

        cy.get('[for="show-points-interest"]').click();
        cy.get('[for="show-points-interest"]').click();

        cy.get('[src="/static/media/start-marker.4695f435f603afe44323.png"]').should('be.visible'); //start point visible
        cy.get('[src="/static/media/finish-marker.bb578aa29fec8e99b251.png"]').should('be.visible'); //end point visible again
        cy.get('[for="show-start-arrival"]').click();
        //start point not more visible
        //end point not more visible
        cy.get('[for="show-start-arrival"]').click();
        cy.get('[src="/static/media/start-marker.4695f435f603afe44323.png"]').should('be.visible'); //start point visible again
        cy.get('[src="/static/media/finish-marker.bb578aa29fec8e99b251.png"]').should('be.visible'); //end point visible again

        cy.get('[src="/static/media/hut-marker.ef90b5be5df7c426570e.png"]').should('be.visible'); //hut visible        
    });

    it('should has map informations', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#email').clear();
        cy.get('#email').type('maurizio.merluzzo@donkeykong.com');
        cy.get('#password').clear();
        cy.get('#password').type('testPassword1');
        cy.wait(500);
        cy.get('#log-in-button').click();
        cy.wait(500);

        cy.get(':nth-child(2) > .card > .card-body').click();
        cy.get('#map').should('be.visible');
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

        cy.get(':nth-child(1) > .card > .card-body').click();
        cy.wait(500);

        cy.get('#home-button').click();
        cy.wait(500);

        cy.get('#log-out-button').click();
    });
});