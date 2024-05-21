import {ColorTest} from "../../src/types/element-states";
import { CLASS_CIRCLE, CLASS_CONTENT, CLASS_INDEX } from "../../src/constants/test";

describe('Корректная работа страницы "Последовательности Фибоначчи', function () {
  beforeEach(function () {
    cy.visit('/fibonacci');
  });

  it('Кнопка не активна при пустом инпуте', () => {
    cy.get('input').should('be.empty');
    cy.get('button[type=submit]').should('be.disabled');
  });

  it('Корректная анимация генерации последовательности Фибоначчи', () => {
    const res = [
      [{value:'1',color:ColorTest.Default}],
      [{value:'1',color:ColorTest.Default},{value:'1',color:ColorTest.Default}],
      [{value:'1',color:ColorTest.Default},{value:'1',color:ColorTest.Default},{value:'2',color:ColorTest.Default}],
      [{value:'1',color:ColorTest.Default},{value:'1',color:ColorTest.Default},{value:'2',color:ColorTest.Default},{value:'3',color:ColorTest.Default}],
      [{value:'1',color:ColorTest.Default},{value:'1',color:ColorTest.Default},{value:'2',color:ColorTest.Default},{value:'3',color:ColorTest.Default},{value:'5',color:ColorTest.Default}],
      [{value:'1',color:ColorTest.Default},{value:'1',color:ColorTest.Default},{value:'2',color:ColorTest.Default},{value:'3',color:ColorTest.Default},{value:'5',color:ColorTest.Default},{value:'8',color:ColorTest.Default}]
    ]

    cy.get('input').type('5');
    cy.get('button[type=submit]').click();

    for(let iteration = 0;iteration<res.length;iteration++){
      cy.get(CLASS_CONTENT).as('circle_content');
      cy.get('@circle_content').should('have.length', res[iteration].length).each(($circle_content,index)=>{
        cy.get($circle_content).find(CLASS_CIRCLE).as('circle');
        cy.get($circle_content).find(CLASS_INDEX).first().as('circle_index');
        cy.get('@circle').should('have.text',res[iteration][index].value); //проверяем значение буквы
        cy.get('@circle').should('have.css', 'border', res[iteration][index].color); //проверяем цвет круга
        cy.get('@circle_index').should('have.text',index); //проверяем значение индекса
      });
    }
  });
});
