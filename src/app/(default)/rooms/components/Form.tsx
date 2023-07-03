"use client"

import { useState } from "react";
import { TextInput, TextAreaInput, NumberInput } from "@/app/(default)/components/Inputs";
import { IRoomFormData } from "@/shared/models/rooms";
import { CancelButton, SubmitButton } from "@/app/(default)/components/Buttons";

type FormProps = {
    onSubmit: (formData: IRoomFormData) => void,
    onCancel: () => void
};

const defaultFormData = {
    name: "",
    description: "",
    capacity: 0
}

const Form: React.FC<FormProps> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<IRoomFormData>(defaultFormData);

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const newFormData = {
            ...formData,
            [event.currentTarget.name]: event.currentTarget.value
        };
        setFormData(newFormData);
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newFormData = {
            ...formData,
            [event.target.name]: event.target.value
        };
        setFormData(newFormData);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        onSubmit(formData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <TextInput name="name"
                                onChange={handleInputChange}
                                value={formData.name}
                                label="Name" />
                            <TextAreaInput name="description"
                                onChange={handleInputChange}
                                value={formData.description}
                                label="Description" />
                            <NumberInput name="capacity"
                                onChange={handleInputChange}
                                value={formData.capacity}
                                label="Capacity" />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <CancelButton onClick={onCancel} />
                    <SubmitButton />
                </div>
            </form >
        </div>
    );
};

export default Form;
