import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    FileOutlined,
    CustomerServiceOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.scss';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: 'Dashboard'
        },
        {
            key: '/admin/pages',
            icon: <FileOutlined />,
            label: 'Quản lý trang'
        },
        {
            key: '/admin/services',
            icon: <CustomerServiceOutlined />,
            label: 'Quản lý dịch vụ'
        },
        {
            key: '/admin/users',
            icon: <UserOutlined />,
            label: 'Quản lý người dùng'
        }
    ];

    return (
        <Sider 
            collapsible 
            collapsed={collapsed} 
            onCollapse={setCollapsed}
            trigger={null}
            className="admin-sidebar"
        >
            <div className="logo">
                <h1>{collapsed ? 'HT' : 'Hùng Thiên'}</h1>
            </div>
            <div className="sidebar-trigger" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
            />
        </Sider>
    );
};

export default Sidebar;