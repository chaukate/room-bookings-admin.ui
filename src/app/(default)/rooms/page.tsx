"use client"

import { useEffect, useState } from "react";
import RoomService from "@/shared/services/room.service";
import Form from "./components/Form";
import { IRoomFormData } from "@/shared/models/rooms";
import { Table } from "@/app/(default)/components/Table";
import { FormModal } from "../components/Modals";
import { ModalButton } from "../components/Buttons";

const Room = () => {
    const [rooms, setData] = useState<any>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [listHeader, setListHeader] = useState<any>();
    const [actionHandler,setActionHandler] = useState<any>();
    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [updateId, setUpdateId] = useState<number>(0);

    useEffect(() => {
        fetchData();
        setListHeader([
            {'Head': 'Name' ,'FieldName': 'name' },
        ]);
        setActionHandler([
            {title: 'Edit',className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' }]
        )
    }, []);

    const fetchData = (async () => {
        const response = await RoomService.list();
        if (response?.status === 200) {
            setData(response.data);
        }
    });

    const handleSubmit = async (formData: IRoomFormData) => {

        const response = await RoomService.create(formData);
        formData.id = response.data;
        setShowForm(false);
        fetchData();
    };

    const handleAction = (formDetail : any,title: any) => {
        if(title === 'Edit'){
            setShowForm(true);
            setShowUpdate(true);
            setUpdateId(formDetail.id);
            // setFormData({
            //     name: formDetail.name,
            //     email: formDetail.email,
            //     hasAccess: formDetail.hasAccess
            // })
        }
    }

    const hideModal = () => {
        setShowForm(false) 
        setShowUpdate(false)
    }

    const openModal = () => {
        setShowForm(true)
        // setFormData(defaultFormData)
    }

    return (
        <div>
            <h1>Rooms</h1>
            <ModalButton showModal={openModal}>Add</ModalButton>
            {showForm ? (
                <FormModal title={showUpdate ? 'Update Room' : 'Save Room'} hideModal={hideModal}>
                    <Form onSubmit={handleSubmit} onCancel={hideModal} />
                </FormModal>
            ) : (<></>)}
            <Table tableHeader={listHeader} tableBody={rooms} actionHandler={actionHandler} isActionEnable={true} handleAction={handleAction}/>
        </div >
    );
};

export default Room;
