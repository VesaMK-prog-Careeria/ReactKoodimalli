describe('Login functionality', () => {
  beforeEach(() => {
    // Navigoi Login-sivulle
    cy.visit('http://localhost:5173');
  });
// Testaa, että lomake renderöidään oikein
  it('renders the login form correctly', () => {
    cy.get('h2').should('contain', 'Login');
    cy.get('input[placeholder="Käyttäjätunnus"]').should('exist');
    cy.get('input[placeholder="Salasana"]').should('exist');
    cy.get('input[placeholder="Salasana uudelleen"]').should('exist');
    cy.get('input[type="submit"]').should('have.value', 'Kirjaudu');
  });
// Testaa, että käyttäjä voi kirjautua sisään
  it('shows error message if passwords do not match', () => {
    cy.get('input[placeholder="Käyttäjätunnus"]').type('Teppo');
    cy.get('input[placeholder="Salasana"]').type('Testaaja');
    cy.get('input[placeholder="Salasana uudelleen"]').type('Testaaja');
    cy.get('input[type="submit"]').click();

    // Tarkistetaan virheilmoitus
    cy.contains('Kirjautuminen onnistui').should('be.visible');
  });
});
