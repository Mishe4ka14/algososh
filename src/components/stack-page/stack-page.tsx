import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import {Stack} from "./stack-page-class"; 
import styles from './stack-page.module.css';
import { ElementStates } from "../../types/element-states";

interface IElem {
  letter: string;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<Stack<string>>(new Stack());
  const [value, setValue] = useState('');
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const elements = stack.getElements();

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const addElem = async () => {
    setIsAdd(true);
    const newElement: IElem = {letter: value,  state: ElementStates.Changing}
    stack.push(newElement)
    setTimeout(() => {
      setValue("");
      setStack(stack);
      newElement.state = ElementStates.Default
          setIsAdd(false);
    }, 500);
  }

  const deleteElem = async () => {
    setIsDelete(true);
      stack.pop();
      setTimeout(() => {
        setStack(stack);
        setIsDelete(false);
      }, 1000);
  }

  const deleteAll = () => {
    setIsCleaning(true)
    stack.clear();
    setTimeout(() => {
      setStack(new Stack(stack.getMaxSize()));
      setIsCleaning(false);
    }, 1000);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.box}>
        <Input data-testid="input" maxLength={4} width={400} isLimitText max={4} onChange={handleClick} value={value}/>
        <Button data-testid="add" text="Добавить" onClick={addElem} disabled={!value || isAdd || isDelete || stack.getSize() >= stack.getMaxSize()} isLoader={isAdd}/>
        <Button data-testid="delete" text="Удалить" onClick={deleteElem} disabled={stack.getSize() === 0 || isAdd || isDelete} isLoader={isDelete}/>
        <Button data-testid="clean" text="Очистить" extraClass="ml-30" onClick={deleteAll} disabled={stack.getSize() === 0 || isAdd || isDelete} isLoader={isCleaning}/>
      </div>
      <div className={styles.container}>
        {elements.map((element, index) => (
          <Circle letter={element.letter} index={index} key={index} head={index === stack.getSize() - 1 ? 'top' : null} state={element.state}/>
        ))}
      </div>
    </SolutionLayout>
  );
};