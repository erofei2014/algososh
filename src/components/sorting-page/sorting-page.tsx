import React, {useState, useEffect, useRef} from "react";
import styles from './sorting-page.module.css';
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { getRandomArr, sortWithBubbles, sortWithSelection, getColumnStatus } from "../../utils/utils";
import { TSort } from "../../types/types";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const sortingTypeSelection = 'selection';
  const sortingTypeBubble = 'bubble';

  const [steps, setSteps] = useState<[number[], number, number, number[]][] | null>(null);
  const [currStepIndex, setCurrStepIndex] = useState(0);
  const [radioType, setRadioType] = useState(sortingTypeSelection);
  const [array, setArray] = useState<number[]>([]);
  const sort = useRef<TSort>({
    active: false,
    direction: Direction.Ascending,
  });

  const onRadioCheck = (e: React.BaseSyntheticEvent) => {
    setRadioType(e.target.value);
  };

  const startAlgorithm = (direction: Direction) => {
    setCurrStepIndex(0);
    sort.current.direction = direction;
    sort.current.active = true;
    if (array.length > 0) {
      const sortedArray: [number[], number, number, number[]][] = radioType === sortingTypeSelection ?
        sortWithSelection(array, sort.current.direction === Direction.Ascending) :
        sortWithBubbles(array, sort.current.direction === Direction.Ascending);

      setSteps(sortedArray);

      let index = 0;

      const intervalId = setInterval(() => {
        if (index >= sortedArray.length - 1) {
          clearInterval(intervalId);
          sort.current.active = false;
          setArray(sortedArray[sortedArray.length - 1][0]);
          return;
        }
  
        setCurrStepIndex(++index);
      }, DELAY_IN_MS);
    }
  };

  const getNewArray = () => {
    const newArr = getRandomArr();
    setArray(newArr);
    setSteps([[[...newArr], -1, -1, []]]);
  };

  useEffect(() => {
    getNewArray();
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div>
        <div className={styles.settings}>
          <div className={styles.radio}>
            <RadioInput
              label = 'Выбор'
              value = {sortingTypeSelection}
              onChange = {onRadioCheck}
              checked = {radioType === sortingTypeSelection ? true : false}
            />
            <RadioInput
              label = 'Пузырёк'
              value = {sortingTypeBubble}
              onChange = {onRadioCheck}
              checked = {radioType === sortingTypeBubble ? true : false}
            />
          </div>
          <div className={styles.direction}>
            <Button
              sorting = {Direction.Ascending}
              value = {Direction.Ascending}
              onClick = {() => startAlgorithm(Direction.Ascending)}
              text = 'По возрастанию'
              linkedList = "medium"
              type = 'button'
              isLoader = {sort.current.active && sort.current.direction === Direction.Ascending ? true : false}
              disabled = {sort.current.active || !(array.length > 0) ? true : false}
            />
            <Button
              sorting = {Direction.Descending}
              value = {Direction.Descending}
              onClick = {() => startAlgorithm(Direction.Descending)}
              text = 'По убыванию'
              linkedList = "medium"
              type = 'button'
              isLoader = {sort.current.active && sort.current.direction === Direction.Descending ? true : false}
              disabled = {sort.current.active || !(array.length > 0) ? true : false}
            />
          </div>
          <Button
            text = 'Новый массив'
            linkedList = "medium"
            type = 'button'
            onClick = {getNewArray}
            disabled = {sort.current.active ? true : false}
          />
        </div>
        {steps?.length &&
          <div className={styles.chart}>
            {steps?.[currStepIndex]?.[0].map((element, index) => {
              const status = getColumnStatus({ index, steps, currStepIndex});

              return (
                <Column state={status} index={element} key={index} />
              );
            })}
          </div>
        }
      </div>
    </SolutionLayout>
  );
};
