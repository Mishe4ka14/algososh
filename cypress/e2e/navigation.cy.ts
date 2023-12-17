import {urlTest} from '../../src/constants/testConstants'

describe('приложение работает корректно с путями', function() {
  const routes = [
    { cy: 'string', path: '/recursion' },
    { cy: 'fibonacci', path: '/fibonacci' },
    { cy: 'sorting', path: '/sorting' },
    { cy: 'stack', path: '/stack' },
    { cy: 'queue', path: '/queue' },
    { cy: 'list', path: '/list' },
  ];

  beforeEach(function() {
    cy.visit(urlTest);
  });

  routes.forEach(route => {
    it(`${route.cy} путь работает корректно`, function() {
      cy.get(`[data-cy="${route.cy}"]`).click();
      cy.location('pathname').should('eq', route.path);
    });
  });
});