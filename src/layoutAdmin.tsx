import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './pages/admin/layout/sideBar';
import Header from './pages/admin/layout/header';

const { Content } = Layout;

const LayoutAdmin = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <Header />
                <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
                    <Outlet /> {/* Thay children bằng Outlet */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;