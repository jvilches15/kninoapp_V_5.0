describe('Prueba de la página de registro', () => {
  beforeEach(() => {
    
    
    cy.visit('http://localhost:8100/registrar'); 
  });

  it('Verifica que la página de registro cargue correctamente', () => {
    cy.get('ion-card-title').contains('Registro de Usuario').should('exist');
    cy.get('ion-card').should('exist');
  });

  it('debería mostrar un error si la contraseña no tiene 4 caracteres', () => {
   
    cy.get('ion-input').eq(0).type('Juan'); 
    cy.get('ion-input').eq(1).type('Pérez'); 
    cy.get('ion-input').eq(2).type('juan.perez@example.com'); 
    cy.get('ion-input').eq(3).type('12345'); 
    cy.get('ion-input').eq(4).type('Santiago, Chile'); 

    
    cy.get('ion-input[type="date"]').should('be.visible').type('2000-12-15'); 

    
    cy.get('ion-input[name="mascotaNombre"]').clear().type('Rex'); 
    cy.get('ion-input[name="mascotaRaza"]').clear().type('Labrador'); 
    cy.get('ion-input[name="mascotaEdad"]').clear().type('2 años'); 

   
    cy.get('ion-button').contains('Guardar').click();

    
    cy.contains('La contraseña debe ser de exactamente 4 caracteres.').should('be.visible');
  });

  it('debería mostrar un error si la contraseña contiene caracteres no numéricos', () => {
    
    cy.get('ion-input').eq(0).type('Juan'); 
    cy.get('ion-input').eq(1).type('Pérez'); 
    cy.get('ion-input').eq(2).type('juan.perez@example.com'); 
    cy.get('ion-input').eq(3).type('abc1'); 
    cy.get('ion-input').eq(4).type('Santiago, Chile'); 

    
    cy.get('ion-input[type="date"]').should('be.visible').type('2000-12-15'); 

    
    cy.get('ion-input[name="mascotaNombre"]').clear().type('Rex'); 
    cy.get('ion-input[name="mascotaRaza"]').clear().type('Labrador'); 
    cy.get('ion-input[name="mascotaEdad"]').clear().type('2 años'); 

    
    cy.get('ion-button').contains('Guardar').click();

    
    cy.contains('La contraseña debe contener solo números.').should('be.visible');
  });

  
});


