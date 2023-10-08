import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibbonacci-page.module.css'
import { Button } from "../ui/button/button";
import { useInputHandlers } from "../../hooks/use-input";
import { useState } from "react";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";

export const FibonacciPage: React.FC = () => {

  const  {values, handleInputChange} = useInputHandlers({
    num: ''
  })

const onClick = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log(values.value)
} 

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.box} onSubmit={onClick}>
        <Input width={400} maxLength={19} isLimitText onChange={handleInputChange}/>
        <Button text="Развернуть" type="submit"/>
      </form>
      <div className={styles.container}>

      </div>
    </SolutionLayout>
  );
};
