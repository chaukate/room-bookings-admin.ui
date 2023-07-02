"use client"

import { useEffect, useState } from "react";
import RoomService from "@/shared/services/room.service";
import Form from "./components/Form";

const Room = () => {
    const [rooms, setData] = useState<any>();
    const [showForm, setShowForm] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const response = await RoomService.list();
            if (response?.status === 200) {
                setData(response.data);
            }
        })();
    }, []);

    const handleAdd = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    return (
        <div>
            <h1>Rooms</h1>
            <button onClick={handleAdd}>Add</button>
            {showForm && <Form onClose={handleCloseForm} />}
            {rooms ? (
                <ul>
                    {rooms.map((room: any) => (
                        <li key={room.id}>{room.name}</li>
                    ))}
                </ul>) : (
                <h2>Loading Records...</h2>
            )}
        </div >
    );
};

export default Room;
