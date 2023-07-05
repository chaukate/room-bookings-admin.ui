"use client"

import { useEffect, useState } from "react";
import MemberService from "@/shared/services/member.service";
// import Form from "./components/Form";
import { Table } from "@/app/(default)/components/Table";
import { FormModal } from "../components/Modals";
import { ModalButton } from "../components/Buttons";
import Form from "./components/Form";
import { IMemberFormData } from "./models/members";

const defaultFormData = {
    name: "",
    email: "",
    hasAccess: false
}

const Member = () => {
    const [members, setMember] = useState<any>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [actionHandler,setActionHandler] = useState<any>();
    const [listHeader, setListHeader] = useState<any>();
    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [formData, setFormData] = useState<IMemberFormData>(defaultFormData);
    const [updateId, setUpdateId] = useState<number>(0);
    useEffect(() => {
        fetchData()
        setListHeader([
            {'Head': 'Name' ,'FieldName': 'name' },
            {'Head': 'Email','FieldName': 'email'},
        ]);
        setActionHandler([
            {title: 'Edit',className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' }]
        )
    }, []);

    const fetchData =  (async () => {
        const response = await MemberService.list();
        if (response?.status === 200) {
            setMember(response.data);
        }
    });

    const handleSubmit = async (formData: IMemberFormData) => {
        const response = await MemberService.saveMember(formData, updateId);
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
                email: formDetail.email,
                hasAccess: formDetail.hasAccess
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
                <FormModal title={showUpdate ? 'Update Member' : 'Save Member'} hideModal={hideModal}>
                    <Form onSubmit={handleSubmit} onCancel={hideModal} formData={formData} setFormData={setFormData} />
                </FormModal>
            ) : (<></>)}
            <Table tableHeader={listHeader} tableBody={members} actionHandler={actionHandler} isActionEnable={true} handleAction={handleAction}/>
        </div >
    );
};

export default Member;
