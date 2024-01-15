import { urlTest, INPUT, CIRCLE } from '../../src/constants/testConstants';

describe('Числа генерируются корректно', function() {
    beforeEach(function() {
        cy.visit(urlTest);
        cy.get('[data-cy="fibonacci"]').click();
        cy.get(INPUT).clear();
    });

    it('При пустом инпуте кнопка недоступна', function() {
        cy.get(INPUT).should('contain', '');
        cy.get('[data-testid="button"]').should('be.disabled');
    });

    it('Числа генерируются корректно при наибольшем значении', function() {
        const number = '19'; 
        cy.get(INPUT).type(number);
        cy.get('[data-testid="button"]').should('not.be.disabled').click();

        cy.get(CIRCLE).as('circle');
        for (let i = 0; i < 19; i++) {
            cy.get('@circle').eq(i).should('exist');
        }

        cy.get('@circle').should('have.length', 19);
    });

    it('Числа генерируются корректно при наименьшем значении', function() {
      const number = '1'; 
      cy.get(INPUT).type(number);
      cy.get('[data-testid="button"]').should('not.be.disabled').click();

      cy.get(CIRCLE).as('circle');
      for (let i = 0; i < 2; i++) {
          cy.get('@circle').eq(i).should('exist');
      }

      cy.get('@circle').should('have.length', 2);
  });
});