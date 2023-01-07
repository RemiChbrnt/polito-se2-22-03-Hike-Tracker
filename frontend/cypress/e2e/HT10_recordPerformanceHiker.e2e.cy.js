/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT10_recordPerformanceHiker.cy.js
*
* Copyright (c) 2022 - se2022-Team03
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('Record performances', () => {
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

    
});