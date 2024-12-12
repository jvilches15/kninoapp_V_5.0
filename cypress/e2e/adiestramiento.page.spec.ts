describe('Prueba de la página de Adiestramiento', () => {
  beforeEach(() => {
    
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: {
        token: 'token_valido',
      }
    }).as('loginRequest');
    
    
    cy.visit('/tabs/adiestramiento');

    
    window.localStorage.setItem('auth_token', 'token_valido');
  });

  it('Verifica que la página de adiestramiento cargue correctamente', () => {
    
    cy.get('body'); 
  });

  it('debería listar los tips de adiestramiento correctamente', () => {

    cy.get('ion-item');

  });



});

