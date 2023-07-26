import React from 'react';
import { RegisterOptions, UseFormRegister, Path } from 'react-hook-form';
import { Input, InputProps } from '../input-component/input';

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<any>;
  formState?: any;
} & Omit<InputProps, 'name'>;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  className,
  name,
  register,
  rules,
  formState,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  return (
    <>
          <Input name={name} {...props} {...(register && register(name, rules))} formState = {formState}/>
    </>
  );
};
