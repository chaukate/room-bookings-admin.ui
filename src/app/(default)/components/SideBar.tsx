import React, { useState } from "react";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import Link from "next/link";

const { Sider } = Layout;

export const SideBar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Link href="/">
                    <Menu.Item key="/" icon={<PieChartOutlined />}>
                        Dashboard
                    </Menu.Item>
                </Link>
                <Link href="/rooms">
                    <Menu.Item key="/rooms" icon={<DesktopOutlined />}>
                        Rooms
                    </Menu.Item>
                </Link>
                <Link href="/members">
                    <Menu.Item key="/members" icon={<UserOutlined />}>
                        Members
                    </Menu.Item>
                </Link>
                <Link href="/teams">
                    <Menu.Item key="/teams" icon={<TeamOutlined />}>
                        Teams
                    </Menu.Item>
                </Link>
            </Menu>
        </Sider>
    );
};
