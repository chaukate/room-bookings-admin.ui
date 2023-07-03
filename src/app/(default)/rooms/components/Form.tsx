"use client"

import RoomService from "@/shared/services/room.service";
import { useState } from "react";
import { TextInput, TextAreaInput, NumberInput } from "@/app/(default)/components/Inputs";
import { IRoomFormData } from "@/shared/models/rooms";

type FormProps = {
    onClose: () => void;
};

const defaultFormData = {
    name: "",
    description: "",
    capacity: 0
}

const Form: React.FC<FormProps> = ({ onClose }) => {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(">>>> formData", formData);

        (async () => {
            const response = await RoomService.create(formData);
        })();

        onClose();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

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
                    <button type="button" onClick={onClose} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
            </form >
        </div>
    );
};

export default Form;
