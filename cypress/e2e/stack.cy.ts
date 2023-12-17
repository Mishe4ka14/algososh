import { urlTest, INPUT, CIRCLE, COLOR_PURPLE } from '../../src/constants/testConstants';


describe('Стек работает корректно', function() {
  beforeEach(function() {
      cy.visit(urlTest);
      cy.get('[data-cy="stack"]').click();
      cy.get(INPUT).clear()
  });

  it('Если в инпуте пусто, кнопка добаления недоступна', function() {
      cy.get(INPUT).should('contain', '')
      cy.get('[data-testid="add"]').should('be.disabled')
  });

  it('Элементы добаляются корректно' , function() {
      const text = '22';
      cy.get(INPUT).type(text)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get(CIRCLE)
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', COLOR_PURPLE)

      cy.wait(100);

      cy.get(CIRCLE)
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')

      const newtext = '11';
      cy.get(INPUT).type(newtext)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get(CIRCLE)
          .eq(1)
          .should('have.text', '11')
          .should('have.css', 'border-color', COLOR_PURPLE)

      cy.wait(100);

      cy.get(CIRCLE)
          .eq(1)
          .should('have.text', '11')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')
          .should('not.exist')

      cy.get('div[class*="circle_head"]')
          .eq(1)
          .contains('top')
  });

  it('Элементы удаляются корректно' , function() {
      const text = '22';
      cy.get(INPUT).type(text)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get(CIRCLE)
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', COLOR_PURPLE)

      cy.wait(100);

      cy.get(CIRCLE)
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')

      const newtext = '1';
      cy.get(INPUT).type(newtext)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get(CIRCLE)
          .eq(1)
          .should('have.text', '1')
          .should('have.css', 'border-color', COLOR_PURPLE)

      cy.wait(100);

      cy.get(CIRCLE)
          .eq(1)
          .should('have.text', '1')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')
          .should('not.exist')

      cy.get('div[class*="circle_head"]')
          .eq(1)
          .contains('top')

      cy.get('[data-testid="delete"]').should('not.be.disabled').click()
      cy.get(CIRCLE)
          .eq(1)
          .should('have.text', '1')
          .should('have.css', 'border-color', COLOR_PURPLE)

      cy.get(CIRCLE)
          .eq(1)
          .should('not.exist')


      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')
  })



  it('Кнопка "Очистить" работает корректно' , function() {
      const text = '22';
      cy.get(INPUT).type(text)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get(CIRCLE)
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', COLOR_PURPLE)

      cy.wait(100);

      cy.get(CIRCLE)
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')

      const newtext = '11';
      cy.get(INPUT).type(newtext)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get(CIRCLE)
          .eq(1)
          .should('have.text', '11')
          .should('have.css', 'border-color', COLOR_PURPLE)

      cy.wait(100);

      cy.get(CIRCLE)
          .eq(1)
          .should('have.text', '11')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')
          .should('not.exist')

      cy.get('div[class*="circle_head"]')
          .eq(1)
          .contains('top')

      cy.get('[data-testid="clean"]').should('not.be.disabled').click()
      cy.get('div[class*="circle"]')
          .should('not.exist')

  });
})
