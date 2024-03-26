import React, { useState } from "react";
import styles from './string.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getCircleStatus, reverseString } from "../../utils/utils";
import { useForm } from "../../hooks/useForm";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [active, setActive] = useState(false);
  const [steps, setSteps] = useState<string[][] | null>(null);
  const [currStepIndex, setCurrStepIndex] = useState(0);

  const inputName = 'string';
  const maximumLength = 11;

  const { values, handleChange } = useForm({[inputName]: ''});

  const startAlgorithm = () => {
    setActive(true);
    const iterations = reverseString(values[inputName]);
    setSteps(iterations);
    setCurrStepIndex(0);

    if (!iterations.length) return;

    let index = 0;

    const intervalId = setInterval(() => {
      if (index >= iterations.length - 1) {
        clearInterval(intervalId);
        setActive(false);
        return;
      }

      setCurrStepIndex(++index);
    }, DELAY_IN_MS);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    startAlgorithm();
  };

  return (
    <SolutionLayout title="Строка">
      <div>
        <form className={styles.form} onSubmit={submitForm}>
          <Input
            name = {inputName}
            value = {values?.[inputName]}
            placeholder = "Введите текст"
            isLimitText = {true}
            maxLength = {maximumLength}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
          <Button
            type = 'submit'
            text = 'Развернуть'
            isLoader = {active}
            disabled = {!values[inputName] ? true : false}
          />
        </form>
        {steps &&
        <div className={styles.animation}>
          {steps?.[currStepIndex].map((letter, index) => {
            const status = getCircleStatus({ index, steps, currStepIndex});

            return (
              <Circle state={status} letter={letter} key={index}/>
            );
          })}
        </div>}
      </div>
    </SolutionLayout>
  );
};
