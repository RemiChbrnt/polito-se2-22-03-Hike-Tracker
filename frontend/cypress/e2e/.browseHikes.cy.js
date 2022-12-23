/*describe('Browse Hikes Home Page', {
    retries: {
      runMode: 2,
      openMode: 2,
    },
  }, () => {
  it('should visit home page of unauthenticated user', () => {
    cy.visit('/'); 
  });

  it('should display application logo', () => {
    cy.visit('/'); 
    cy.get('#logo').should('be.visible');
  });

  it('should click on the login icon', () => {
    cy.visit('/'); 
    cy.get('nav').find('i').trigger('click');  
    cy.location("pathname").should('eq', "/login");

  }); 

  it('should display Hike List title', () => {
    cy.visit('/'); 
    cy.contains('[data-test-id="title"]', 'Hike List');
  }); 

  it('should click on the filter icon', () => {
    cy.visit('/'); 
    cy.get('#filter-button').trigger('click');
    cy.get('.modal-dialog')
      .should('be.visible')
      .find('.modal-header')
      .find('.modal-title')
      .should('contain', 'Filter Selection'); 

  });

  it('should contain three levels of difficulty filter', () => {
    cy.visit('/'); 
    cy.get('#filter-button').trigger('click');
    cy.get('[aria-label=difficulty]').children('option').then(options=>{
      const actual=[...options].map(o=>o.value)
      expect(actual).to.deep.eq(['Select the Difficulty', 'Tourist', 'Hiker', 'Pro'])
    })
  });

  it('should select difficulty filter', () => {
    cy.visit('/'); 
    cy.get('#filter-button').trigger('click');
    cy.get('[aria-label=difficulty]').select('Tourist', [{force: true}, {setTimeout: 20000}]).invoke('val').should('eq', 'Tourist')
    cy.get('[data-test-id="confirm"]').trigger('click');
    cy.wait(3000)
    cy.get(".card").should("have.length", 1);
    cy.get(".card [data-test-id='difficulty']").contains('tourist')
  });

  it('should check length filter', () => {
    cy.visit('/'); 
    cy.get('#filter-button').trigger('click');
    cy.get('#minLength-input').type('8'); 
    cy.get('[data-test-id="confirm"]').trigger('click');
    cy.get(".card").should("have.length", 1);
    cy.get(".card>card-body>list-group").find('[data-test-id="length"]').should('contain', "Length : 9 km")
  });

  it('should check ascent filter', () => {
    cy.visit('/'); 
    cy.get('#filter-button').trigger('click');
    cy.get('#min-ascent').type('1000'); 
    cy.get('[data-test-id="confirm"]').trigger('click');
    cy.get(".card").should("have.length", 2);
  });

  it('should check time filter', () => {
    cy.visit('/'); 
    cy.get('#filter-button').trigger('click');
    cy.get('#min-time').type('5'); 
    cy.get('[data-test-id="confirm"]').trigger('click');
    cy.get(".card").should("have.length", 1);
  }); 
})*/