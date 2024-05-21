import React from 'react';
import { Circle } from './circle';
import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';

describe("Компонент Circle", () => {
  it("Отрисовка пустого круга", () => {
    const tree = renderer
    .create(<Circle />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка круга с текстом", () => {
    const tree = renderer
    .create(<Circle letter={'12'}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка круга с head", () => {
    const tree = renderer
    .create(<Circle head={'head'}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка круга с react-элементом в head", () => {
    const reactElement = <div></div>
    const tree = renderer
    .create(<Circle head={reactElement}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка круга с tail", () => {
    const tree = renderer
    .create(<Circle tail={'tail'}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка круга с react-элементом в tail", () => {
    const reactElement = <div></div>
    const tree = renderer
    .create(<Circle tail={reactElement}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка круга с индексом", () => {
    const tree = renderer
    .create(<Circle index={1}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка малого круга", () => {
    const tree = renderer
    .create(<Circle isSmall={true}/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка круга с дефолтной рамкой", () => {
    const tree = renderer
    .create(<Circle state={ElementStates.Default} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
  
  it("Отрисовка круга с красной рамкой", () => {
    const tree = renderer
    .create(<Circle state={ElementStates.Changing} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Отрисовка круга с зеленой рамкой", () => {
    const tree = renderer
    .create(<Circle state={ElementStates.Modified} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});