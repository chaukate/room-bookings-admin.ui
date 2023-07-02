"use client"

import AuthService from "@/shared/services/auth.service";

const LoginButton = () => {
    const handleLogin = async () => {
        const response = await AuthService.msalLogin();
        if (response.accessToken) {
            console.log("accessToken >>>", response.accessToken);
        }
    };

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
};

export default LoginButton;
