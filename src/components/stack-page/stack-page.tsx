import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import styles from './stack-page.module.css';

interface IElem {
  value: string
  index: number
  state: ElementStates
}

export const StackPage: React.FC = () => {
  
  const  [arr, setArr] = useState<IElem[]>([]);
  const [value, setValue] = useState('');

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const addElem = async() => {
    const isNum = parseInt(value);
    if(!isNaN(isNum) && arr.length < 20){
      const newIndex = arr.length; 
      const newElem: IElem = {
        value: value,
        index: newIndex,
        state: ElementStates.Changing
      };
      setArr([...arr, newElem]); 
      setValue(''); 
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const newElem2: IElem = {
        value: value,
        index: newIndex,
        state: ElementStates.Default
      };
      setArr([...arr, newElem2]); 
      
    }
  }

  const deleteElem = async() => {
    const newArr = [...arr];
    const lastElem = newArr[arr.length - 1]; 
    lastElem.state = ElementStates.Changing; 
    setArr([...newArr]); 
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    newArr.pop();
    setArr([...newArr])
  } 

  const deleteAll = () => {
    const newArr: IElem[] = [];
    setArr([...newArr]); 
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.box}>
        <Input maxLength={4} width={400} isLimitText max={4} onChange={handleClick} value={value}/>
        <Button text="Добавить" onClick={addElem} disabled={value === ''}/>
        <Button text="Удалить" onClick={deleteElem} disabled={arr.length === 0}/>
        <Button text="Очистить" extraClass="ml-30" onClick={deleteAll} disabled = {arr.length === 0}/>
      </div>
      <div className={styles.container}>
        {arr.map((element) => (
          <Circle letter={element.value} index={element.index} key={element.index} head={ element.index === arr.length - 1 ? 'top' : null} state={element.state}/>
        ))}
      </div>
    </SolutionLayout>
  );
};
