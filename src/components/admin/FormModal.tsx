import React from 'react';
import { Modal } from 'antd';

interface FormModalProps {
    title: string;
    open: boolean;
    onCancel: () => void;
    onOk: () => void;
    children: React.ReactNode;
    confirmLoading?: boolean;
}

const FormModal: React.FC<FormModalProps> = ({
    title,
    open,
    onCancel,
    onOk,
    children,
    confirmLoading = false
}) => {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            onOk={onOk}
            confirmLoading={confirmLoading}
            width={720}
        >
            {children}
        </Modal>
    );
};

export default FormModal; 