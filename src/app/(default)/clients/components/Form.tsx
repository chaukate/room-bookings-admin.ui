"use client"
import { useState } from "react";
import { TextInput, TextAreaInput, NumberInput, BooleanInput } from "@/app/(default)/components/Inputs";
import { CancelButton, SubmitButton } from "@/app/(default)/components/Buttons";
import { IClientFormData } from "../models/clients";

type FormProps = {
    onSubmit: (formData: IClientFormData) => void,
    onCancel: () => void
    setFormData: any,
    formData: any
};

const Form: React.FC<FormProps> = ({ onSubmit, onCancel, formData, setFormData }) => {

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const newFormData = {
            ...formData,
            [event.currentTarget.name]: event.currentTarget.value
        };
        setFormData(newFormData);
    }

    const handleBooleanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {        
        const newFormData = {
            ...formData,
            [event.target.name]: !formData.hasAccess
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
                            <TextInput name="adminEmail"
                                onChange={handleInputChange}
                                value={formData.adminEmail}
                                label="Email" />
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
