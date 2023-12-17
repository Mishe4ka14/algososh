import { urlTest } from '../../src/constants/testConstants';

describe('Очередь работает корректно', function() {
    beforeEach(function() {
        cy.visit(urlTest);
        cy.get('[data-cy="queue"]').click();
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
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.wait(1000);

        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .should('have.text', '22')

        cy.get('div[class*="circle_head"]')
            .eq(0)
            .contains('head')

        cy.get('div[class*="circle_tail"]')
            .eq(0)
            .contains('tail')

        const newtext = '11';
        cy.get('[data-testid="input"]').type(newtext)
        cy.get('[data-testid="add"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.wait(1000);

        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .should('have.text', '11')

        cy.get('div[class*="circle_tail"]')
            .eq(0)
            .contains('tail')
            .should('not.exist')

        cy.get('div[class*="circle_tail"]')
            .eq(1)
            .contains('tail')
    });

    it('Элементы удаляются корректно' , function() {
        const text = 'qwe';
        cy.get('[data-testid="input"]').type(text)
        cy.get('[data-testid="add"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.wait(1000);

        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .should('have.text', 'qwe')

        cy.get('div[class*="circle_head"]')
            .eq(0)
            .contains('head')

        cy.get('div[class*="circle_tail"]')
            .eq(0)
            .contains('tail')

        const newtext = '123';
        cy.get('[data-testid="input"]').type(newtext)
        cy.get('[data-testid="add"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.wait(1000);

        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)')
            .should('have.text', '123')

        cy.get('div[class*="circle_tail"]')
            .eq(0)
            .contains('tail')
            .should('not.exist')

        cy.get('div[class*="circle_tail"]')
            .eq(1)
            .contains('tail')

        cy.get('[data-testid="delete"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)')

        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('contain', '')


        cy.get('div[class*="circle_head"]')
            .eq(1)
            .contains('head')
    });

    it('Кнопка "Очистить" работает корректно' , function() {
      const text = '..';
      cy.get('[data-testid="input"]').type(text)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wait(1000);

      cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')
          .should('have.text', '..')

      cy.get('div[class*="circle_head"]')
          .eq(0)
          .contains('head')

      cy.get('div[class*="circle_tail"]')
          .eq(0)
          .contains('tail')

      const newtext = '123';
      cy.get('[data-testid="input"]').type(newtext)
      cy.get('[data-testid="add"]').should('not.be.disabled').click()
      cy.get('div[class*="circle_circle"]')
          .eq(1)
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.wait(1000);

      cy.get('div[class*="circle_circle"]')
          .eq(1)
          .should('have.css', 'border-color', 'rgb(0, 50, 255)')
          .should('have.text', '123')

      cy.get('div[class*="circle_tail"]')
          .eq(0)
          .contains('tail')
          .should('not.exist')

      cy.get('div[class*="circle_tail"]')
          .eq(1)
          .contains('tail')

      cy.get('[data-testid="delete"]').should('not.be.disabled').click()
      cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('have.css', 'border-color', 'rgb(210, 82, 225)')

      cy.get('div[class*="circle_circle"]')
          .eq(0)
          .should('contain', '')


      cy.get('div[class*="circle_head"]')
          .eq(1)
          .contains('head')

      cy.get('[data-testid="clean"]').should('not.be.disabled').click()
      cy.get('div[class*="circle"]')
          .should('contain', '')

  });
})