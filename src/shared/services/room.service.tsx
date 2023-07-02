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

    create(request: any) {
        return Api.post("/rooms", request)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
            });
    }
}

export default new RoomService();
