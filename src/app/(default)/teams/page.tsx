"use client"

import { useEffect, useState } from "react";
import RoomService from "@/shared/services/room.service";
import { ITeamFormData } from "@/shared/models/teams";
import { ModalButton } from "../components/Buttons";
import { FormModal } from "../components/Modals";
import { Table } from "../components/Table";
import Form from "./components/Form";
import TeamService from "@/shared/services/team.service";

const Teams = () => {
    const [teams, setTeam] = useState<any[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [listHeader, setListHeader] = useState<any>();
    const [actionHandler,setActionHandler] = useState<any>();

      useEffect(() => {
        fetchData()
        setListHeader([
            {'Head': 'Name' ,'FieldName': 'name' },
            {'Head': 'Lead Name','FieldName': 'leadName'},
            {'Head': 'Active','FieldName': 'isActive'}
        ]);
        setActionHandler([
            {title: 'Edit',className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' },
            {title: 'Delete',className:'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'}]
        )
    }, []);

    const handleSubmit = async (formData: ITeamFormData) => {
        const response = await TeamService.create(formData);
        formData.id = response.data;
        setShowForm(false);
        fetchData();        
    };

    const fetchData = async () => {
      const response = await TeamService.list();
      if (response?.status === 200) {
        setTeam(response.data);
        setShowForm(false);
      }
    };

    const handleAction = (formDetail : any,title: any) => {
      console.log(">>>> formDetail edit", formDetail,title);
  }
    return (
        <div>
            <h1>Teams</h1>
            <ModalButton showModal={() => setShowForm(true)}>Add Team</ModalButton>
            {showForm ? (
                <FormModal title="Save Team" hideModal={() => setShowForm(false)}>
                    <Form onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
                </FormModal>
            ) : (<></>)}
            <Table tableHeader={listHeader} tableBody={teams} actionHandler={actionHandler} isActionEnable={true} handleAction={handleAction}/>
        </div >
    );
};

export default Teams;
