import { urlTest } from '../../src/constants/testConstants';


describe('Стек работает корректно', function() {
  beforeEach(function() {
      cy.visit(urlTest);
      cy.get('[data-cy="stack"]').click();
      cy.get('[data-testid="input"]').clear()
  });

  it('Если в инпуте пусто, кнопка добаления недоступна', function() {
      cy.get('[data-testid="input"]').should('contain', '')
      cy.get('[data-testid="add"]').should('be.disabled')
  });

  it('Элементы добаляются корректно' , function() {
      const text = '22';
      cy.get('[data-testid="input"]').type(text)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wait(100);

      cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')

      const newtext = '11';
      cy.get('[data-testid="input"]').type(newtext)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get('div[class*="circle_circle"]')
          .eq(1)
          .should('have.text', '11')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wait(100);

      cy.get('div[class*="circle_circle"]')
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
      cy.get('[data-testid="input"]').type(text)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wait(100);

      cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')

      const newtext = '1';
      cy.get('[data-testid="input"]').type(newtext)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get('div[class*="circle_circle"]')
          .eq(1)
          .should('have.text', '1')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wait(100);

      cy.get('div[class*="circle_circle"]')
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
      cy.get('div[class*="circle_circle"]')
          .eq(1)
          .should('have.text', '1')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.get('div[class*="circle_circle"]')
          .eq(1)
          .should('not.exist')


      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')
  })



  it('Кнопка "Очистить" работает корректно' , function() {
      const text = '22';
      cy.get('[data-testid="input"]').type(text)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wait(100);

      cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('have.text', '22')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')

      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('top')

      const newtext = '11';
      cy.get('[data-testid="input"]').type(newtext)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get('div[class*="circle_circle"]')
          .eq(1)
          .should('have.text', '11')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wait(100);

      cy.get('div[class*="circle_circle"]')
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
