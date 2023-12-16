import { urlTest } from '../../src/constants/testConstants';

describe('строка разворачивается корректно', function() {
  beforeEach(function() {
      cy.visit(urlTest);
      cy.get('[data-cy="string"]').click();
      cy.get('[data-testid="input"]').clear()
  });

  it('кнопка заблокирована когда инпут пустой', function() {
      cy.get('[data-testid="input"]').should('contain', '')
      cy.get('[data-testid="button"]').should('be.disabled')
  });

  it('строка разворачивается корректно', function() {
      const text = '123'
      cy.get('[data-testid="input"]').type(text)
      cy.get('[data-testid="button"]').should('not.be.disabled').click()
      for(let i = 0; i < text.length / 2; i++) {
          cy.get('div[class*="circle_circle"]')
              .eq(i)
              .should('have.css', 'border-color', 'rgb(210, 82, 225)')

          cy.get('div[class*="circle_circle"]')
              .eq(text.length - 1 - i)
              .should('have.css', 'border-color', 'rgb(210, 82, 225)')

          cy.wait(100);

          cy.get('div[class*="circle_circle"]')
              .eq(i)
              .should('have.css', 'border-color', 'rgb(127, 224, 81)')

          cy.get('div[class*="circle_circle"]')
              .eq(text.length - 1 - i)
              .should('have.css', 'border-color', 'rgb(127, 224, 81)')
      }
  });

}); 