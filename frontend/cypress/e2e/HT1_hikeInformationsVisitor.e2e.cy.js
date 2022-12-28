/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT1_hikeInformationsVisitor.cy.js
*
* Copyright (c) 2022 - se2022-Team03
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('Get informations from hike', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should click first hike card', () => {
    cy.get(':nth-child(1) > .card > .card-body').click();
  });

  it('should has hike title', () => {
    cy.get(':nth-child(1) > .card > .card-body').click();
    cy.get('#hike-tilte').should('be.visible');
  });

  it('should has home button', () => {
    cy.get(':nth-child(1) > .card > .card-body').click();
    cy.get('#home-button').contains(/Home/i).should('be.visible');
  });

  it('should has hike informations', () => {
    cy.get(':nth-child(1) > .card > .card-body').click();
    cy.get('#hike-status').should('be.visible');
    cy.get('#hike-difficulty').should('be.visible');
    cy.get('#hike-expected-time').should('be.visible');
    cy.get('#hike-length').should('be.visible');
    cy.get('#hike-ascent').should('be.visible');
    cy.get('#hike-description').should('be.visible');
  });

  it('should click hike options', () => {
    cy.get(':nth-child(1) > .card > .card-body').click();
    cy.get(':nth-child(1) > .form-check-input').uncheck();
    cy.get(':nth-child(1) > .form-check-input').check();

    cy.get(':nth-child(2) > .form-check-input').uncheck();
    cy.get(':nth-child(2) > .form-check-input').check();

    cy.get(':nth-child(3) > .form-check-input').uncheck();
    cy.get(':nth-child(3) > .form-check-input').check();

    cy.get('[src="/static/media/start-marker.4695f435f603afe44323.png"]').should('be.visible'); //start point visible
    cy.get('[src="/static/media/finish-marker.bb578aa29fec8e99b251.png"]').should('be.visible'); //end point visible again
    cy.get(':nth-child(4) > .form-check-input').uncheck();
    //start point not more visible
    //end point not more visible
    cy.get(':nth-child(4) > .form-check-input').check();
    cy.get('[src="/static/media/start-marker.4695f435f603afe44323.png"]').should('be.visible'); //start point visible again
    cy.get('[src="/static/media/finish-marker.bb578aa29fec8e99b251.png"]').should('be.visible'); //end point visible again

    cy.get('[src="/static/media/hut-marker.ef90b5be5df7c426570e.png"]').should('be.visible'); //hut visible
  });

  it('should return to home', () => {
    cy.get(':nth-child(1) > .card > .card-body').click();
    cy.get('#home-button').click();
  });
});