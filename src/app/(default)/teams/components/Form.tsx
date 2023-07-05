import { useEffect, useState } from "react";
import { TextInput, TextAreaInput, NumberInput, InputSelect } from "@/app/(default)/components/Inputs";
import { CancelButton, SubmitButton } from "@/app/(default)/components/Buttons";
import { ITeamFormData } from "@/shared/models/teams";
import MemberService from "@/shared/services/member.service";

type FormProps = {
    onSubmit: (formData: ITeamFormData) => void,
    onCancel: () => void
    setFormData: any,
    formData: any
};

const Form: React.FC<FormProps> = ({ onSubmit, onCancel, formData, setFormData }) => {
    // const [formData, setFormData] = useState<ITeamFormData>(defaultFormData);
    const [leadData, setLeadData] = useState<any>();

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const newFormData = {
            ...formData,
            [event.currentTarget.name]: event.currentTarget.value
        };
        setFormData(newFormData);
    }
    useEffect(()=>{      
        (async () => {
            const response = await MemberService.list();
            if (response?.status === 200) {
                setLeadData(response.data);
            }
        })()
    },[]) 

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newFormData = {
            ...formData,
            [event.target.name]: +event.target.value
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
                            <InputSelect name="leadId" 
                            onChange={handleSelectChange} label="lead" 
                            value={leadData}
                            selectedValue={formData.leadId}/>
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
