import React, { useState } from "react";
import styles from './queue-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../hooks/useForm";
import { Queue } from "../classes/Queue";
import { Circle } from "../ui/circle/circle";
import { getQueue, getElementColor } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

export const queueSize = 7;

export const QueuePage: React.FC = () => {
  const inputName = 'queueElement';
  const maximumLength = 4;

  const [active, setActive] = useState(false);
  const [loader, setLoader] = useState<string>('');
  const [queue, setQueue] = useState(new Queue<string>(queueSize));
  const [currStepIndex, setCurrStepIndex] = useState(0);
  const [steps, setSteps] = useState<(string | null)[][][]>([getQueue()]);

  const { values, setValue, handleChange } = useForm({[inputName]: ''});
  
  const addQueueElement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader('addElement');
    setActive(true);

    const firstStep = queue.getAll().map((element, index) => {

      let color = (queue.getSize() === 0 && index === queue.getTail()) || (queue.getSize() > 0 && index === queue.getTail() + 1) ? 'changing' : 'default';
      return [element, color];
    });

    queue.enqueue(values[inputName]);
    setValue({[inputName]: ''});

    const secondStep = queue.getAll().map((element, index) => {
      let color = index === queue.getTail() ? 'changing' : 'default';
      return [element, color];
    });

    const thirdStep = queue.getAll().map((element, index) => {
      return [element, 'default'];
    });

    const iterations = [firstStep, secondStep, thirdStep];
    startAnimation(iterations);
  };

  const removeQueueElement = () => {
    setActive(true);
    setLoader('removeElement');

    const firstStep = queue.getAll().map((element, index) => {

      let color = index === queue.getHead() ? 'changing' : 'default';
      return [element, color];
    });

    queue.dequeue();

    const secondStep = queue.getAll().map((element, index) => {
      let color = index === queue.getHead() - 1 ? 'changing' : 'default';
      return [element, color];
    });

    const thirdStep = queue.getAll().map((element, index) => {
      return [element, 'default'];
    });

    const iterations = [firstStep, secondStep, thirdStep];
    startAnimation(iterations);
  };

  const clearQueue = () => {
    setLoader('clearQueue');
    queue.clear();
    startAnimation([getQueue()]);
    setActive(false);
  };

  const startAnimation = (iterations: (string | null)[][][]): void => {
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
    }, SHORT_DELAY_IN_MS);
  };

  return (
    <SolutionLayout title="Очередь">
      <div>
        <form className={styles.form} onSubmit={addQueueElement}>
          <Input
            name = {inputName}
            value = {values?.[inputName]}
            placeholder= "Введите значение"
            maxLength = {maximumLength}
            isLimitText = {true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
          <Button
            type = 'submit'
            text = 'Добавить'
            disabled = {active || !values[inputName] || queue.getSize() === queueSize ? true : false}
            isLoader={loader === 'addElement' ? true : false}
          />
          <Button
            type = 'button'
            text = 'Удалить'
            onClick = {removeQueueElement}
            disabled = {(active || !(queue.getSize() > 0)) ? true : false}
            isLoader={loader === 'removeElement' ? true : false}
          />
          <div className={styles.stack_clear}>
            <Button
              type = 'button'
              text = 'Очистить'
              onClick = {clearQueue}
              disabled = {(active || !(queue.getSize() > 0)) ? true : false}
              isLoader={loader === 'clearQueue' ? true : false}
            />
          </div>
        </form>
        {steps &&
        <div className={styles.queue}>
          {steps?.[currStepIndex].map((element, index) => {
            const status = getElementColor(element[1]);
            const text = element[0] ? element[0] : '';

            return <Circle
            state = {status}
            letter = {text}
            index = {index}
            head = {queue.getHead() === index && (queue.getSize() > 0 || queue.getHead() !== 0) ? HEAD : ''}
            tail = {queue.getTail() === index && (queue.getSize() > 0 || queue.getTail() !== 0) ? TAIL : '' }
            key = {index}
            />
          })}
        </div>
        }
      </div>
    </SolutionLayout>
  );
};
