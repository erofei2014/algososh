import React, {useState} from "react";
import styles from './stack-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "../classes/Stack";
import { useForm } from "../../hooks/useForm";
import { Circle } from "../ui/circle/circle";
import { getStackElementStatus } from "../../utils/utils";

const stackSize = 8;

export const StackPage: React.FC = () => {
  const inputName = 'stackElement';
  const maximumLength = 4;

  const [active, setActive] = useState(false);
  const [loader, setLoader] = useState<string>('');
  const [stack, setStack] = useState(new Stack<string>());
  const [currStepIndex, setCurrStepIndex] = useState(0);
  const [steps, setSteps] = useState<[string[], string[]] | null>(null);

  const { values, setValue, handleChange } = useForm({[inputName]: ''});

  const addStackElement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader('addElement');
    stack.push(values[inputName]);
    setValue({[inputName]: ''});
    startAlgorithm(false);
  };

  const removeStackElement = () => {
    setLoader('removeElement');
    startAlgorithm(true);
    stack.pop();
  };

  const clearStack = () => {
    setLoader('clearStack');
    stack.clear();
    setActive(false);
    startAlgorithm(false);
  };

  const startAlgorithm = (toDelete: boolean) => {
    setCurrStepIndex(0);
    const stackElements = stack.getAll();
    const shortenedStackElements = stackElements.slice(0, stackElements.length - 1);
    if (toDelete) {
      setSteps([[...stackElements], [...shortenedStackElements]]);
    } else {
      setSteps([[...stackElements], [...stackElements]]);
    }
    let index = 0;

    const intervalId = setInterval(() => {
      if (index > 0) {
        clearInterval(intervalId);
        setLoader('');
        return;
      }
      setCurrStepIndex(++index);
    }, 500);
  };

  return (
    <SolutionLayout title="Стек">
      <div>
        <form className={styles.form} onSubmit={addStackElement}>
          <Input
            name = {inputName}
            value = {values?.[inputName]}
            placeholder= "Введите текст"
            maxLength = {maximumLength}
            isLimitText = {true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
          <Button
            type = 'submit'
            text = 'Добавить'
            disabled = {active || !values[inputName] || stack.getSize() === stackSize ? true : false}
            isLoader={loader === 'addElement' ? true : false}
          />
          <Button
            type = 'button'
            text = 'Удалить'
            onClick = {removeStackElement}
            disabled = {(active || !(stack.getSize() > 0)) ? true : false}
            isLoader={loader === 'removeElement' ? true : false}
          />
          <div className={styles.stack_clear}>
            <Button
              type = 'button'
              text = 'Очистить'
              onClick = {clearStack}
              disabled = {(active || !(stack.getSize() > 0)) ? true : false}
              isLoader={loader === 'clearStack' ? true : false}
            />
          </div>
        </form>
        {steps &&
        <div className={styles.stack}>
          {steps?.[currStepIndex].map((element, index) => {
            let head = '';
            let lastIndex = steps?.[currStepIndex].length - 1;
            index === lastIndex ? head = 'top' : head = '';
            const status = getStackElementStatus({ index, lastIndex, currStepIndex});

            return <Circle
            state = {status}
            letter = {element}
            index = {index}
            head = {head}
            key = {index}
            />
          })}
        </div>
        }
      </div>
    </SolutionLayout>
  );
};
