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
    cy.get('#hike-title').should('be.visible');
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

    cy.get('[for="show-parkings"]').click();
    cy.get('[for="show-parkings"]').click();

    cy.get('[for="show-huts"]').click();
    cy.get('[for="show-huts"]').click();

    cy.get('[for="show-points-interest"]').click();
    cy.get('[for="show-points-interest"]').click();

  });

  it('should return to home', () => {
    cy.get(':nth-child(1) > .card > .card-body').click();
    cy.get('#home-button').click();
  });

  it('should has hike filter options', () => {
    cy.get('#filter-button').click();

    cy.get('#filter-on-map-button').should('be.visible');
    cy.get('#difficulty-select').should('be.visible');
    cy.get('#region-select').should('be.visible');
    cy.get('#minimum-length-label').should('be.visible');
    cy.get('#minimum-length-control').should('be.visible');
    cy.get('#maximum-length-label').should('be.visible');
    cy.get('#maximum-length-control').should('be.visible');
    cy.get('#minimum-ascent-label').should('be.visible');
    cy.get('#minimum-ascent-control').should('be.visible');
    cy.get('#maximum-ascent-label').should('be.visible');
    cy.get('#maximum-ascent-control').should('be.visible');
    cy.get('#minimum-time-label').should('be.visible');
    cy.get('#minimum-time-control').should('be.visible');
    cy.get('#maximum-time-label').should('be.visible');
    cy.get('#maximum-time-control').should('be.visible');
    cy.get('#confirm-button').should('be.visible');
  });

  it('should hike filter be editable', () => {
    cy.get('#filter-button').click();

    cy.get('#filter-on-map-button').click();
    cy.get('#radius-label').should('be.visible');
    cy.get('#radius-control').clear();
    cy.get('#radius-control').type('10');
    cy.get('#specific-filter-button').click();

    cy.get('#difficulty-select').select('Tourist');
    cy.get('#region-select').select('Apulia');
    cy.get('#minimum-length-control').clear();
    cy.get('#minimum-length-control').type('3');
    cy.get('#maximum-length-control').clear();
    cy.get('#maximum-length-control').type('4');
    cy.get('#minimum-ascent-control').clear();
    cy.get('#minimum-ascent-control').type('3');
    cy.get('#maximum-ascent-control').clear();
    cy.get('#maximum-ascent-control').type('4');
    cy.get('#minimum-time-control').clear();
    cy.get('#minimum-time-control').type('3');
    cy.get('#maximum-time-control').clear();
    cy.get('#maximum-time-control').type('4');
    cy.get('#confirm-button').click();
  });
});