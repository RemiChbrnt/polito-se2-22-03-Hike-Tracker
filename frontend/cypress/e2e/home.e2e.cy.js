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

describe('Home', () => {
    /*it('goes to home', () => {
      cy.visit('/');
      cy.wait(100)
    })*/
    it('should visit home page of unauthenticated user', () => {
        cy.visit('/'); 
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