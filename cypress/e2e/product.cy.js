describe('Product komponentti', function () {
  beforeEach(() => {
    cy.login('Teppo', 'Testaaja'); // Kirjautumistoiminnallisuus löytyy commands.js-tiedostosta
  });

  it('renderöi formin oikein', function () {
    cy.visit('http://localhost:5173/product'); // Käy tuotteen lisäyssivulla
    cy.get('h2').should('contain', 'Lisää tuote'); // Varmista, että lomake näkyy
  });

  it('Lisää tuote ja poista', function () {
    // Siirrytään tuotteen lisäyssivulle
    cy.visit('http://localhost:5173/product');
    cy.get('h2').should('contain', 'Lisää tuote').click();

    // Syötetään lomakkeeseen tietoja
    cy.get('input[placeholder="Tuotteen nimi"]').type('Testituote'); //haetaan input-kenttä, jolla on placeholder-arvo "Tuotteen nimi" ja kirjoitetaan siihen "Testituote"
    cy.get('input[placeholder="Toimittajan ID"]').type('1');
    cy.get('input[placeholder="Kategorian ID"]').type('2');
    cy.get('input[placeholder="Määrä per yksikkö"]').type('10 kpl');
    cy.get('input[placeholder="Yksikköhinta"]').type('50');
    cy.get('input[placeholder="Varastossa"]').type('100');
    cy.get('input[placeholder="Tilattu"]').type('20');
    cy.get('input[placeholder="Tilaustaso"]').type('5');
    cy.get('input[placeholder="Kuvan linkki"]').type('https://example.com/image.png');

    // Klikataan lisää-painiketta
    cy.get('input[type="submit"]').click();

    // Varmistetaan, että onnistumisviesti näkyy
    cy.contains('Tuotteen lisäys onnistui Testituote').should('be.visible');

    // Poistetaan lisätty tuote
    cy.get('table') // Valitaan taulukko
      .contains('Testituote') // Etsitään lisätty tuote taulukosta
      .parents('tr') // Hakee kyseisen tuotteen rivin
      // Etsii Delete button riviltä
      .find('button').contains('Delete').click();

    // Varmistetaan, että poistoviesti näkyy
    cy.contains('Product Testituote deleted').should('be.visible');
});
});