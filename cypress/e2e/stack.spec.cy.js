
import { ColorTest } from "../../src/types/element-states";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays"
import { CLASS_CIRCLE, CLASS_CONTENT, CLASS_HEAD, CLASS_INDEX } from "../../src/constants/test";

export const ButtonTest = {
  Add: 'button_add',
  Remove: 'button_remove',
  Clear: 'button_clear',
};

describe('Корректная работа страницы "Стек"', function () {
  beforeEach(function () {
    cy.visit('/stack');
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
        [{ value: '1', color: ColorTest.Changing, head: 'top' }], //круг сначала фиолетого цвета
        [{ value: '1', color: ColorTest.Default, head: 'top' }]   //круг синего цвета
      ]
    },
    //2ой шаг
    {
      action: { button: ButtonTest.Add, value: '2' },           //добавление элемента со значением 2
      animation: [
        [{ value: '1', color: ColorTest.Default, head: '' }, { value: '2', color: ColorTest.Changing, head: 'top' }],
        [{ value: '1', color: ColorTest.Default, head: '' }, { value: '2', color: ColorTest.Default, head: 'top' }]
      ]
    },
    //3ий шаг
    {
      action: { button: ButtonTest.Add, value: '3' },           //добавление элемента со значением 3
      animation: [
        [{ value: '1', color: ColorTest.Default, head: '' }, { value: '2', color: ColorTest.Default, head: '' }, { value: '3', color: ColorTest.Changing, head: 'top' }],
        [{ value: '1', color: ColorTest.Default, head: '' }, { value: '2', color: ColorTest.Default, head: '' }, { value: '3', color: ColorTest.Default, head: 'top' }]
      ]
    },
    //4ый шаг
    {
      action: { button: ButtonTest.Remove, value: null },       //удаление элемента
      animation: [
        [{ value: '1', color: ColorTest.Default, head: '' }, { value: '2', color: ColorTest.Default, head: '' }, { value: '3', color: ColorTest.Changing, head: 'top' }],
        [{ value: '1', color: ColorTest.Default, head: '' }, { value: '2', color: ColorTest.Default, head: 'top' }]
      ]
    },
    //5ый шаг
    {
      action: { button: ButtonTest.Clear, value: null },       //Очищение стека
      animation: []
    },
  ]

  it('Корректная анимация добавления элемента в стек', () => {

    //находим кнопки
    cy.get('button[type=submit]').as(ButtonTest.Add);

    //основной цикл - проходим по действиям пользователя, вложенный - проходимся по кадрам анимации
    for (let step = 0; step < 3; step++) {
      cy.get('input').type(consequence[step].action.value);
      cy.get(`@${ButtonTest.Add}`).click();

      for (let iteration = 0; iteration < consequence[step].animation.length; iteration++) {
        cy.get(CLASS_CONTENT).as('circle_content');
        cy.get('@circle_content').each(($circle_content, index) => {
          cy.get($circle_content).find(CLASS_CIRCLE).as('circle');
          cy.get($circle_content).find(CLASS_INDEX).first().as('circle_index');
          cy.get($circle_content).find(CLASS_HEAD).first().as('circle_head');

          cy.get('@circle').should('have.text', consequence[step].animation[iteration][index].value); //проверяем значение буквы в круге
          cy.get('@circle').should('have.css', 'border', consequence[step].animation[iteration][index].color); //проверяем цвет круга
          cy.get('@circle_index').should('have.text', index); //проверяем значение индекса
          cy.get('@circle_head').should('have.text', consequence[step].animation[iteration][index].head);//проверяем значение head
        });
        cy.wait(SHORT_DELAY_IN_MS);
      }
    }
  });

  it('Корректная анимация удаления элемента из стека', () => {

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

    //в цикле проходимся по кадрам анимации
    for (let iteration = 0; iteration < consequence[step].animation.length; iteration++) {
      cy.get(CLASS_CONTENT).as('circle_content');
      cy.get('@circle_content').each(($circle_content, index) => {
        cy.get($circle_content).find(CLASS_CIRCLE).as('circle');
        cy.get($circle_content).find(CLASS_INDEX).first().as('circle_index');
        cy.get($circle_content).find(CLASS_HEAD).first().as('circle_head');

        cy.get('@circle').should('have.text', consequence[step].animation[iteration][index].value); //проверяем значение буквы в круге
        cy.get('@circle').should('have.css', 'border', consequence[step].animation[iteration][index].color); //проверяем цвет круга
        cy.get('@circle_index').should('have.text', index); //проверяем значение индекса
        cy.get('@circle_head').should('have.text', consequence[step].animation[iteration][index].head);//проверяем значение head
      });
      cy.wait(SHORT_DELAY_IN_MS);
    }
  });

  it('Корректная работа очистки стека', () => {

    //находим кнопки
    cy.get('button[type=submit]').as(ButtonTest.Add);
    cy.get('button').contains('Очистить').parent().as(ButtonTest.Clear);

    //проходим по действиям пользователя
    for (let step = 0; step < 3; step++) {
      cy.get('input').type(consequence[step].action.value);
      cy.get(`@${ButtonTest.Add}`).click();
    }
    cy.get(`@${ButtonTest.Clear}`).click();
    cy.get(CLASS_CONTENT).should('not.exist');
  });
});
