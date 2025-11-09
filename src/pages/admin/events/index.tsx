import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Switch,
    Tag,
    Upload,
    message
} from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import DataTable from '@/components/admin/DataTable';
import axios from '@/utils/axios';
import type { IEvent } from '@/types/models';
import './styles.scss';

const { TextArea } = Input;

interface EventFormValues {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    location?: string;
    eventDate?: Dayjs | null;
    endDate?: Dayjs | null;
    image?: UploadFile[];
    isFeatured: boolean;
    isPublished: boolean;
}

const formatDate = (value?: string) => {
    if (!value) return '—';
    const parsed = dayjs(value);
    if (!parsed.isValid()) return '—';
    return parsed.format('DD/MM/YYYY');
};

const Events: React.FC = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [form] = Form.useForm<EventFormValues>();
    const [editingRecord, setEditingRecord] = useState<IEvent | null>(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/events', {
                params: {
                    status: 'all',
                    limit: 100
                }
            });
            const data: IEvent[] = response.data?.data ?? [];
            setEvents(data);
        } catch (error) {
            console.error('Failed to fetch events', error);
            message.error('Không thể tải danh sách tin tức/sự kiện');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const resetModalState = () => {
        form.resetFields();
        setEditingRecord(null);
    };

    const openCreateModal = () => {
        resetModalState();
        form.setFieldsValue({
            isFeatured: false,
            isPublished: true
        });
        setModalVisible(true);
    };

    const openEditModal = (record: IEvent) => {
        setEditingRecord(record);
        form.setFieldsValue({
            title: record.title,
            slug: record.slug,
            excerpt: record.excerpt,
            content: record.content,
            location: record.location,
            eventDate: record.eventDate ? dayjs(record.eventDate) : null,
            endDate: record.endDate ? dayjs(record.endDate) : null,
            image: record.image
                ? [
                    {
                        uid: '-1',
                        name: 'image',
                        status: 'done',
                        url: record.image
                    } as UploadFile
                ]
                : [],
            isFeatured: Boolean(record.isFeatured),
            isPublished: Boolean(record.isPublished)
        });
        setModalVisible(true);
    };

    const handleDelete = async (record: IEvent) => {
        try {
            await axios.delete(`/api/events/${record._id}`);
            message.success('Xóa sự kiện thành công');
            fetchEvents();
        } catch (error) {
            console.error('Failed to delete event', error);
            message.error('Không thể xóa sự kiện');
        }
    };

    const buildFormData = (values: EventFormValues) => {
        const formData = new FormData();
        formData.append('title', values.title.trim());
        formData.append('slug', values.slug.trim());
        formData.append('content', values.content.trim());
        formData.append('isFeatured', String(values.isFeatured));
        formData.append('isPublished', String(values.isPublished));

        if (values.excerpt) {
            formData.append('excerpt', values.excerpt.trim());
        }

        if (values.location) {
            formData.append('location', values.location.trim());
        }

        if (values.eventDate) {
            formData.append('eventDate', values.eventDate.toISOString());
        }

        if (values.endDate) {
            formData.append('endDate', values.endDate.toISOString());
        }

        if (values.image && values.image.length > 0) {
            const file = values.image[0];
            if (file.originFileObj) {
                formData.append('image', file.originFileObj);
            }
        }

        return formData;
    };

    const handleSubmit = async (values: EventFormValues) => {
        try {
            const formData = buildFormData(values);

            if (editingRecord) {
                await axios.patch(`/api/events/${editingRecord._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                message.success('Cập nhật sự kiện thành công');
            } else {
                await axios.post('/api/events', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                message.success('Thêm sự kiện thành công');
            }

            setModalVisible(false);
            resetModalState();
            fetchEvents();
        } catch (error) {
            console.error('Failed to submit event', error);
            const axiosError = error as { response?: { data?: { errors?: { msg: string }[]; message?: string } } };
            const validationMsg =
                axiosError.response?.data?.errors?.[0]?.msg || axiosError.response?.data?.message;
            message.error(validationMsg || 'Không thể lưu sự kiện');
        }
    };

    const uploadProps = {
        beforeUpload: () => false,
        maxCount: 1,
        accept: 'image/*',
        listType: 'picture' as const
    };

    const columns: ColumnsType<IEvent> = useMemo(
        () => [
            {
                title: 'Tiêu đề',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: 'Slug',
                dataIndex: 'slug',
                key: 'slug'
            },
            {
                title: 'Địa điểm',
                dataIndex: 'location',
                key: 'location',
                render: (value: string | undefined) => value || '—'
            },
            {
                title: 'Ngày diễn ra',
                dataIndex: 'eventDate',
                key: 'eventDate',
                render: (value: string, record) => formatDate(value || record.publishedAt || record.createdAt)
            },
            {
                title: 'Trạng thái',
                dataIndex: 'isPublished',
                key: 'isPublished',
                render: (value: boolean) =>
                    value ? <Tag color="green">Đã xuất bản</Tag> : <Tag color="orange">Bản nháp</Tag>
            },
            {
                title: 'Nổi bật',
                dataIndex: 'isFeatured',
                key: 'isFeatured',
                render: (value: boolean) =>
                    value ? <Tag color="gold">Nổi bật</Tag> : <Tag color="default">Thường</Tag>
            }
        ],
        []
    );

    return (
        <div className="admin-events">
            <div className="admin-events__actions">
                <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
                    Thêm tin tức / sự kiện
                </Button>
            </div>

            <DataTable<IEvent>
                loading={loading}
                columns={columns}
                dataSource={events}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />

            <Modal
                title={editingRecord ? 'Cập nhật tin tức / sự kiện' : 'Thêm tin tức / sự kiện'}
                open={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    resetModalState();
                }}
                onOk={() => form.submit()}
                width={820}
                destroyOnClose
            >
                <Form<EventFormValues>
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        isFeatured: false,
                        isPublished: true
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Tiêu đề"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tiêu đề' },
                            { max: 150, message: 'Tiêu đề không được vượt quá 150 ký tự' },
                            {
                                validator: (_, value) =>
                                    !value || value.trim().length >= 10
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Tiêu đề cần tối thiểu 10 ký tự'))
                            }
                        ]}
                        extra="Tiêu đề tối thiểu 10 ký tự, tối đa 150 ký tự."
                    >
                        <Input placeholder="Nhập tiêu đề sự kiện" maxLength={150} showCount />
                    </Form.Item>

                    <Form.Item
                        name="slug"
                        label="Slug"
                        rules={[
                            { required: true, message: 'Vui lòng nhập slug' },
                            {
                                pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                                message: 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang'
                            },
                            {
                                max: 160,
                                message: 'Slug không được vượt quá 160 ký tự'
                            }
                        ]}
                        extra="Slug chỉ gồm chữ thường, số, dấu gạch ngang, tối đa 160 ký tự."
                    >
                        <Input placeholder="vd: hoi-thao-2025" maxLength={160} showCount />
                    </Form.Item>

                    <Form.Item
                        name="excerpt"
                        label="Mô tả ngắn"
                        rules={[
                            { max: 300, message: 'Mô tả ngắn không được vượt quá 300 ký tự' }
                        ]}
                        extra="Tối đa 300 ký tự."
                    >
                        <TextArea rows={3} placeholder="Mô tả ngắn gọn" maxLength={300} showCount />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="Nội dung"
                        rules={[
                            { required: true, message: 'Vui lòng nhập nội dung' },
                            {
                                validator: (_, value) =>
                                    !value || value.trim().length >= 30
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('Nội dung cần tối thiểu 30 ký tự'))
                            }
                        ]}
                        extra="Nội dung tối thiểu 30 ký tự."
                    >
                        <TextArea rows={6} placeholder="Nội dung chi tiết" showCount />
                    </Form.Item>

                    <Form.Item
                        name="location"
                        label="Địa điểm"
                        rules={[
                            { max: 120, message: 'Địa điểm không được vượt quá 120 ký tự' }
                        ]}
                        extra="Tối đa 120 ký tự."
                    >
                        <Input placeholder="Nhập địa điểm (nếu có)" maxLength={120} showCount />
                    </Form.Item>

                    <Form.Item name="eventDate" label="Ngày diễn ra">
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.Item name="endDate" label="Ngày kết thúc">
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.Item
                        name="image"
                        label="Ảnh đại diện"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={[
                            {
                                required: !editingRecord,
                                message: 'Vui lòng chọn hình ảnh'
                            }
                        ]}
                    >
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="isFeatured" label="Đánh dấu nổi bật" valuePropName="checked">
                        <Switch />
                    </Form.Item>

                    <Form.Item name="isPublished" label="Xuất bản" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Events;

