import React, { useEffect, memo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './string.module.css'
import { Button } from "../ui/button/button";
import { useInputHandlers } from "../../hooks/use-input";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

interface ILetter {
  letter: string;
  state: ElementStates;
}

export const StringComponent: React.FC = () => {

  const [arr, setArr] = useState<ILetter[]>([]);
  const [value, setValue] = useState('');
  const [isRevers, setIsRevers] = useState(false);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  
  const onClick = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRevers(true)
    const letters = value.replace(/\s/g, '').split('').map((letter) => ({
      letter: letter,
      state: ElementStates.Default
    }))
    setArr(letters)
    setValue('')
  }

  //рекурсивный алгоритм
  const stringReverse = async (arr: ILetter[], start: number, end: number) => {
    if (start >= end) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      setArr((prevArr) =>
        prevArr.map((letter) => ({
          ...letter,
          state: ElementStates.Modified
        }))
      );
      setIsRevers(false);
      return;
    }
  
    // Устанавливаем цыет на кандидатах на перестановку
    setArr((PrevArr) => {
      const newArr = [...PrevArr];
      newArr[start] = {
        ...newArr[start],
        state: ElementStates.Changing
      };
      newArr[end] = {
        ...newArr[end],
        state: ElementStates.Changing
      };
      return newArr;
    });
  
    // Добавляем задержку перед перестановкой
    await new Promise((resolve) => setTimeout(resolve, 1000)); 
  
    // Меняем местами буквы
    const temp = arr[start].letter;
    arr[start].letter = arr[end].letter;
    arr[start].state = ElementStates.Modified;
    arr[end].letter = temp;
    arr[end].state = ElementStates.Modified;
  
    // Создаем новую копию массива, чтобы произошел перерендер
    setArr([...arr]);
  
    stringReverse(arr, start + 1, end - 1);
    
  };

  useEffect(() => {
    if(isRevers){
      const newArr = [...arr]
      const start = 0;
      const end = arr.length - 1;
      stringReverse(newArr, start, end)
    }
  }, [isRevers])
  
  return (
    <SolutionLayout title="Строка">
      <form className={styles.box} onSubmit={onClick}>
        <Input width={377} maxLength={11} value={value} isLimitText onChange={handleClick}/>
        <Button text="Развернуть" type="submit" isLoader={isRevers}/>
      </form>
      <div className={styles.container}>
        {arr.map((letter, index) => (
          <Circle key={index} letter={letter.letter} state={arr[index]?.state}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

