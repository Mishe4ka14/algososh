import { urlTest } from '../../src/constants/testConstants';

describe('Список работает корректно', function() {
    beforeEach(function() {
        cy.visit(urlTest);
        cy.get('[data-cy="list"]').click();
        cy.get('[data-testid="input"]').clear()
    });

    it('Если в инпуте пусто, кнопки недоступны', function() {
        cy.get('[data-testid="input"]').should('contain', '')
        cy.get('[data-testid="add-tail"]').should('be.disabled')
        cy.get('[data-testid="add-head"]').should('be.disabled')
        cy.get('[data-testid="add-index"]').should('be.disabled')
        cy.get('[data-testid="delete-index"]').should('be.disabled')
    });

    it('Дефолтный список рендерится корректно', function() {
        for(let i = 0; i < 6; i++) {
            cy.get('div[class*="circle_circle"]')
                .eq(i)
                .should('not.be.undefined')
        }
    });

    it('Добавление элемента в head работает корректно', function() {
        const text = '33';
        cy.get('[data-testid="input"]').type(text)
        cy.get('[data-testid="add-head"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.text', '33')
    });

    it('Добавление элемента в tail работает корректно', function() {
        const text = '22';
        cy.get('[data-testid="input"]').type(text)
        cy.get('[data-testid="add-tail"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(4)
            .should('have.text', '22')
    });

    it('Добавление элемента по индексу работает корректно', function() {
        const text = '11';
        const textIndex  = '2'
        cy.get('[data-testid="input"]').type(text)
        cy.get('[data-testid="input-index"]').type(textIndex)
        cy.get('[data-testid="add-index"]').should('not.be.disabled').click()
        cy.get('div[class*="circle_circle"]')
            .eq(2)
            .should('have.text', '11')
    });

    it('Удаление элемента из head работает корректно', function() {
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .then((circle) => {
                const text = circle.text()
                cy.get('[data-testid="delete-head"]').should('not.be.disabled').click()
                cy.wait(1000)
                cy.get('div[class*="circle_circle"]')
                    .eq(0)
                    .should('not.have.text', text)
            })
    });

    it('Удаление элемента из tail работает корректно', function() {
        cy.get('[data-testid="delete-tail"]').should('not.be.disabled').click()  
        cy.get('div[class*="circle_circle"]')
            .eq(8)
            .should('not.exist')

    });

    it('Удаление элемента из tail работает корректно', function() {
        const textIndex  = '3'
        cy.get('[data-testid="input-index"]').type(textIndex)
        cy.get('div[class*="circle_circle"]')
            .eq(3)
            .then((circle) => {
                const text = circle.text()
                cy.get('[data-testid="delete-index"]').should('not.be.disabled').click()
                cy.wait(1000)
                cy.get('div[class*="circle_circle"]')
                    .eq(3)
                    .should('not.have.text', text)
            })

    });

})