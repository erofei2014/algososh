import { ColorTest } from "../../src/types/element-states";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { CLASS_CIRCLE, CLASS_CONTENT, CLASS_HEAD, CLASS_INDEX, CLASS_TAIL } from "../../src/constants/test";

export const ButtonTest = {
  Add: 'button_add',
  Remove: 'button_remove',
  Clear: 'button_clear',
};

describe('Корректная работа страницы "Стек"', function () {
  beforeEach(function () {
    cy.visit('/queue');
  });

  it('Кнопка не активна при пустом инпуте', () => {
    cy.get('input').should('be.empty');
    //находим кнопки
    cy.get('button[type=submit]').as(ButtonTest.Add);
    cy.get('button').contains('Удалить').parent().as(ButtonTest.Remove);
    cy.get('button').contains('Очистить').parent().as(ButtonTest.Clear);
    //проверяем кнопки
    cy.get(`@${ButtonTest.Add}`).should('be.disabled');
    cy.get(`@${ButtonTest.Remove}`).should('be.disabled');
    cy.get(`@${ButtonTest.Clear}`).should('be.disabled');
  });

  //Массив проверяемых действий
  const consequence = [
    //1ый шаг
    {
      action: { button: ButtonTest.Add, value: '1' },           //добавление элемента со значением 1
      animation: [                                              //нужный результат анимации
        [{ value: '1', color: ColorTest.Changing, head: 'head', tail: 'tail' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }], //круг сначала фиолетого цвета
        [{ value: '1', color: ColorTest.Default, head: 'head', tail: 'tail' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }]   //круг синего цвета
      ]
    },
    //2ой шаг
    {
      action: { button: ButtonTest.Add, value: '2' },           //добавление элемента со значением 2
      animation: [
        [{ value: '1', color: ColorTest.Default, head: 'head', tail: '' }, { value: '2', color: ColorTest.Changing, head: '', tail: 'tail' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }],
        [{ value: '1', color: ColorTest.Default, head: 'head', tail: '' }, { value: '2', color: ColorTest.Default, head: '', tail: 'tail' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }]
      ]
    },
    //3ий шаг
    {
      action: { button: ButtonTest.Add, value: '3' },           //добавление элемента со значением 3
      animation: [
        [{ value: '1', color: ColorTest.Default, head: 'head', tail: '' }, { value: '2', color: ColorTest.Default, head: '', tail: '' }, { value: '3', color: ColorTest.Changing, head: '', tail: 'tail' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }],
        [{ value: '1', color: ColorTest.Default, head: 'head', tail: '' }, { value: '2', color: ColorTest.Default, head: '', tail: '' }, { value: '3', color: ColorTest.Default, head: '', tail: 'tail' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }]
      ]
    },
    //4ый шаг
    {
      action: { button: ButtonTest.Remove, value: '' },       //удаление элемента
      animation: [
        [{ value: '1', color: ColorTest.Changing, head: '', tail: '' }, { value: '2', color: ColorTest.Default, head: 'head', tail: '' }, { value: '3', color: ColorTest.Default, head: '', tail: 'tail' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }],
        [{ value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '2', color: ColorTest.Default, head: 'head', tail: '' }, { value: '3', color: ColorTest.Default, head: '', tail: 'tail' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }]
      ]
    },
    //5ый шаг
    {
      action: { button: ButtonTest.Clear, value: '' },       //Очищение стека
      animation: [
        [{ value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }, { value: '', color: ColorTest.Default, head: '', tail: '' }]
      ]
    },
  ]

  it('Корректная анимация добавления элемента в очередь', () => {

    //находим кнопки
    cy.get('button[type=submit]').as(ButtonTest.Add);

    //основной цикл - проходим по действиям пользователя, вложенный - проходимся кадрам анимации
    for (let step = 0; step < 3; step++) {
      cy.get('input').type(consequence[step].action.value);
      cy.get(`@${ButtonTest.Add}`).click();

      for (let iteration = 0; iteration < consequence[step].animation.length; iteration++) {
        cy.get(CLASS_CONTENT).as('circle_content');
        cy.get('@circle_content').each(($circle_content, index) => {
          cy.get($circle_content).find(CLASS_CIRCLE).as('circle');
          cy.get($circle_content).find(CLASS_INDEX).first().as('circle_index');
          cy.get($circle_content).find(CLASS_HEAD).first().as('circle_head');
          cy.get($circle_content).find(CLASS_TAIL).first().as('circle_tail');

          cy.get('@circle').should('have.text', consequence[step].animation[iteration][index].value); //проверяем значение буквы в круге
          cy.get('@circle').should('have.css', 'border', consequence[step].animation[iteration][index].color); //проверяем цвет круга
          cy.get('@circle_index').should('have.text', index); //проверяем значение индекса
          cy.get('@circle_head').should('have.text', consequence[step].animation[iteration][index].head);//проверяем значение head
          cy.get('@circle_tail').should('have.text', consequence[step].animation[iteration][index].tail);//проверяем значение tail
        });
        cy.wait(SHORT_DELAY_IN_MS);
      }
    }
  });

  it('Корректная анимация удаления элемента из очереди', () => {

    //находим кнопки
    cy.get('button[type=submit]').as(ButtonTest.Add);
    cy.get('button').contains('Удалить').parent().as(ButtonTest.Remove);

    //проходим по действиям пользователя
    for (let step = 0; step < 3; step++) {
      cy.get('input').type(consequence[step].action.value);
      cy.get(`@${ButtonTest.Add}`).click();
    }
    cy.get(`@${ButtonTest.Remove}`).click();
    const step = 3;

    for (let iteration = 0; iteration < consequence[step].animation.length; iteration++) {
      cy.get(CLASS_CONTENT).as('circle_content');
      cy.get('@circle_content').each(($circle_content, index) => {
        cy.get($circle_content).find(CLASS_CIRCLE).as('circle');
        cy.get($circle_content).find(CLASS_INDEX).first().as('circle_index');
        cy.get($circle_content).find(CLASS_HEAD).first().as('circle_head');
        cy.get($circle_content).find(CLASS_TAIL).first().as('circle_tail');

        cy.get('@circle').should('have.text', consequence[step].animation[iteration][index].value); //проверяем значение буквы в круге
        cy.get('@circle').should('have.css', 'border', consequence[step].animation[iteration][index].color); //проверяем цвет круга
        cy.get('@circle_index').should('have.text', index); //проверяем значение индекса
        cy.get('@circle_head').should('have.text', consequence[step].animation[iteration][index].head);//проверяем значение head
        cy.get('@circle_tail').should('have.text', consequence[step].animation[iteration][index].tail);//проверяем значение tail
      });
      cy.wait(SHORT_DELAY_IN_MS);
    }
  });

  it('Корректная работа очистки очереди', () => {

    //находим кнопки
    cy.get('button[type=submit]').as(ButtonTest.Add);
    cy.get('button').contains('Очистить').parent().as(ButtonTest.Clear);

    //проходим по действиям пользователя
    for (let step = 0; step < 3; step++) {
      cy.get('input').type(consequence[step].action.value);
      cy.get(`@${ButtonTest.Add}`).click();
    }
    cy.get(`@${ButtonTest.Clear}`).click();
    const step = 4;

    cy.get(CLASS_CONTENT).as('circle_content');
    cy.get('@circle_content').each(($circle_content, index) => {
      cy.get($circle_content).find(CLASS_CIRCLE).as('circle');
      cy.get($circle_content).find(CLASS_INDEX).first().as('circle_index');
      cy.get($circle_content).find(CLASS_HEAD).first().as('circle_head');
      cy.get($circle_content).find(CLASS_TAIL).first().as('circle_tail');

      cy.get('@circle').should('have.text', consequence[step].animation[0][index].value); //проверяем значение буквы в круге
      cy.get('@circle').should('have.css', 'border', consequence[step].animation[0][index].color); //проверяем цвет круга
      cy.get('@circle_index').should('have.text', index); //проверяем значение индекса
      cy.get('@circle_head').should('have.text', consequence[step].animation[0][index].head);//проверяем значение head
      cy.get('@circle_tail').should('have.text', consequence[step].animation[0][index].tail);//проверяем значение tail
    });

  });
});