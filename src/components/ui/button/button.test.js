import React from 'react';
import { Button } from './button';
import renderer from 'react-test-renderer';

describe("Компонент Button", () => {
  it("Отрисовка кнопки с текстом", () => {
    const tree = renderer
    .create(<Button text="Текст" />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка кнопки без текста", () => {
    const tree = renderer
    .create(<Button />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка заблокированной кнопки", () => {
    const tree = renderer
    .create(<Button disabled={true} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка кнопки с лоадером", () => {
    const tree = renderer
    .create(<Button isLoader={true} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Вызов колбека при клике на кнопку", () => {
    const onClickMock = jest.fn();
    const tree = renderer
    .create(<Button text="Текст" onClick={onClickMock} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });
});