"use client"

import { useEffect, useState } from "react";
import RoomService from "@/shared/services/room.service";
import Form from "./components/Form";
import { IRoomFormData } from "@/shared/models/rooms";
import { Table } from "@/app/(default)/components/Table";
import { FormModal } from "../components/Modals";
import { ModalButton } from "../components/Buttons";
import { useForm } from 'react-hook-form';

const defaultFormData = {
    name: "",
    description: "",
    capacity: 0
}

const Room = () => {
    const [rooms, setData] = useState<any>();
    const [showForm, setShowForm] = useState<boolean>(false);
    const [listHeader, setListHeader] = useState<any>();
    const [actionHandler,setActionHandler] = useState<any>();
    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [updateId, setUpdateId] = useState<number>(0);
    const [formData, setFormData] = useState<IRoomFormData>(defaultFormData);

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

    const onHandleSubmit = async (formData: IRoomFormData) => {
        const response = await RoomService.saveRooms(formData,updateId);
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

            //pass to children function
            setFormData({
                name: formDetail.name,
                description: formDetail.description,
                capacity: formDetail.capacity
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
        setShowForm(true)
        setFormData(defaultFormData)
        setUpdateId(0);
    }

    return (
        <div>
            <h1>Rooms</h1>
            <ModalButton showModal={openModal}>Add</ModalButton>
            {showForm ? (
                <FormModal title={showUpdate ? 'Update Room' : 'Save Room'} hideModal={hideModal}>
                    <Form onSubmit={onHandleSubmit} onCancel={hideModal} setValueOnForm={formData}/>
                </FormModal>
            ) : (<></>)}
            <Table tableHeader={listHeader} tableBody={rooms} actionHandler={actionHandler} isActionEnable={true} handleAction={handleAction}/>
        </div >
    );

};

export default Room;
