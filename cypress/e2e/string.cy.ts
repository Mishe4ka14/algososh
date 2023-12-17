import { urlTest, INPUT, CIRCLE } from '../../src/constants/testConstants';

describe('строка разворачивается корректно', function() {
  beforeEach(function() {
      cy.visit(urlTest);
      cy.get('[data-cy="string"]').click();
      cy.get(INPUT).clear()
  });

  it('кнопка заблокирована когда инпут пустой', function() {
      cy.get(INPUT).should('contain', '')
      cy.get('[data-testid="button"]').should('be.disabled')
  });

  it('строка разворачивается корректно', function() {
      const text = '123'
      cy.get(INPUT).type(text)
      cy.get('[data-testid="button"]').should('not.be.disabled').click()
      for(let i = 0; i < text.length / 2; i++) {
          cy.get(CIRCLE)
              .eq(i)
              .should('have.css', 'border-color', 'rgb(127, 224, 81)')

          cy.get(CIRCLE)
              .eq(text.length - 1 - i)
              .should('have.css', 'border-color', 'rgb(127, 224, 81)')

          cy.wait(1000);

          cy.get(CIRCLE)
              .eq(i)
              .should('have.css', 'border-color', 'rgb(127, 224, 81)')

          cy.get(CIRCLE)
              .eq(text.length - 1 - i)
              .should('have.css', 'border-color', 'rgb(127, 224, 81)')
      }
  });

}); 