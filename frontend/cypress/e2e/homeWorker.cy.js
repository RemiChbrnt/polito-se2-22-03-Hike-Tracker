import { it } from "node:test";

describe('Hut Worker Home Page', {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  }, () => {
    it('should visit the login page', () => {
        cy.visit('/login'); 
    });

    it('should login as a hut worker', ()=>{
        cy.visit('http://localhost:3000/login'); 
        cy.get('form').find('#parent1').find("[type='email']").clear()
        cy.get('form').find('#parent1').find("[type='email']").type('jen.shiro@chiocciola.it');
        cy.get('form').find('#parent2').find("[type='password']").clear()
        cy.get('form').find('#parent2').find("[type='password']").type('testPassword4');
        cy.contains('Log-In').click()
        cy.url().should('include', '/')
        });
    it('should add a picture to a hut', ()=>{
        cy.visit('http://localhost:3000/login'); 
        cy.get('form').find('#parent1').find("[type='email']").clear()
        cy.get('form').find('#parent1').find("[type='email']").type('jen.shiro@chiocciola.it');
        cy.get('form').find('#parent2').find("[type='password']").clear()
        cy.get('form').find('#parent2').find("[type='password']").type('testPassword4');
        cy.contains('Log-In').click(); 
        cy.url().should('include', '/'); 
        cy.contains('button', 'Add Photo').trigger('click'); 
        cy.url().should('include', '/add-hut-photo');
        cy.get('input[type=file]').selectFile('example.jpeg');
        cy.contains('button', 'CONFIRM').trigger('click'); 
    }); 
    it('should update hut status linked to a hike', ()=>{
        cy.visit('http://localhost:3000/login'); 
        cy.get('form').find('#parent1').find("[type='email']").clear()
        cy.get('form').find('#parent1').find("[type='email']").type('jen.shiro@chiocciola.it');
        cy.get('form').find('#parent2').find("[type='password']").clear()
        cy.get('form').find('#parent2').find("[type='password']").type('testPassword4');
        cy.contains('Log-In').click(); 
        cy.url().should('include', '/'); 
        cy.get('.nav-link').contains('Update Status').trigger('click'); 
        cy.url().should('include', '/update-hut-status');
        cy.get('.btn').find('[data-test="modify-button"]').trigger('click');
        cy.get('#status-form').find('select').select(1); 
        cy.get('#description-form').find('textarea').type('work in progress'); 
        cy.contains('button', 'CONFIRM').trigger('click'); 
        cy.should('contain', 'Your submission has been sent successfully!');
    }); 

});