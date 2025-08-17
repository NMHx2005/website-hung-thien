import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Space } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import axios from '@/utils/axios';

const { Option } = Select;

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: string;
}

interface UserFormValues {
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'user';
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form] = Form.useForm<UserFormValues>();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/auth/users');
            setUsers(response.data.data);
        } catch {
            message.error('Không thể tải danh sách người dùng');
        } finally {
            setLoading(false);
        }
    };

    const handleAddUser = () => {
        setEditingUser(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        form.setFieldsValue(user);
        setModalVisible(true);
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await axios.delete(`/api/auth/users/${userId}`);
            message.success('Xóa người dùng thành công');
            fetchUsers();
        } catch {
            message.error('Không thể xóa người dùng');
        }
    };

    const handleSubmit = async (values: UserFormValues) => {
        try {
            setLoading(true);
            if (editingUser) {
                await axios.put(`/api/auth/users/${editingUser._id}`, values);
                message.success('Cập nhật người dùng thành công');
            } else {
                await axios.post('/api/auth/users', values);
                message.success('Thêm người dùng thành công');
            }
            setModalVisible(false);
            fetchUsers();
        } catch {
            message.error(editingUser ? 'Không thể cập nhật người dùng' : 'Không thể thêm người dùng');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => (
                <span style={{ textTransform: 'capitalize' }}>{role}</span>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: unknown, record: User) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditUser(record)}
                    >
                        Sửa
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteUser(record._id)}
                    >
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="admin-users" style={{ padding: '24px' }}>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={handleAddUser}
                >
                    Thêm người dùng
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={users}
                rowKey="_id"
                loading={loading}
            />

            <Modal
                title={editingUser ? 'Sửa người dùng' : 'Thêm người dùng'}
                open={modalVisible}
                onOk={form.submit}
                onCancel={() => setModalVisible(false)}
                confirmLoading={loading}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Họ tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    {!editingUser && (
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}

                    <Form.Item
                        name="role"
                        label="Vai trò"
                        rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                    >
                        <Select>
                            <Option value="user">Người dùng</Option>
                            <Option value="admin">Quản trị viên</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Users; 