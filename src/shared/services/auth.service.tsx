import { msalInstance, loginRequest } from "@/shared/configurations/authConfig";

class AuthService {
    msalLogin() {
        return msalInstance
            .loginPopup(loginRequest)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    msalLogout() {
        return msalInstance
            .logoutPopup({
                mainWindowRedirectUri: "/login",
            })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
    }

    getAccount = () => {
        return msalInstance
            .acquireTokenSilent(loginRequest)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.log("err", err);
                return null;
            });
    };
}

export default new AuthService();
