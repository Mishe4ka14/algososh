import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibbonacci-page.module.css'
import { Button } from "../ui/button/button";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";

interface INum {
  num: string
  tail: string
}

export const FibonacciPage: React.FC = () => {

  const [value, setValue] = useState('')
  const [arr, setArr] = useState<INum[]>([])
  const [loading, setLoading] = useState(false)

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

const onClick = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setArr([]);
  const num = parseInt(value.replace(/\s/g, ''), 10);
  const numArr = fibAlgo(num);
  renderNumber(numArr);
  setValue('');
  
} 

//алгоритм фибоначчи
const fibAlgo = (n: number):string[] => {
  // const num = parseInt(n, 10)
  const start = [0 , 1];
  const arr = [];
  for(let i = 2; i <= n + 1; i++){
    start.push(start[i - 1] + start[i - 2])
  }
  start.shift();
  const strings = start.map((num) => num.toString() )
  return strings
}

//присваивая индекс отображаем элементы с задержкой
const renderNumber = (numbers: string[]) => {
  setLoading(true);
  //добавляем индекс => изменяем состояние => перерендер
  const stepByStepRender = (index: number) => {
    if(index >= numbers.length){
      setLoading(false);
      return
    }
    setTimeout(() => {
      setArr((prevArr) => 
        [...prevArr, {num: numbers[index], tail: index.toString()}])
        stepByStepRender(index + 1)
    }, 500)
  }
  stepByStepRender(0)
}

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.box} onSubmit={onClick}>
        <Input width={400} maxLength={2} isLimitText onChange={handleClick} type="number" min={1} max={19} value={value}/>
        <Button text="Развернуть" type="submit" isLoader={loading} disabled={!value}/>
      </form>
      <div className={styles.container}>
        {arr.map((num, index) => (
          <Circle letter={num.num} tail={num.tail}/>
        ))}
      </div>
    </SolutionLayout>
  );
};
