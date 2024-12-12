describe('Prueba de la página de inicio (Home)', () => {
  beforeEach(() => {
    
    cy.visit('http://localhost:8100/home'); 
  });

  it('Verifica que la página cargue correctamente', () => {
   
    cy.get('h2').contains('Bienvenid@').should('exist');
  
    cy.get('ion-img.user-avatar').should('exist');
    
    cy.get('span').contains('Tienes 500 lenguetazos').should('exist');
  });

  it('Verifica que la lista de premios esté visible y se muestre correctamente', () => {
  
    cy.get('ion-item').should('exist');


  });

 
});

