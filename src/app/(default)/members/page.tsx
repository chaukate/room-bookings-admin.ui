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

    useEffect(() => {
        (async () => {
            const response = await MemberService.list();
            if (response?.status === 200) {
                setMember(response.data);
            }
        })();
    }, []);

    const handleSubmit = async (formData: IMemberFormData) => {
        console.log(">>>> formData", formData);

        const response = await MemberService.create(formData);
        formData.id = response.data;
    };

    return (
        <div>
            <h1>Member</h1>
            <ModalButton showModal={() => setShowForm(true)}>Add</ModalButton>
            {showForm ? (
                <FormModal title="Save Member" hideModal={() => setShowForm(false)}>
                    <Form onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
                </FormModal>
            ) : (<></>)}
            <Table />
        </div >
    );
};

export default Member;
