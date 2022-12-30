/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT2_addNewHikeDescription.cy.js
*
* Copyright (c) 2022 - se2022-Team03
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('Get informations from hike', () => {
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

    //check for guide page informations
    cy.get('#hike-list-option').should('be.visible');
    cy.get('#add-new-hike-option').should('be.visible');
    cy.get('#add-parking-lot-option').should('be.visible');
    cy.get('#link-hut-to-hike-option').should('be.visible');
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

  it('should show "add new hike" form', () => {
    cy.get('#user-log-in-button').click();
    cy.get('#email').clear();
    cy.get('#email').type('antonio.fracassa@live.it');
    cy.get('#password').clear();
    cy.get('#password').type('testPassword2');
    cy.wait(500);
    cy.get('#log-in-button').click();
    cy.wait(500);
    cy.get('#add-new-hike-option').click();

    //check for add new hike form
    cy.get('#upload-gpx-title').should('be.visible');
    cy.get('#upload-gpx-button').should('be.visible');
    cy.get('#hike-title-label').should('be.visible');
    cy.get('#hike-title-control').should('be.visible');
    cy.get('#length-label').should('be.visible');
    cy.get('#length-control').should('be.visible');
    cy.get('#expected-time-label').should('be.visible');
    cy.get('#expected-time-control').should('be.visible');
    cy.get('#ascent-label').should('be.visible');
    cy.get('#ascent-control').should('be.visible');
    cy.get('#difficulty-label').should('be.visible');
    cy.get('#difficulty-select').should('be.visible');
    cy.get('#description-label').should('be.visible');
    cy.get('#description-control').should('be.visible');
    cy.get('#start-point-label').should('be.visible');
    cy.get('#confirm-button').should('be.visible');
  });

  it('should "add new hike" form be editable', () => {
    cy.get('#user-log-in-button').click();
    cy.get('#email').clear();
    cy.get('#email').type('antonio.fracassa@live.it');
    cy.get('#password').clear();
    cy.get('#password').type('testPassword2');
    cy.wait(500);
    cy.get('#log-in-button').click();
    cy.wait(500);
    cy.get('#add-new-hike-option').click();

    //check that add new hike form is editable
    cy.get('#hike-title-control').clear();
    cy.get('#hike-title-control').type('Ciao');
    cy.get('#length-control').clear();
    cy.get('#length-control').type('2');
    cy.get('#expected-time-control').clear();
    cy.get('#expected-time-control').type('2');
    cy.get('#ascent-control').clear();
    cy.get('#ascent-control').type('2');
    cy.get('#difficulty-select').select('pro');
    cy.get('#description-control').clear();
    cy.get('#description-control').type('Ciao');
    cy.get('#start-point-select').select('14');
    cy.get('#end-point-select').select('23');
  });

  it('should return to home', () => {
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
  });
});