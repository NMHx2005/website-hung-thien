import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';

// Layouts
import LayoutClient from '@/layoutClient';
import LayoutAdmin from '@/layoutAdmin';

// Client pages
import HomePage from '@/pages/client/home/homePage';
import AboutPage from '@/pages/client/about/aboutPage';
import ServicesPage from '@/pages/client/services/services';
import ContactPage from '@/pages/client/contact/contactPage';

// Admin pages
import Login from '@/pages/admin/login';
import Dashboard from '@/pages/admin/dashboard';
import AdminPages from '@/pages/admin/pages';
import AdminServices from '@/pages/admin/services';
import AdminUsers from '@/pages/admin/users';

import '@/styles/main.scss';
import Profile from './pages/admin/profile';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider locale={viVN}>
            <Router>
                <Routes>
                    {/* Client routes */}
                    <Route path="/" element={<LayoutClient />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
                        <Route path="contact" element={<ContactPage />} />
                    </Route>

                    {/* Admin routes */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin" element={<LayoutAdmin />}>
                        <Route index element={<Dashboard />} />
                        <Route path="pages" element={<AdminPages />} />
                        <Route path="services" element={<AdminServices />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Routes>
            </Router>
        </ConfigProvider>
    </React.StrictMode>
);