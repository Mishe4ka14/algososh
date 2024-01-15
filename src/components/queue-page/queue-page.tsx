import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from './queue-page.module.css';
import { Queue } from "./queue-page-class";

  export const QueuePage: React.FC = () => {
    const [queue, setQueue] = useState<Queue>(new Queue());
    const [value, setValue] = useState("");
    const [isAddDisabled, setIsAddDisabled] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
  
    const isDeleteDisabled = queue.isDeleteDisabled();
    const arr = queue.getQueueArr();
  
    useEffect(() => {
      if (queue.isAddDisabled()) setIsAddDisabled(true);
    }, [queue]);
  
  
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
  
    const onAdd = () => {
      setIsAdd(true);
      queue.enqueue(value);
  
      setTimeout(() => {
        setQueue(queue);
        setValue("");
        setIsAdd(false);
      }, 500);
    };
  
    const onDelete = () => {
      setIsDelete(true);
      queue.dequeue();
  
      setTimeout(() => {
        setQueue(queue);
        setIsDelete(false);
      }, 500);
    };
  
    const onClear = () => {
      queue.clear();
      setIsAddDisabled(true);
      setTimeout(() => {
        setQueue(queue);
        setIsAddDisabled(false);
      }, 1000);
    };
  
    return (
    <SolutionLayout title="Очередь">
      <div className={styles.box}>
        <Input  data-testid="input" maxLength={4} width={400} isLimitText max={4} onChange={onChange} value={value} disabled={isDelete || isAdd}
        />
        <Button  data-testid="add" text="Добавить" onClick={onAdd}isLoader={isAdd} disabled={!value || isAddDisabled || isDelete || isAdd}/>
        <Button  data-testid="delete" text="Удалить" onClick={onDelete} isLoader={isDelete} disabled={isDeleteDisabled || isDelete || isAdd} />
        <Button  data-testid="clean" text="Очистить" onClick={onClear} extraClass="ml-30" disabled={isDelete || isAdd || queue.isEmpty()} />
      </div>
      <div className={styles.container}>
        {arr.map((element, index) => (
          <Circle key={index} index={index} letter={element.letter} state={element.state} head={index === queue.getHead() ? "head" : null} tail={index === queue.getTail() - 1 ? "tail" : null}/>
        ))}
      </div>
    </SolutionLayout>
  );
};

