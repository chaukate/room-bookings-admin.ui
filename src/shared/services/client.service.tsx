import Api from "@/shared/services/api.service";

class ClientService {
    list() {
        return Api.get("/clients")
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
            });
    }

    saveClient(request: any,id : number = 0) {
        let api;
        if(id > 0){
            api = Api.put(`/clients/${id}`, request)
        }
        else {
            api = Api.post("/clients", request)
        }
        return api.then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
        });
    }
}

export default new ClientService();
