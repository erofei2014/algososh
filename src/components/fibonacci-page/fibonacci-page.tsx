import React, {useState} from "react";
import styles from './fibonacci-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { getFibonacciSequence, makeStepsFromArray } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const maxNumber = 19;
  const inputName = 'fibonacciElements';

  const [active, setActive] = useState(false);
  const [steps, setSteps] = useState<number[][] | null>(null);
  const [currStepIndex, setCurrStepIndex] = useState(0);

  const { values, handleChange } = useForm({[inputName]: ''});


  const startAlgorithm = () => {
    setActive(true);
    const fibonacciSequence = makeStepsFromArray(getFibonacciSequence(parseInt(values[inputName])));
    setSteps(fibonacciSequence);
    setCurrStepIndex(0);

    if (!fibonacciSequence.length) return;

    let index = 0;

    const intervalId = setInterval(() => {
      if (index >= fibonacciSequence.length - 1) {
        clearInterval(intervalId);
        setActive(false);
        return;
      }

      setCurrStepIndex(++index);
    }, SHORT_DELAY_IN_MS);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    startAlgorithm();
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div>
        <form className={styles.form} onSubmit={submitForm}>
          <Input
            name = {inputName}
            value = {values?.[inputName]}
            type = 'number'
            placeholder = "Введите текст"
            isLimitText = {true}
            max = {maxNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
          <Button
            type = 'submit'
            text = 'Рассчитать'
            isLoader = {active}
            disabled = {!values[inputName] || parseInt(values[inputName]) > maxNumber ? true : false}
          />
        </form>
        {steps &&
        <div className={styles.animation}>
          {steps?.[currStepIndex].map((number, index) => {
            return (
              <Circle letter={String(number)} key={index} index={index} />
            );
          })}
        </div>}
      </div>
    </SolutionLayout>
  );
};
