"use client"

import { useEffect, useState } from "react";
import MemberService from "@/shared/services/member.service";
// import Form from "./components/Form";
import { Table } from "@/app/(default)/components/Table";
import { FormModal } from "../components/Modals";
import { ModalButton } from "../components/Buttons";
import Form from "./components/Form";
import { IMemberFormData } from "./models/members";

const Member = () => {
    const [members, setMember] = useState<any>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [actionHandler,setActionHandler] = useState<any>();
    const [listHeader, setListHeader] = useState<any>();

    useEffect(() => {
        fetchData()
        setListHeader([
            {'Head': 'Name' ,'FieldName': 'name' },
            {'Head': 'Email','FieldName': 'email'},
            {'Head': 'Has Admin Access','FieldName': 'hasAccess'}
        ]);
        setActionHandler([
            {title: 'Edit',className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' },
            {title: 'Delete',className:'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'}]
        )
    }, []);

    const fetchData =  (async () => {
        const response = await MemberService.list();
        if (response?.status === 200) {
            setMember(response.data);
        }
    });

    const handleSubmit = async (formData: IMemberFormData) => {
        const response = await MemberService.create(formData);
        formData.id = response.data;
        setShowForm(false);
        fetchData();
    };

    const handleAction = (formDetail : any,title: any) => {
        console.log(">>>> formDetail edit", formDetail,title);
    }

    return (
        <div>
            <h1>Member</h1>
            <ModalButton showModal={() => setShowForm(true)}>Add</ModalButton>
            {showForm ? (
                <FormModal title="Save Member" hideModal={() => setShowForm(false)}>
                    <Form onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
                </FormModal>
            ) : (<></>)}
            <Table tableHeader={listHeader} tableBody={members} actionHandler={actionHandler} isActionEnable={true} handleAction={handleAction}/>
        </div >
    );
};

export default Member;
