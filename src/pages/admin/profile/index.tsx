import React, { useState, useEffect } from 'react';
import { Card, Tabs, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from '@/utils/axios';

const { TabPane } = Tabs;

interface UserInfo {
    name: string;
    email: string;
}

interface PasswordUpdate {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const Profile: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm<UserInfo>();
    const [passwordForm] = Form.useForm();
    const [resetForm] = Form.useForm();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/auth/me');
            const userData = response.data.data;
            form.setFieldsValue(userData);
        } catch {
            message.error('Không thể tải thông tin người dùng');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateInfo = async (values: UserInfo) => {
        try {
            setLoading(true);
            await axios.put('/api/auth/update-details', values);
            message.success('Cập nhật thông tin thành công');
            fetchUserInfo();
        } catch {
            message.error('Không thể cập nhật thông tin');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (values: PasswordUpdate) => {
        try {
            if (values.newPassword !== values.confirmPassword) {
                message.error('Mật khẩu mới không khớp');
                return;
            }

            setLoading(true);
            await axios.put('/api/auth/update-password', {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword
            });
            message.success('Đổi mật khẩu thành công');
            passwordForm.resetFields();
        } catch {
            message.error('Không thể đổi mật khẩu');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (values: { email: string }) => {
        try {
            setLoading(true);
            await axios.post('/api/auth/forgot-password', values);
            message.success('Đã gửi email khôi phục mật khẩu');
            resetForm.resetFields();
        } catch {
            message.error('Không thể gửi email khôi phục');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-profile" style={{ padding: '24px' }}>
            <Card title="Thông tin cá nhân">
                <Tabs defaultActiveKey="info">
                    <TabPane tab="Thông tin" key="info">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleUpdateInfo}
                        >
                            <Form.Item
                                name="name"
                                label="Họ tên"
                                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="Họ tên" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email' },
                                    { type: 'email', message: 'Email không hợp lệ' }
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Cập nhật thông tin
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>

                    <TabPane tab="Đổi mật khẩu" key="password">
                        <Form
                            form={passwordForm}
                            layout="vertical"
                            onFinish={handleUpdatePassword}
                        >
                            <Form.Item
                                name="currentPassword"
                                label="Mật khẩu hiện tại"
                                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu hiện tại" />
                            </Form.Item>

                            <Form.Item
                                name="newPassword"
                                label="Mật khẩu mới"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                                    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu mới" />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                label="Xác nhận mật khẩu mới"
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không khớp'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu mới" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Đổi mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>

                    <TabPane tab="Quên mật khẩu" key="reset">
                        <Form
                            form={resetForm}
                            layout="vertical"
                            onFinish={handleForgotPassword}
                        >
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập email' },
                                    { type: 'email', message: 'Email không hợp lệ' }
                                ]}
                            >
                                <Input prefix={<MailOutlined />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={loading}>
                                    Gửi email khôi phục
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default Profile; 