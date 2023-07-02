"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import { useIsAuthenticated } from "@azure/msal-react";

interface IAuthLayout {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayout) {
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        // if the user is already logged in, no need to do it again
        if (isAuthenticated) {
            redirect("/");
        }
    }, [isAuthenticated]);

    return <main className="grow">{children}</main>;
}
