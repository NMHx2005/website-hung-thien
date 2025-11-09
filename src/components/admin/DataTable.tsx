import React from 'react';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataTableProps<T> extends Omit<TableProps<T>, 'columns'> {
    onEdit?: (record: T) => void;
    onDelete?: (record: T) => void;
    columns: ColumnsType<T>;
}

const DataTable = <T extends { _id: string }>({
    onEdit,
    onDelete,
    columns: userColumns,
    ...props
}: DataTableProps<T>) => {
    const handleDelete = async (record: T) => {
        if (!onDelete) {
            return;
        }
        try {
            await onDelete(record);
        } catch (error) {
            message.error('Có lỗi xảy ra khi xóa');
            throw error;
        }
    };

    const actionColumn: ColumnsType<T>[number] = {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action',
        render: (_: unknown, record: T) => (
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

    const columns: ColumnsType<T> = [...userColumns];
    if (onEdit || onDelete) {
        columns.push(actionColumn);
    }

    return <Table<T> {...props} columns={columns} rowKey="_id" />;
};

export default DataTable; 