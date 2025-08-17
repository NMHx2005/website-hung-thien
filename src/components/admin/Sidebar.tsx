import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardOutlined,
    FileOutlined,
    CustomerServiceOutlined,
    TeamOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: '/admin/pages',
            icon: <FileOutlined />,
            label: 'Quản lý trang',
        },
        {
            key: '/admin/services',
            icon: <CustomerServiceOutlined />,
            label: 'Quản lý dịch vụ',
        },
        {
            key: '/admin/users',
            icon: <TeamOutlined />,
            label: 'Quản lý người dùng',
        },
        {
            key: 'logout',
            icon: <UserOutlined />,
            label: 'Đăng xuất',
            danger: true,
        },
    ];

    const handleMenuClick = (key: string) => {
        if (key === 'logout') {
            logout();
        } else {
            navigate(key);
        }
    };

    return (
        <Sider 
            collapsible 
            collapsed={collapsed} 
            onCollapse={setCollapsed}
            trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        >
            <div style={{ 
                height: 32, 
                margin: 16, 
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 'bold'
            }}>
                {!collapsed && 'ADMIN'}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => handleMenuClick(key)}
            />
        </Sider>
    );
};

export default Sidebar; 