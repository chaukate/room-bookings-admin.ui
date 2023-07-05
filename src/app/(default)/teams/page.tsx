"use client"

import { useEffect, useState } from "react";
import RoomService from "@/shared/services/room.service";
import { ITeamFormData } from "@/shared/models/teams";
import { ModalButton } from "../components/Buttons";
import { FormModal } from "../components/Modals";
import { Table } from "../components/Table";
import Form from "./components/Form";
import TeamService from "@/shared/services/team.service";

const defaultFormData = {
  name: "",
  description: "",
  leadId: 0,
  id: 0
}

const Teams = () => {
    const [teams, setTeam] = useState<any[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [listHeader, setListHeader] = useState<any>();
    const [actionHandler,setActionHandler] = useState<any>();
    const [showUpdate, setShowUpdate] = useState<boolean>(false);
    const [formData, setFormData] = useState<ITeamFormData>(defaultFormData);
    const [updateId, setUpdateId] = useState<number>(0);

      useEffect(() => {
        fetchData()
        setListHeader([
            {'Head': 'Name' ,'FieldName': 'name' },
            {'Head': 'Lead Name','FieldName': 'leadName'},
        ]);
        setActionHandler([
            {title: 'Edit',className: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' }]
        )
    }, []);

    const handleSubmit = async (formData: ITeamFormData) => {
        const response = await TeamService.saveTeams(formData, updateId);
        if(response.status === 200){
          formData.id = response.data;
          hideModal()
          fetchData();
          setFormData(defaultFormData)
      }     
    };

    const fetchData = async () => {
      const response = await TeamService.list();
      if (response?.status === 200) {
        setTeam(response.data);
        setShowForm(false);
      }
    };

    const handleAction = (formDetail : any,title: any) => {
      if(title === 'Edit'){
        setShowForm(true);
        setShowUpdate(true);
        setUpdateId(formDetail.id);
        (async () => {
          const response = await  TeamService.getById(formDetail.id);
          if (response?.status === 200) {
            setFormData({
              id: response.data.id,
              name: response.data.name,
              description: response.data.description,
              leadId: response.data.leadId
          })          
        }
      })()
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
    setUpdateId(0);
    setFormData(defaultFormData);
}

    return (
        <div>
            <h1>Teams</h1>
            <ModalButton showModal={openModal}>Add Team</ModalButton>
            {showForm ? (
                <FormModal title={showUpdate ? 'Update Team' : 'Save Team'} hideModal={hideModal}>
                    <Form onSubmit={handleSubmit} onCancel={hideModal}  formData={formData} setFormData={setFormData}  />
                </FormModal>
            ) : (<></>)}
            <Table tableHeader={listHeader} tableBody={teams} 
              actionHandler={actionHandler} isActionEnable={true} handleAction={handleAction}/>
        </div >
    );
};

export default Teams;
