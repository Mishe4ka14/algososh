import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import styles from './sorting-page.module.css'
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

interface IColumn {
  size: number
  id?: number
  state: ElementStates
}

interface IProps {
  arrLength?: number
}

export const SortingPage: React.FC <IProps> = ( {arrLength}: IProps ) => {
  
  const [arr, setArr] = useState<IColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const [bubble, setBubble] = useState(true);
  const [choice, setChoice] = useState(false);
  const [isUp, setIsUp] = useState(false)

  const onBubble = () => {
    setBubble(true)
    setChoice(false)
  }

  const onChoice = () => {
    setChoice(true)
    setBubble(false)
  }

  const randomArr = () => {
    let arr = Array.from({length: randomNum(arrLength ?? 3, arrLength ?? 17)}, () => Math.floor(Math.random() * 100))
    setArr(arr.map((number, index) => {
      return { id: index + 1, size: number, state: ElementStates.Default }
    }))
  }
  
  useEffect(() => {
    if(arrLength === 0) {
      setArr([])
    } else if (arrLength === 1) { 
      const randonNumber = Math.random();
      setArr([{size: randonNumber, id: 1, state: ElementStates.Default}])
    } else {
      randomArr()
    }
  }, [])

  const onClick = async() => {
    if(arrLength === 0) {
      setArr([])
    } else if (arrLength === 1) { 
      const randonNumber = Math.random();
      setArr([{size: randonNumber, id: 1, state: ElementStates.Default}])
    } else {
      randomArr()
    }
  }
  
  function randomNum(min: number, max: number):number {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //ПУЗЫРЬКОВАЯ СОРТИРОВКА
  const bubbleSort = async (up: boolean) => {
    setLoading(true);
    const sortArr = [...arr];
    const length = sortArr.length;
  
    for (let i = 0; i < length - 1; i++) {
      let finish = false;
  
      for (let j = 0; j < length - i - 1; j++) {
        const first = sortArr[j];
        const second = sortArr[j + 1];
  
        // красим элементы обратно, кроме отсортированных
        sortArr.forEach((element) => {
          if(element.state === ElementStates.Changing){
            element.state = ElementStates.Default;
          }
        });
  
        first.state = ElementStates.Changing;
        second.state = ElementStates.Changing;
  
        const shouldSwap = up
          ? first.size > second.size
          : first.size < second.size;
  
        if (shouldSwap) {
          const temp = first.size;
          first.size = second.size;
          second.size = temp;
          finish = true;
        }
  
        setArr([...sortArr]);
  
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
  
      sortArr[length - i - 1].state = ElementStates.Modified;
      setArr([...sortArr]);
  
      if (!finish) {
        break;
      }
    }
  
    sortArr.forEach((element) => {
      if(element.state !== ElementStates.Modified){
        element.state = ElementStates.Modified;
      }
    });
  
    setArr([...sortArr]);
    setLoading(false);
  };

  //БЫСТРАЯ СОРТИРОВКА
  const quickSort = async (up: boolean) => {
    setLoading(true);
    const sortArr = [...arr];
  
    const partition = async (low: number, high: number) => {
      const pivot = sortArr[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        const current = sortArr[j];
        sortArr.forEach((element) => {
          if (element !== pivot && element.state !== ElementStates.Modified) {
            element.state = ElementStates.Default;
          }
        });
  
        current.state = ElementStates.Changing;
        pivot.state = ElementStates.Changing;
  
        const shouldSwap = up ? current.size < pivot.size : current.size > pivot.size;
  
        if (shouldSwap) {
          i++;
          const temp = sortArr[i];
          sortArr[i] = current;
          sortArr[j] = temp;
        }
  
        setArr([...sortArr]);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
  
      const temp = sortArr[i + 1];
      sortArr[i + 1] = pivot;
      sortArr[high] = temp;
  
      setArr([...sortArr]);
      return i + 1;
    };
  
    const quickRecursive = async (low: number, high: number) => {
      if (low < high) {
        const partitionIndex = await partition(low, high);
  
        // статус только для того кто встал на место
        sortArr[partitionIndex].state = ElementStates.Modified;
        setArr([...sortArr]);
  
        await quickRecursive(low, partitionIndex - 1);
        await quickRecursive(partitionIndex + 1, high);
      }
    };
  
    await quickRecursive(0, sortArr.length - 1);
  
    sortArr.forEach((element) => {
      element.state = ElementStates.Modified;
    });
  
    setArr([...sortArr]);
    setLoading(false);
  };

  const changeSort = (up: boolean) => {
    arr.map((column) => column.state = ElementStates.Default)
    {bubble ? bubbleSort(up) : quickSort(up)}
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.box}>
        <div className={styles.radio}>
          <RadioInput label="Выбор" onChange={onChoice} checked={choice} disabled={loading}/>
          <RadioInput label="Пузырек" onChange={onBubble} checked={bubble} disabled={loading}/>
        </div>
        <div className={styles.container}>
          <Button text="По возрастанию" data-testid='btn-up' type="button" sorting={Direction.Ascending} onClick={() => { changeSort(true); setIsUp(true) }} disabled={loading} isLoader={isUp && loading}/>
          <Button text="По убыванию" data-testid='btn-down' sorting={Direction.Descending} onClick={() => { changeSort(false); setIsUp(false)}} disabled={loading} isLoader={!isUp && loading}/>
        </div>
        <Button text="Новый массив" onClick={onClick} disabled={loading}/>
      </div>
      <div data-testid='array' className={styles.columns}>
        {arr.map((column, index) => (
          <div data-testid = 'column' key={index}>
            <Column key={index} index={column.size} state={column.state}/>
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
