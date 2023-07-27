"use client"

import { useIsAuthenticated } from "@azure/msal-react";
import { useEffect, useState } from 'react';
import { redirect } from "next/navigation";

import { Layout, theme } from 'antd';
import { Alert, Spin } from 'antd';
import { SideBar } from "./components/SideBar";

const { Header, Content, Footer, Sider } = Layout;

export default function PageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const isAuthenticated = useIsAuthenticated();
    const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
        return (
            <Spin spinning={isAuthenticating} delay={500}>
                <Alert
                    message="Authenticating"
                    description="Checking user identity."
                    type="info"
                />
            </Spin>
        )
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SideBar />
            <Layout>
                {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
                <Content style={{ margin: '0 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        {children}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Room Booking ©2023 Devfinity</Footer> */}
            </Layout>
        </Layout>
    )
}
