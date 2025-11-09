import React, { useMemo, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.scss';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = useMemo(
        () => [
            {
                key: '/admin',
                icon: <CalendarOutlined />,
                label: 'Tin tức & Sự kiện'
            }
        ],
        []
    );

    const selectedKeys = useMemo(() => {
        const match = [...menuItems]
            .map((item) => item.key)
            .filter((key) => location.pathname.startsWith(key))
            .sort((a, b) => b.length - a.length)[0];
        return [match || location.pathname];
    }, [location.pathname, menuItems]);

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
                selectedKeys={selectedKeys}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
            />
        </Sider>
    );
};

export default Sidebar;