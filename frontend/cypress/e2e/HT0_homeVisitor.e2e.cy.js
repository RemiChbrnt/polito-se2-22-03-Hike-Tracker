/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT0_homeVisitor.cy.js
*
* Copyright (c) 2022 - se2022-Team03
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('Render the home page', () => {
    it('should goes to home', () => {
      cy.visit('/');
    })

    it('should has application logo', () => {
      cy.visit('/');
      cy.get('#logo').should('be.visible');
    });
  
    it('should has login button', () => {
      cy.visit('/');
      cy.get('h1 > .bi').should('be.visible');
    });

    it('should has hike list', () => {
      cy.visit('/');
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
  });