/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            home.cy.js
*
* Copyright (c) 2022 - se2022-Team03
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('Render the home page', () => {
    it('should goes to home', () => {
      cy.visit('/');
      cy.wait(100)
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
      cy.get('#reset-filter-button').should('be.visible');
      cy.get('#filter-button').should('be.visible');
      cy.get(':nth-child(1) > .card').should('be.visible');
      cy.get(':nth-child(1) > .card').should('be.visible');
      cy.get('h3').contains(/Sentiero per il Rocciamelone/i).should('be.visible');
      cy.get('#difficulty').contains(/Professional Hiker/i).should('be.visible');
      cy.get('#time').contains(/6.5 hours/i).should('be.visible');
      cy.get('#length').contains(/9 km/i).should('be.visible');
      cy.get('#ascent').contains(/1353 m/i).should('be.visible');
      cy.get('#description').contains(/Un percorso conosciutissimo, molto amato da Valsusini e non solo. È lungo e impegnativo per via del dislivello, ma segnalato benissimo e soprattutto c.../i).should('be.visible');
    });
    /*it('has home title', () => {
      cy.visit('/');
      cy.wait(1000);
      cy.get('h1').contains(/Welcome to HikeTracker/i);
    })
  
    it('has button to hike list', () => {
      cy.visit('/');
      cy.wait(1000);
      cy.get('button').contains(/Hikes list/i);
    })*/
  })