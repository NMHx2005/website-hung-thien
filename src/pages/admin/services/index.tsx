import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Switch, Upload, message, Modal } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import DataTable from '@/components/admin/DataTable';
import axios from '@/utils/axios';
import type { IService } from '@/types/models';
import { ReactNode } from 'react';

const { TextArea } = Input;

interface ServiceFormValues {
    title: string;
    description: string;
    content: string;
    image?: UploadFile[];
    isActive: boolean;
}

interface ColumnType {
    title: string;
    dataIndex: string;
    key: string;
    ellipsis?: boolean;
    render?: (text: string, record: IService) => ReactNode;
}

const Services: React.FC = () => {
    const [data, setData] = useState<IService[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<IService | null>(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/services');
            setData(response.data.data);
        } catch (error) {
            message.error('Không thể tải dữ liệu');
            console.error('Fetch error:', error);
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

    const handleEdit = (record: IService) => {
        form.setFieldsValue({
            title: record.title,
            description: record.description,
            content: record.content,
            isActive: record.isActive,
            image: record.image ? [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: record.image,
            }] : []
        });
        setEditingRecord(record);
        setModalVisible(true);
    };

    const handleDelete = async (record: IService) => {
        try {
            await axios.delete(`/api/services/${record._id}`);
            message.success('Xóa dịch vụ thành công');
            fetchData();
        } catch (error) {
            message.error('Không thể xóa dịch vụ');
            console.error('Delete error:', error);
        }
    };

    const handleSubmit = async (values: ServiceFormValues) => {
        try {
            const formData = new FormData();

            // Append text fields
            formData.append('title', values.title.trim());
            formData.append('description', values.description.trim());
            formData.append('content', values.content.trim());
            formData.append('isActive', String(values.isActive));

            // Handle image
            if (values.image && values.image.length > 0) {
                const file = values.image[0];
                if (file.originFileObj) {
                    formData.append('image', file.originFileObj);
                }
            } else if (!editingRecord) {
                throw new Error('Vui lòng chọn hình ảnh');
            }

            // Submit data
            if (editingRecord) {
                await axios.patch(`/api/services/${editingRecord._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                message.success('Cập nhật dịch vụ thành công');
            } else {
                await axios.post('/api/services', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                message.success('Thêm dịch vụ thành công');
            }

            setModalVisible(false);
            form.resetFields();
            fetchData();
        } catch (error) {
            console.error('Submit error:', error);
            const typedError = error as { response?: { data?: { errors?: { msg: string }[] } } };
            const errorMessage = typedError.response?.data?.errors?.[0]?.msg || 'Có lỗi xảy ra khi gửi form';
            message.error(errorMessage);
        }
    };

    const columns: ColumnType[] = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text: string, record: IService) =>
                record.image ? (
                    <img
                        src={record.image}
                        alt="service"
                        style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                ) : null,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            render: (text: string, record: IService) => (
                <Switch checked={record.isActive} disabled />
            ),
        },
    ];

    const uploadProps = {
        beforeUpload: () => false,
        maxCount: 1,
        accept: 'image/*',
        listType: 'picture' as const,
    };

    return (
        <div className="admin-services">
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Thêm dịch vụ mới
                </Button>
            </div>

            <DataTable
                loading={loading}
                columns={columns}
                dataSource={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <Modal
                title={editingRecord ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    form.resetFields();
                }}
                onOk={() => form.submit()}
                width={720}
            >
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    layout="vertical"
                    initialValues={{ isActive: true }}
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                    >
                        <TextArea rows={6} />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Hình ảnh"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) return e;
                            return e?.fileList;
                        }}
                        rules={[
                            {
                                required: !editingRecord,
                                message: 'Vui lòng chọn hình ảnh',
                            },
                        ]}
                    >
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="isActive"
                        label="Kích hoạt"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Services;