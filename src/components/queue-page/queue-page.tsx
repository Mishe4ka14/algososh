import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { ElementStates } from "../../types/element-states";
import styles from './queue-page.module.css';

interface IElem {
  letter?: string
  state: ElementStates
}

export const QueuePage: React.FC = () => {

  const [value, setValue] = useState('');
  const [arr, setArr] = useState<IElem[]>([]);
  const [valuesArr, setValuesArr] = useState<string[]>([]) 
  const [head, setHead] = useState(0);
  const [tail, setTail] = useState(0);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [addDisable, setAddDisable] = useState(false);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

const addStarterArr = () => {
  const firstArr:IElem[] = [];
    for(let i = 0; i < 7; i++){
      const first: IElem = {letter: '', state: ElementStates.Default};
      firstArr.push(first)
    }
    setArr(firstArr)
}

  useEffect(() => {
    addStarterArr();
  }, [])

  useEffect(() => {
    setAddDisable(tail === 7);
  }, [tail]);

  const enqueue = () => {
    setIsAdd(true)
    if ( value && tail < 7) {
      const updatedArr = [...arr];
      updatedArr[tail] = { letter: value, state: ElementStates.Changing };
      setArr(updatedArr);
      setTimeout(() => {
        updatedArr[tail].state = ElementStates.Default;
        setArr(updatedArr);
        setValue('');
        setIsAdd(false);
        setTail(tail + 1);
      }, 500);
    }
  };
  
  const dequeue = () => {
    setIsDelete(true)
    if ( head < tail) {
      const updatedArr = [...arr];
      updatedArr[head] = { letter: '', state: ElementStates.Changing };
      setArr(updatedArr);
      setTimeout(() => {
        updatedArr[head].state = ElementStates.Default;
        setArr(updatedArr);
        setIsDelete(false);
        setHead(head + 1);
      }, 500);
    }
  };

  const deleteAll = () => {
    addStarterArr();
    setHead(0);
    setTail(0);
    setAddDisable(true)
    setTimeout(() => {
      setAddDisable(false)
    }, 500)
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.box}>
        <Input maxLength={4} width={400} isLimitText max={4} onChange={handleClick} value={value} disabled={isDelete || isAdd}/>
        <Button text="Добавить" onClick={enqueue} isLoader={isAdd} disabled={!value || isAdd || isDelete || addDisable}/>
        <Button text="Удалить" onClick={dequeue} isLoader={isDelete} disabled={isDelete || isAdd}/>
        <Button text="Очистить" onClick={deleteAll} extraClass="ml-30" disabled={isAdd || isDelete}/>
      </div>
      <div className={styles.container}>
        {arr.map((element, index) => (
        <Circle 
          key={index}
          index={index}
          letter={element.letter}
          state={element.state}
          head={index === head ? 'head' : null}
          tail={index === tail - 1 ? 'tail' : null}
        />
        ))}
      </div>
    </SolutionLayout>
  );
};
