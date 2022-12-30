/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          cypress/e2e
* File:            HT2_signUpVisitor.cy.js
*
* Copyright (c) 2022 - se2022-Team03
* All rights reserved.
* --------------------------------------------------------------------
*/

describe('Sign-up', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should goes to sign-up page', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#sign-up-button').click();
        cy.wait(500);

        //check for sign-up page
        cy.get('#sign-up-title').should('be.visible');
        cy.get('#email-label').should('be.visible');
        cy.get('#email-control').should('be.visible');
        cy.get('#password-label').should('be.visible');
        cy.get('#password-control').should('be.visible');
        cy.get('#full-name-label').should('be.visible');
        cy.get('#full-name-control').should('be.visible');
        cy.get('#role-label').should('be.visible');
        cy.get('#role-select').should('be.visible');
    });

    it('should has local guide options', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#sign-up-button').click();
        cy.wait(500);

        //check for local guide options
        cy.get('#role-select').select('guide');
        cy.wait(500);
        cy.get('#phone-number-label').should('be.visible');
        cy.get('#phone-number-label').should('be.visible');
    });

    it('should has hut worker options', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#sign-up-button').click();
        cy.wait(500);

        //check for hut worker options
        cy.get('#role-select').select('hutworker');
        cy.wait(500);
        cy.get('#phone-number-label').should('be.visible');
        cy.get('#phone-number-label').should('be.visible');
        cy.get('#select-hut-label').should('be.visible');
        cy.get('#select-hut-select').should('be.visible');
    });

    it('should has sign-up form editable', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#sign-up-button').click();
        cy.wait(500);

        //check for editable form
        cy.get('#email-control').clear();
        cy.get('#email-control').type('Try');
        cy.get('#password-control').clear();
        cy.get('#password-control').type('Try');
        cy.get('#full-name-control').clear();
        cy.get('#full-name-control').type('Try');
        cy.wait(500);

        cy.get('#confirm-button').click();
    });

    it('should has sign-up form editable for local guide', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#sign-up-button').click();
        cy.wait(500);

        //check for editable form
        cy.get('#email-control').clear();
        cy.get('#email-control').type('Try');
        cy.get('#password-control').clear();
        cy.get('#password-control').type('Try');
        cy.get('#full-name-control').clear();
        cy.get('#full-name-control').type('Try');
        cy.wait(500);

        cy.get('#role-select').select('guide');
        cy.wait(500);

        cy.get('#phone-number-control').clear();
        cy.get('#phone-number-control').type('1234567890');

        cy.get('#confirm-button').click();
    });

    it('should has sign-up form editable for hut worker', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#sign-up-button').click();
        cy.wait(500);

        //check for editable form
        cy.get('#email-control').clear();
        cy.get('#email-control').type('Try');
        cy.get('#password-control').clear();
        cy.get('#password-control').type('Try');
        cy.get('#full-name-control').clear();
        cy.get('#full-name-control').type('Try');
        cy.wait(500);
        
        cy.get('#role-select').select('hutworker');
        cy.wait(500);

        cy.get('#phone-number-control').clear();
        cy.get('#phone-number-control').type('1234567890');
        cy.get('#select-hut-select').select('15');

        cy.get('#confirm-button').click();
    });

    it('should return to home', () => {
        cy.get('#user-log-in-button').click();
        cy.get('#sign-up-button').click();
        cy.wait(500);
        
        cy.get('#back-button').click()
        cy.wait(500);
        
        cy.get('#back-button').click()
        cy.wait(500);
    });
});