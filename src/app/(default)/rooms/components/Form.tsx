"use client";

import { useState } from "react";
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
};

export type RoomFormFields = {
  name?: string;
  description: string;
  capacity: number;
};
const Form: React.FC<FormProps> = ({ onSubmit, onCancel }) => {
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomFormFields>();
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    // const newFormData = {
    //     ...formData,
    //     [event.currentTarget.name]: event.currentTarget.value
    // };
    // setFormData(newFormData);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // const newFormData = {
    //     ...formData,
    //     [event.target.name]: event.target.value
    // };
    // setFormData(newFormData);
  };

  const onHandleSubmit = (data: any) => {
    console.log(data);
    // onSubmit(formData)
  };

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
                formState = {errors}
                rules={{  required: true }}
              />
              <FormInput
                id="description"
                type="text"
                name="description"
                label="Description"
                placeholder="Description"
                register={register}
                rules={{ required: true }}
              />
              <FormInput
                id="capacity"
                type="number"
                name="capacity"
                label="Capacity"
                placeholder="Capacity"
                register={register}
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
