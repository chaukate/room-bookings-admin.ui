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

    saveMember(request: any,id : number = 0) {
        let api;
        if(id > 0){
            api = Api.put(`/members/${id}`, request)
        }
        else {
            api = Api.post("/members", request)
        }
        return api.then(response => {
                return response;
            })
            .catch(error => {
                return error.response;
        });
    }

    update(request: any,id: any) {
       
    }
}

export default new MemberService();
