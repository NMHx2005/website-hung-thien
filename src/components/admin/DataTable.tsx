import React from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

interface DataTableProps<T> extends Omit<TableProps<T>, 'columns'> {
    onEdit?: (record: T) => void;
    onDelete?: (record: T) => void;
    columns: Array<{
        title: string;
        dataIndex: string;
        key: string;
        render?: (text: string, record: T) => React.ReactNode;
    }>;
}

const DataTable = <T extends { _id: string }>({
    onEdit,
    onDelete,
    columns: userColumns,
    ...props
}: DataTableProps<T>) => {
    const handleDelete = async (record: T) => {
        try {
            if (onDelete) {
                await onDelete(record);
                message.success('Xóa thành công');
            }
        } catch {
            message.error('Có lỗi xảy ra');
        }
    };

    const actionColumn = {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action',
        render: (_: string, record: T) => (
            <Space size="middle">
                {onEdit && (
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record)}
                    >
                        Sửa
                    </Button>
                )}
                {onDelete && (
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa?"
                        onConfirm={() => handleDelete(record)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                )}
            </Space>
        ),
    };

    const columns = [...userColumns];
    if (onEdit || onDelete) {
        columns.push(actionColumn);
    }

    return <Table<T> {...props} columns={columns} rowKey="_id" />;
};

export default DataTable; 