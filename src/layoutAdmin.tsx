import React from 'react';
import { Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from './pages/admin/layout/sideBar';
import Header from './pages/admin/layout/header';
import { useAuth } from './hooks/useAuth';

const { Content } = Layout;

const LayoutAdmin = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

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