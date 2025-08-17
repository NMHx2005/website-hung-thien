import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Switch, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import axios from '@/utils/axios';
import type { IPage } from '@/types/models';

const { TextArea } = Input;

interface PageFormValues {
    title: string;
    slug: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    isActive: boolean;
}

const Pages: React.FC = () => {
    const [data, setData] = useState<IPage[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<IPage | null>(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/pages');
            setData(response.data.data);
        } catch {
            message.error('Không thể tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = () => {
        form.resetFields();
        setEditingRecord(null);
        setModalVisible(true);
    };

    const handleEdit = (record: IPage) => {
        form.setFieldsValue(record);
        setEditingRecord(record);
        setModalVisible(true);
    };

    const handleDelete = async (record: IPage) => {
        try {
            await axios.delete(`/api/pages/${record._id}`);
            message.success('Xóa trang thành công');
            fetchData();
        } catch {
            message.error('Không thể xóa trang');
        }
    };

    const handleSubmit = async (values: PageFormValues) => {
        try {
            if (editingRecord) {
                await axios.put(`/api/pages/${editingRecord._id}`, values);
                message.success('Cập nhật trang thành công');
            } else {
                await axios.post('/api/pages', values);
                message.success('Thêm trang thành công');
            }
            setModalVisible(false);
            fetchData();
        } catch {
            message.error('Có lỗi xảy ra');
        }
    };

    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text: string, record: IPage) => (
                <Switch checked={record.isActive} disabled />
            ),
        },
    ];

    return (
        <div className="admin-pages">
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Thêm trang mới
                </Button>
            </div>

            <DataTable
                loading={loading}
                columns={columns}
                dataSource={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <FormModal
                title={editingRecord ? 'Sửa trang' : 'Thêm trang mới'}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={() => form.submit()}
            // form={form}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="slug"
                        label="Slug"
                        rules={[{ required: true, message: 'Vui lòng nhập slug' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                    >
                        <TextArea rows={6} />
                    </Form.Item>

                    <Form.Item
                        name="metaTitle"
                        label="Meta Title"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="metaDescription"
                        label="Meta Description"
                    >
                        <TextArea rows={3} />
                    </Form.Item>

                    <Form.Item
                        name="isActive"
                        label="Kích hoạt"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </FormModal>
        </div>
    );
};

export default Pages; 