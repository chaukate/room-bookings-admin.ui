import axios from "axios";
import AuthService from "@/shared/services/auth.service";
import { URL } from "@/shared/utilities/constants";
import { clearStorage } from "@/shared/utilities/tools";

const Api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    timeout: 60000,
});

Api.defaults.headers.get["Accept"] = "application/json";
Api.defaults.headers.post["Accept"] = "application/json";
Api.defaults.headers.patch["Content-Type"] = "application/json";

Api.interceptors.request.use(async (config: any) => {
    const account = await AuthService.getAccount();
    if (account && config) {
        config.headers.Authorization = `Bearer ${account.accessToken}`;
    }
    return config;
});

Api.interceptors.response.use(
    response => responseSuccessHandler(response),
    error => responseErrorHandler(error)
);

const responseSuccessHandler = (response: any) => {
    return response;
};

const responseErrorHandler = (error: any) => {
    console.log("<>err<>", error.response.status);

    if (error.response.status === 401) {
        const url = URL.LOGIN;
        clearStorage();
        return window.location.replace(url);
    }

    return Promise.reject(error);
};

export default Api;
