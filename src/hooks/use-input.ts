import { useState } from 'react';


//вспомогательная функция для обработки инпутов
export function useInputHandlers(inputValues: {[name: string]: string}) {
  const [values, setInputValues] = useState(inputValues);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
     value,
    }));
  };

  return {values, handleInputChange, setInputValues};
}