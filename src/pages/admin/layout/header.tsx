import React from 'react';
import { Layout, Button, Space, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const items: MenuProps['items'] = [
        {
            key: 'profile',
            label: 'Thông tin cá nhân',
            icon: <UserOutlined />,
            onClick: () => navigate('/admin/profile')
        },
        {
            key: 'logout',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
            onClick: logout
        }
    ];

    return (
        <AntHeader style={{ padding: '0 16px', background: '#fff', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Space>
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Button type="text" icon={<UserOutlined />}>
                        Admin
                    </Button>
                </Dropdown>
            </Space>
        </AntHeader>
    );
};

export default Header; 