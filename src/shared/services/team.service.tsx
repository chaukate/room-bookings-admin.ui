import Api from "@/shared/services/api.service";

class TeamService {
    list() {
        return Api.get("/teams")
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
            });
    }

    getById(id: number) {
        return Api.get(`/teams/${id}`)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
            });
    }

    // create(request: any) {
    //     return Api.post("/teams", request)
    //         .then(response => {
    //             return response;
    //         })
    //         .catch(error => {
    //             return error.response;
    //         });
    // }

    saveTeams(request: any,id : number = 0) {
        let api;
        if(id > 0){
            api = Api.put(`/teams/${id}`, request)
        }
        else {
            api = Api.post("/teams", request)
        }
        return api.then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
        });
    }
}

export default new TeamService();
