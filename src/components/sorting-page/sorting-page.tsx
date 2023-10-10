import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from './sorting-page.module.css'
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

interface IColumn {
  size: number
  state: ElementStates
}

export const SortingPage: React.FC = () => {
  
  const [arr, setArr] = useState<IColumn[]>([]);
  
  const randomArr = (): IColumn[] => {
    const arrSize = randomNum(3, 17);
    const arr:IColumn[] = [];
    for(let i = 0; i < arrSize; i++){
      const column: IColumn = {
        size: randomNum(1, 100),
        state: ElementStates.Default 
      };
     arr.push(column);
    }
    return arr;
  }
  
  const onClickk = () => {
    setArr(randomArr())
  }
  
  function randomNum(min: number, max: number):number {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.box}>
        <div className={styles.radio}>
          <RadioInput label="Выбор"/>
          <RadioInput label="Пузырек"/>
        </div>
        <div className={styles.container}>
          <Button text="По возрастанию" sorting={Direction.Ascending}/>
          <Button text="По убыванию" sorting={Direction.Descending}/>
        </div>
        <Button text="Новый массив" onClick={onClickk}/>
      </div>
      <div className={styles.columns}>
        {arr.map((column) => (
          <Column index={column.size}/>
        ))}
      </div>
    </SolutionLayout>
  );
};
