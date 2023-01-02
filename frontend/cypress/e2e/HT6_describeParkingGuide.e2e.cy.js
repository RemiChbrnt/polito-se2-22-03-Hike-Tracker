/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT6_adescribeParking.cy.js
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
  
    it('should show "add new parking lots" form', () => {
      cy.get('#user-log-in-button').click();
      cy.get('#email').clear();
      cy.get('#email').type('antonio.fracassa@live.it');
      cy.get('#password').clear();
      cy.get('#password').type('testPassword2');
      cy.wait(500);
      cy.get('#log-in-button').click();
      cy.wait(500);
      cy.get('#add-parking-lot-option').click();
  
      //check for add hut form
      cy.get('#add-parking-title').should('be.visible');
      cy.get('#title-label').should('be.visible');
      cy.get('#title-control').should('be.visible');
      cy.get('#latitude-label').should('be.visible');
      cy.get('#latitude-control').should('be.visible');
      cy.get('#longitude-label').should('be.visible');
      cy.get('#longitude-control').should('be.visible');
      cy.get('#country-label').should('be.visible');
      cy.get('#country-select').should('be.visible');
      cy.get('#region-label').should('be.visible');
      cy.get('#region-select').should('be.visible');
      cy.get('#town-label').should('be.visible');
      cy.get('#town-select').should('be.visible');
      cy.get('#address-label').should('be.visible');
      cy.get('#address-control').should('be.visible');
      cy.get('#altitude-label').should('be.visible');
      cy.get('#altitude-control').should('be.visible');
      cy.get('#number-of-lots-label').should('be.visible');
      cy.get('#number-of-lots-control').should('be.visible');
      cy.get('#description-label').should('be.visible');
      cy.get('#description-control').should('be.visible');
      cy.get('#confirm-button').should('be.visible');
    });
  
    it('should "add new parking lots" form be editable', () => {
      cy.get('#user-log-in-button').click();
      cy.get('#email').clear();
      cy.get('#email').type('antonio.fracassa@live.it');
      cy.get('#password').clear();
      cy.get('#password').type('testPassword2');
      cy.wait(500);
      cy.get('#log-in-button').click();
      cy.wait(500);
      cy.get('#add-parking-lot-option').click();
  
      //check for add hut form editable
      cy.get('#title-control').clear();
      cy.get('#title-control').type('Try');
      cy.get('#latitude-control').clear();
      cy.get('#latitude-control').type('2');
      cy.get('#longitude-control').clear();
      cy.get('#longitude-control').type('2');
      cy.get('#country-select').select('AF');
      cy.get('#region-select').select('BDS');
      cy.get('#town-select').select('Ashkāsham');
      cy.get('#address-control').clear();
      cy.get('#address-control').type('Try');
      cy.get('#altitude-control').clear();
      cy.get('#altitude-control').type('2');
      cy.get('#number-of-lots-control').clear();
      cy.get('#number-of-lots-control').type('2');
      cy.get('#description-control').clear();
      cy.get('#description-control').type('Try');
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
      cy.get('#add-parking-lot-option').click();
      cy.wait(500);
      cy.get('#hike-list-option').click();
      cy.wait(500);
      cy.get('#log-out-button').click();
    });
  });