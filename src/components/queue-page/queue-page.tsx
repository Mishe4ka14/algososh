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
  index: number
}

export const QueuePage: React.FC = () => {

  const [value, setValue] = useState('');
  const [arr, setArr] = useState<IElem[]>([]);
  const [valuesArr, setValuesArr] = useState<string[]>([]) 


  const [head, setHead] = useState(0);
  const [tail, setTail] = useState(0);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const firstArr:IElem[] = [];
    for(let i = 0; i < 7; i++){
      const first: IElem = {letter: '', index: i};
      firstArr.push(first)
    }
    setArr(firstArr)
  }, [])

  const enqueue = (item: string) => {
    if (tail < 7 && item !== '') {
      const updatedArr = [...arr];
      updatedArr[tail] = { letter: item, index: tail };
      setArr(updatedArr);
      setTail(tail + 1);
      setValue('');
    }
  };
  
  const dequeue = () => {
    if (head < tail) {
      const updatedArr = [...arr];
      updatedArr[head] = { letter: '', index: head };
      setArr(updatedArr);
      setHead(head + 1);
    }
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.box}>
        <Input maxLength={4} width={400} isLimitText max={4} onChange={handleClick} value={value}/>
        <Button text="Добавить" onClick={() => enqueue(value)}/>
        <Button text="Удалить" onClick={dequeue}/>
        <Button text="Очистить" extraClass="ml-30" />
      </div>
      <div className={styles.container}>
        {arr.map((element) => (
        <Circle
          key={element.index}
          index={element.index}
          letter={element.letter}
          head={element.index === head && (head !== 0 || element.letter !== '') ? 'head' : null}
          tail={element.index === tail - 1 && element.letter !== '' ? 'tail' : null}
        />
        ))}
      </div>
    </SolutionLayout>
  );
};
