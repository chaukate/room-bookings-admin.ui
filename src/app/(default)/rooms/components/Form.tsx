"use client";

import { useEffect, useState } from "react";
import {
  TextInput,
  TextAreaInput,
  NumberInput,
} from "@/app/(default)/components/Inputs";
import { IRoomFormData } from "@/shared/models/rooms";
import { CancelButton, SubmitButton } from "@/app/(default)/components/Buttons";
import { useForm } from "react-hook-form";
import { FormInput } from "@/shared/components/form-component/form-input";

type FormProps = {
  onSubmit: (formData: IRoomFormData) => void;
  onCancel: () => void;
  setValueOnForm : any;
};

const Form: React.FC<FormProps> = ({ onSubmit, onCancel,setValueOnForm }) => {
const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IRoomFormData>();

  const onHandleSubmit = (data: any) => {
    onSubmit(data)
  };

  useEffect(()=> {
      setValue('name',setValueOnForm.name)
      setValue('description',setValueOnForm.description)
      setValue('capacity',setValueOnForm.capacity)
  },[setValueOnForm])
  // const setValueOnForm = (data: IRoomFormData) => {
  //   setValue('name',data.name)
  //   setValue('description',data.description)
  //   setValue('capacity',data.capacity)
  // }
  


  return (
    <div>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <FormInput
                id="name"
                type="text"
                name="name"
                label="Name"
                placeholder="Name"
                register={register}
                formState = {errors.name}
                rules={{  required: true }}
              />
              <FormInput
                id="description"
                type="text"
                name="description"
                label="Description"
                placeholder="Description"
                register={register}
                formState = {errors.description}
                rules={{ required: true }}
              />
              <FormInput
                id="capacity"
                type="number"
                name="capacity"
                label="Capacity"
                placeholder="Capacity"
                register={register}
                formState = {errors.capacity}
                rules={{ required: true }}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <CancelButton onClick={onCancel} />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default Form;
