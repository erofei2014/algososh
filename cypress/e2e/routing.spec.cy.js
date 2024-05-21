describe('Корректная работа роутинга', function () {
  beforeEach(function () {
    cy.visit('/');
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('Корректная работа ссылки на страницу разворота строки', () => {
    cy.get('a[href*="recursion"]').click();
    cy.contains('Строка');
  });

  it('Корректная работа ссылки на страницу Фибоначчи', () => {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains('Фибоначчи');
  });

  it('Корректная работа ссылки на страницу сортировки массива', () => {
    cy.get('a[href*="sorting"]').click();
    cy.contains('Сортировка');
  });

  it('Корректная работа ссылки на страницу стека', () => {
    cy.get('a[href*="stack"]').click();
    cy.contains('Стек');
  });

  it('Корректная работа ссылки на страницу очереди', () => {
    cy.get('a[href*="queue"]').click();
    cy.contains('Очередь');
  });

  it('Корректная работа ссылки на страницу связного списка', () => {
    cy.get('a[href*="list"]').click();
    cy.contains('Связный список');
  });
});