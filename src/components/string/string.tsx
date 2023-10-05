import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from './string.module.css'
import { Button } from "../ui/button/button";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <div className={styles.box}>
        <Input width={377} maxLength={11}/>
        <Button/>
      </div>
    </SolutionLayout>
  );
};
