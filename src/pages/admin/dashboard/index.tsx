import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import {
    FileOutlined,
    CustomerServiceOutlined,
    TeamOutlined,
    EyeOutlined,
} from '@ant-design/icons';
import axios from '@/utils/axios';
import './styles.scss';

interface DashboardStats {
    pages: number;
    services: number;
    users: number;
    visits: number;
}

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats>({
        pages: 0,
        services: 0,
        users: 0,
        visits: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('/api/dashboard/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard">
            <h2>Dashboard</h2>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card loading={loading}>
                        <Statistic
                            title="Tổng số trang"
                            value={stats.pages}
                            prefix={<FileOutlined />}
                        />
                    </Card>
                </Col>
                
                <Col xs={24} sm={12} lg={6}>
                    <Card loading={loading}>
                        <Statistic
                            title="Tổng số dịch vụ"
                            value={stats.services}
                            prefix={<CustomerServiceOutlined />}
                        />
                    </Card>
                </Col>
                
                <Col xs={24} sm={12} lg={6}>
                    <Card loading={loading}>
                        <Statistic
                            title="Tổng số người dùng"
                            value={stats.users}
                            prefix={<TeamOutlined />}
                        />
                    </Card>
                </Col>
                
                <Col xs={24} sm={12} lg={6}>
                    <Card loading={loading}>
                        <Statistic
                            title="Lượt truy cập"
                            value={stats.visits}
                            prefix={<EyeOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard; 