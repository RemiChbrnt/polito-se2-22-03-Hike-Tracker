/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT2_ addNewHikeDescription.cy.js
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
    cy.get('#email-input').clear();
    cy.get('#email-input').type('antonio.fracassa@live.it');
    cy.get('#password').clear();
    cy.get('#password').type('testPassword2');
    cy.wait(1000);
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
    cy.get('#email-input').clear();
    cy.get('#email-input').type('antonio.fracassa@live.it');
    cy.get('#password').clear();
    cy.get('#password').type('testPassword2');
    cy.wait(1000);
    cy.get('#log-in-button').click();
    cy.wait(1000);
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
    cy.get('#email-input').clear();
    cy.get('#email-input').type('antonio.fracassa@live.it');
    cy.get('#password').clear();
    cy.get('#password').type('testPassword2');
    cy.wait(1000);
    cy.get('#log-in-button').click();
    cy.wait(1000);
    cy.get('#add-new-hike-option').click();

    //check that add new hike form is editable
  });

  /*it('should has hike title', () => {
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
  });*/
});