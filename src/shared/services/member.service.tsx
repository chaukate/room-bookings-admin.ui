import Api from "@/shared/services/api.service";

class MemberService {
    list() {
        return Api.get("/members")
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
            });
    }

    create(request: any) {
        return Api.post("/members", request)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
            });
    }
}

export default new MemberService();
