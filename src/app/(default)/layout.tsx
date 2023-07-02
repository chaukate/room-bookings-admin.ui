"use client"

import { useIsAuthenticated } from "@azure/msal-react";
import { useEffect, useState } from 'react';
import { redirect } from "next/navigation";

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const isAuthenticated = useIsAuthenticated();
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setIsAuthenticating(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (!isAuthenticating && !isAuthenticated) {
            redirect("/login");
        }
    }, [isAuthenticating, isAuthenticated]);

    if (isAuthenticating) {
        return <h1>Authenticating...</h1>
    }

    return (
        <main className="grow flex">
            <aside className="w-[200px] bg-slate-600">
                {/* <div className="text-md md:text-lg font-black mb-3 p-5 border-b-1 border-blue-900"> */}
                <div className="p-5 bg-gray-800 text-md md:text-lg font-black">
                    APP NAME
                </div>
            </aside>

            <div className="flex-1 p-5">{children}</div>
        </main>
    )
}
