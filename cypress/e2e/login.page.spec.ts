describe('Página de Login', () => {
  beforeEach(() => {
    
    cy.visit('/login');
  });

  it('debería cargar la página de login correctamente', () => {
    
    cy.get('ion-card').should('be.visible');
    cy.get('.logo-container img').should('have.attr', 'src', 'assets/img/knino_logos.png');
  });

  it('debería mostrar un error si el correo electrónico está vacío', () => {
   
    cy.get('ion-button.login-button').click();
    cy.contains('Debe ingresar un correo electrónico.').should('be.visible');
  });

  it('debería mostrar un error si el correo electrónico no es válido', () => {
    
    cy.get('ion-input[type="email"]').type('correo@no_valido');
    cy.get('ion-button.login-button').click();
    cy.contains('Debe ingresar un formato de correo válido.').should('be.visible');
  });

  it('debería mostrar un error si la contraseña está vacía', () => {
   
    cy.get('ion-input[type="email"]').type('usuario@ejemplo.com');
    cy.get('ion-button.login-button').click();
    cy.contains('Debe ingresar una contraseña.').should('be.visible');
  });

  it('debería mostrar un error si la contraseña no tiene 4 caracteres', () => {
    
    cy.get('ion-input[type="email"]').type('usuario@ejemplo.com');
    cy.get('ion-input[type="password"]').type('12345');
    cy.get('ion-button.login-button').click();
    cy.contains('La contraseña debe ser de exactamente 4 caracteres.').should('be.visible');
  });

  it('debería mostrar un error si la contraseña contiene caracteres no numéricos', () => {
    
    cy.get('ion-input[type="email"]').type('usuario@ejemplo.com');
    cy.get('ion-input[type="password"]').type('abc1');
    cy.get('ion-button.login-button').click();
    cy.contains('La contraseña debe contener solo números.').should('be.visible');
  });

  
  it('debería redirigir a la página de registro al hacer clic en "Registrar"', () => {
   
    cy.get('ion-button.register-button').click();
    cy.url().should('include', '/registrar');
  });
});

