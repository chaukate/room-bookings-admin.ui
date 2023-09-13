"use client"

import { useEffect, useState } from "react";
import ClientService from "@/shared/services/client.service";
// import Form from "./components/Form";
import { Table } from "@/app/(default)/components/Table";
import { FormModal } from "../components/Modals";
import { ModalButton } from "../components/Buttons";
import Form from "./components/Form";
import { IClientFormData } from "./models/clients";

const defaultFormData = {
    name: "",
    adminEmail: ""
}

const Member = () => {
    const [members, setMember] = useState<any>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [actionHandler,setActionHandler] = useState<any>();
    const [listHeader, setListHeader] = useState<any>();
    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [formData, setFormData] = useState<IClientFormData>(defaultFormData);
    const [updateId, setUpdateId] = useState<number>(0);
    useEffect(() => {
        fetchData()
        setListHeader([
            {'Head': 'Name' ,'FieldName': 'name' },
            {'Head': 'Email','FieldName': 'adminEmail'},
        ]);
        setActionHandler([
            {title: 'Edit',className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' }]
        )
    }, []);

    const fetchData =  (async () => {
        const response = await ClientService.list();
        if (response?.status === 200) {
            setMember(response.data);
        }
    });

    const handleSubmit = async (formData: IClientFormData) => {
        const response = await ClientService.saveClient(formData, updateId);
        if(response.status === 200){
            formData.id = response.data;
            hideModal()
            fetchData();
            setFormData(defaultFormData)
        }
    };

    const handleAction = (formDetail : any,title: any) => {
        if(title === 'Edit'){
            setShowForm(true);
            setShowUpdate(true);
            setUpdateId(formDetail.id);
            setFormData({
                name: formDetail.name,
                adminEmail: formDetail.adminEmail
            })
        }
    }

   const hideModal = () => {
        setShowForm(false) 
        setShowUpdate(false)
        setUpdateId(0);
        setFormData(defaultFormData)
    }

    const openModal = () => {
        setUpdateId(0);
        setShowForm(true)
        setFormData(defaultFormData)
    }

    return (
        <div>
            <h1>Member</h1>
            <ModalButton showModal={openModal}>Add</ModalButton>
            {showForm ? (
                <FormModal title={showUpdate ? 'Update Client' : 'Save Client'} hideModal={hideModal}>
                    <Form onSubmit={handleSubmit} onCancel={hideModal} formData={formData} setFormData={setFormData} />
                </FormModal>
            ) : (<></>)}
            <Table tableHeader={listHeader} tableBody={members} actionHandler={actionHandler} isActionEnable={true} handleAction={handleAction}/>
        </div >
    );
};

export default Member;
