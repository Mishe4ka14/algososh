import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './string.module.css'
import { Button } from "../ui/button/button";
import { useInputHandlers } from "../../hooks/use-input";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {

  const [arr, setArr] = useState<string[]>([]);
  //счетчик шагов анимации
  const [step, setStep] = useState(0);
  const [string, setString] = useState(false);
  //индекс цветов
  const [color, setColor] = useState<number[]>([]);

  const  {values, handleInputChange} = useInputHandlers({
    string: ''
  })
  
  const onClick = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setString(true)
    const withoutSpaces = values.value.replace(/\s/g, ''); 
    const newArr = withoutSpaces.split('');
    setArr(newArr)
    
    setStep(0);
    stringReverse(newArr, 0);
    setColor([]);
  }

  //рекурсивный алгоритм
  const stringReverse = (arr: string[], index: number) => {
    if (index < arr.length / 2) {
      setTimeout(() => {
        const temp = arr[index];
        arr[index] = arr[arr.length - 1 - index];
        arr[arr.length - 1 - index] = temp;
        
        setStep(2)
        setColor([index, arr.length - 1 - index]);
        //создаем новую копию массива, за  счет чего происходит перерендер
        setArr([...arr]);
        stringReverse(arr, index + 1);
      }, 2000);
    } else {
      setStep(1);
      setColor([]);
    }
  };


  return (
    <SolutionLayout title="Строка">
      <form className={styles.box} onSubmit={onClick}>
        <Input width={377} maxLength={11} isLimitText onChange={handleInputChange}/>
        <Button text="Развернуть" type="submit"/>
      </form>
      <div className={styles.container}>
        {string || step === 0
          ? arr.map((letter, index) => (
            <Circle 
              letter={letter}
              key={index} 
              state={
              step === 0 ? ElementStates.Default :
              color.includes(index) ? ElementStates.Changing : ElementStates.Default 
              }
            />))
          : null} 
      </div>
    </SolutionLayout>
  );
};

