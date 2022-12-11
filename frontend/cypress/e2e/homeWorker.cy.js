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

});