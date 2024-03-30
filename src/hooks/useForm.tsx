import React, {useState} from 'react';

type TInputValues = {
  [value: string]: string;
};

export const useForm = (inputValues: TInputValues): {
  values: typeof inputValues;
  setValue: (values: {}) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} => {
  const [values, setValue] = useState(inputValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    setValue({...values, [name]: value});
  };

  return {values, setValue, handleChange};
};