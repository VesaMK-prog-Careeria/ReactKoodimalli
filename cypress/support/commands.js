// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Tämä suorittaa kirjautumisen sovellukseen
Cypress.Commands.add('login', (username, password) => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Käyttäjätunnus"]').type(username);
    cy.get('input[placeholder="Salasana"]').type(password);
    cy.get('input[placeholder="Salasana uudelleen"]').type(password);
    cy.get('input[type="submit"]').click();
    cy.contains('Kirjautuminen onnistui').should('be.visible');    
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })