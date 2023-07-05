import Api from "@/shared/services/api.service";

class RoomService {
    list() {
        return Api.get("/rooms")
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
            });
    }
    saveRooms(request: any,id : number = 0) {
        let api;
        if(id > 0){
            api = Api.put(`/rooms/${id}`, request)
        }
        else {
            api = Api.post("/rooms", request)
        }
        return api.then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
        });
    }

}

export default new RoomService();
