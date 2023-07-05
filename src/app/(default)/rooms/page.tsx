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
    useEffect(() => {
        fetchData();
        setListHeader([
            {'Head': 'Name' ,'FieldName': 'name' },
            {'Head': 'Updated At','FieldName': 'lastUpdatedAt'}
        ]);
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

    return (
        <div>
            <h1>Rooms</h1>
            <ModalButton showModal={() => setShowForm(true)}>Add</ModalButton>
            {showForm ? (
                <FormModal title="Save Room" hideModal={() => setShowForm(false)}>
                    <Form onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
                </FormModal>
            ) : (<></>)}
            <Table tableHeader={listHeader} tableBody={rooms}/>
        </div >
    );
};

export default Room;
