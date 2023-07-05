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

    create(request: any) {
        return Api.post("/teams", request)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
            });
    }
}

export default new TeamService();
