import React, { useState } from "react";
import styles from './list-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { LinkedList } from "../classes/LinkedList";
import { getArrowStatus, initLinkedList, getCircleSize, getElementColor } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const listSize = 9;

export const ListPage: React.FC = () => {
  const inputElement = 'listElement';
  const inputIndex = 'index';
  const maximumLength = 4;

  const [active, setActive] = useState(false);
  const [loader, setLoader] = useState<string>('');
  const [currStepIndex, setCurrStepIndex] = useState(0);
  const [list, setList] = useState<LinkedList<string>>(new LinkedList<string>());

  if (list.getSize() === 0) {
    list.insertAt('1', 0);
    list.insertAt('8', 0);
    list.insertAt('34', 0);
    list.insertAt('0', 0);
  }

  const [steps, setSteps] = useState<(string | null)[][][]>([initLinkedList(list.print())]);

  const { values, setValue, handleChange } = useForm({});

  const addHeadElement = () => {
    setActive(true);
    setLoader('addHead');
    const firstStep = steps[steps.length - 1];
    firstStep[0][2] = values[inputElement];
    firstStep[0][3] = 'changing';

    list.insertAt(values[inputElement], 0);
    setValue({[inputElement]: ''});
    const secondStep = initLinkedList(list.print());
    secondStep[0][1] = 'modified';

    const thirdStep = initLinkedList(list.print());

    const iterations = [firstStep, secondStep, thirdStep];
    startAnimaition(iterations);
  };

  const addTailElement = () => {
    setActive(true);
    setLoader('addTail');
    const firstStep = steps[steps.length - 1];
    firstStep[list.getSize() - 1][2] = values[inputElement];
    firstStep[list.getSize() - 1][3] = 'changing';

    list.insertAt(values[inputElement], list.getSize());
    setValue({[inputElement]: ''});
    const secondStep = initLinkedList(list.print());
    secondStep[list.getSize() - 1][1] = 'modified';

    const thirdStep = initLinkedList(list.print());

    const iterations = [firstStep, secondStep, thirdStep];
    startAnimaition(iterations);
  };

  const removeHeadElement = () => {
    setActive(true);
    setLoader('removeHead');
    const firstStep = steps[steps.length - 1];
    firstStep[0][4] = firstStep[0][0];
    firstStep[0][0] = '';
    firstStep[0][5] = 'changing';

    list.removeAt(0);
    setValue({[inputElement]: ''});
    const secondStep = initLinkedList(list.print());

    const iterations = [firstStep, secondStep];
    startAnimaition(iterations);
  };

  const removeTailElement = () => {
    setActive(true);
    setLoader('removeTail');
    const firstStep = steps[steps.length - 1];
    firstStep[list.getSize() - 1][4] = firstStep[list.getSize() - 1][0];
    firstStep[list.getSize() - 1][0] = '';
    firstStep[list.getSize() - 1][5] = 'changing';

    list.removeAt(list.getSize() - 1);
    setValue({[inputElement]: ''});
    const secondStep = initLinkedList(list.print());

    const iterations = [firstStep, secondStep];
    startAnimaition(iterations);
  };

  const addByIndex = () => {
    setActive(true);
    setLoader('addByIndex');
    const index = parseInt(values[inputIndex], 10);

    if (values[inputIndex]) {
      let iterations: (string | null)[][][] = [];
      const firstStep = steps[steps.length - 1];
      for (let i = 0; i <= index; i++) {
        if (i > 0) {
          firstStep[i - 1][2] = null;
          firstStep[i - 1][3] = null;
          firstStep[i - 1][1] = 'changing';
        }
        firstStep[i][2] = values[inputElement];
        firstStep[i][3] = 'changing';
        const firstIteration = JSON.parse(JSON.stringify(firstStep));
        iterations.push([...firstIteration]);
      }

      list.insertAt(values[inputElement], index);
      setValue({[inputElement]: '', [inputIndex]: ''});
      const secondStep = initLinkedList(list.print());
      secondStep[index][1] = 'modified';

      const thirdStep = initLinkedList(list.print());

      iterations = [...iterations, secondStep, thirdStep];
      startAnimaition(iterations);
    }
  };

  const removeByIndex = () => {
    setActive(true);
    setLoader('removeByIndex');
    const index = parseInt(values[inputIndex], 10);
    setValue({[inputIndex]: ''});

    if (values[inputIndex]) {
      let iterations: (string | null)[][][] = [];
      const firstStep = steps[steps.length - 1];
      for (let i = 0; i <= index+1; i++) {
        if (i > 0) {
          firstStep[i - 1][1] = 'changing';
        }

        const firstIteration = JSON.parse(JSON.stringify(firstStep));
        iterations.push([...firstIteration]);
      }

      const secondStep = steps[steps.length - 1];
      for (let i = 0; i <= index; i++) {
        secondStep[i][1]='changing';        
      }
      secondStep[index][4] = secondStep[index][0];
      secondStep[index][5] = 'changing';
      secondStep[index][0] = null;

      list.removeAt(index);
      const thirdStep = initLinkedList(list.print());

      iterations = [...iterations, secondStep, thirdStep];
      startAnimaition(iterations);
    }
  };

  const startAnimaition = (iterations: (string | null)[][][]) => {
    setCurrStepIndex(0);
    setSteps(iterations);

    let index = 0;

    const intervalId = setInterval(() => {
      if (index >= iterations.length - 1) {
        clearInterval(intervalId);
        setActive(false);
        setLoader('');
        return;
      }

      setCurrStepIndex(++index);
    }, 500);
  };

  return (
    <SolutionLayout title="Связный список">
      <div>
        <form className={styles.form}>
          <Input
            name = {inputElement}
            value = {values?.[inputElement]}
            extraClass = {styles.input}
            placeholder= "Введите значение"
            maxLength = {maximumLength}
            isLimitText = {true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            disabled = {active ? true : false}
          />
          <Button
            type = 'button'
            text = 'Добавить в head'
            linkedList = "small"
            onClick = {addHeadElement}
            disabled = {active || (list.getSize() >= listSize) || !values[inputElement] ? true : false}
            isLoader={loader === 'addHead' ? true : false}
          />
          <Button
            type = 'button'
            text = 'Добавить в tail'
            linkedList = "small"
            onClick = {addTailElement}
            disabled = {active || (list.getSize() >= listSize) || !values[inputElement] ? true : false}
            isLoader={loader === 'addTail' ? true : false}
          />
          <Button
            type = 'button'
            text = 'Удалить из head'
            linkedList = "small"
            onClick = {removeHeadElement}
            disabled = {active || !(list.getSize() > 1) ? true : false}
            isLoader={loader === 'removeHead' ? true : false}
          />
          <Button
            type = 'button'
            text = 'Удалить из tail'
            linkedList = "small"
            onClick = {removeTailElement}
            disabled = {active || !(list.getSize() > 1) ? true : false}
            isLoader={loader === 'removeTail' ? true : false}
          />
        </form>
        <form className={styles.form}>
          <Input
            type = 'number'
            extraClass = {styles.input}
            name = {inputIndex}
            value = {values?.[inputIndex]}
            placeholder= "Введите индекс"
            maxLength = {maximumLength}
            isLimitText = {false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            disabled = {active ? true : false}
          />
          <Button
            type = 'button'
            text = 'Добавить по индексу'
            linkedList = "big"
            onClick = {addByIndex}
            disabled = {active ||
              (list.getSize() >= listSize) ||
              !values[inputElement] ||
              !values[inputIndex] ||
              parseInt(values[inputIndex]) > list.getSize()-1 ||
              parseInt(values[inputIndex]) < 0
              ? true : false
            }
            isLoader={loader === 'addByIndex' ? true : false}
          />
          <Button
            type = 'button'
            text = 'Удалить по индексу'
            linkedList = "big"
            onClick = {removeByIndex}
            disabled = {active ||
              (list.getSize() >= listSize) ||
              !values[inputIndex] ||
              parseInt(values[inputIndex]) > list.getSize()-1 ||
              parseInt(values[inputIndex]) < 0
              ? true : false
            }
            isLoader={loader === 'removeByIndex' ? true : false}
          />
        </form>
        {steps &&
            <div className={styles.list}>
              {steps?.[currStepIndex].map((element, index) => {
                let head = getCircleSize(index, steps?.[currStepIndex].length, 'head', element[2], element[3]);
                let tail = getCircleSize(index, steps?.[currStepIndex].length, 'tail', element[4], element[5]);
                
                return <div className={styles.list_elements} key={index}>
                  <Circle
                    state={getElementColor(element[1])}
                    letter={element[0] ? element[0] : ''}
                    head={head}
                    tail={tail}
                    index={index}>
                  </Circle>
                  <div className={index !== steps?.[currStepIndex].length - 1 ? '' : styles.display_none}>
                    <ArrowIcon
                      fill={element[1] === 'changing' ? getArrowStatus('changing') : getArrowStatus()}>
                    </ArrowIcon>
                  </div>
                </div>
              })}
            </div>
          }
      </div>
    </SolutionLayout>
  );
};
