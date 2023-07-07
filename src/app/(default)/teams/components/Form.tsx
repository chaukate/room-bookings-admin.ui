import { useEffect, useState } from "react";
import { TextInput, TextAreaInput, NumberInput, InputSelect } from "@/app/(default)/components/Inputs";
import { CancelButton, SubmitButton } from "@/app/(default)/components/Buttons";
import { ITeamFormData } from "@/shared/models/teams";
import MemberService from "@/shared/services/member.service";

type FormProps = {
    onSubmit: (formData: ITeamFormData) => void,
    onCancel: () => void
    setFormData: any,
    formData: any,
    error: any,
    setErrors: any
};

const Form: React.FC<FormProps> = ({ onSubmit, onCancel, formData, setFormData, error, setErrors }) => {
    // const [formData, setFormData] = useState<ITeamFormData>(defaultFormData);
    const [leadData, setLeadData] = useState<any>();

    const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
        const newFormData = {
            ...formData,
            [event.currentTarget.name]: event.currentTarget.value
        }; 
        filterError(event.currentTarget.name);
        setFormData(newFormData);
    }
    const filterError = (name: string) => {              
        const filterError =  (Object.entries(error).map(([key, value]) => ({
            key,
            value,
          }))).filter(x => x.key !== name);
        setErrors(filterError.reduce((acc: any, { key, value }) => {
                acc[key] = value;
                return acc;
                }, {})
        );
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
        filterError(event.target.name);
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
                                {error.name && <div className="block text-sm font-medium leading-6 text-gray-900">{error.name}</div>}

                            <TextAreaInput name="description"
                                onChange={handleInputChange}
                                value={formData.description}
                                label="Description" />
                                 {error.description && <p className="block text-sm font-medium leading-6 text-gray-900">{error.description}</p>}
                            <InputSelect name="leadId" 
                            onChange={handleSelectChange} label="lead" 
                            value={leadData}
                            selectedValue={formData.leadId}/>
                             {error.leadId && <div className="block text-sm font-medium leading-6 text-gray-900">{error.leadId}</div>}
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
