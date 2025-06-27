import { Modal } from 'antd';
import React from 'react';

interface CustomModalProps {
  open: boolean;
  title?: string;
  onOk?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  width?: number;
  centered?: boolean;
  footer?: React.ReactNode | null;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  title,
  onOk,
  onCancel,
  children,
  okText = 'OK',
  cancelText = 'Cancel',
  width = 520,
  centered = true,
  footer,
}) => {
  return (
    <Modal
      open={open}
      title={<div style={{ marginBottom: 25, fontSize: 20, fontWeight: 700 }}>{title}</div>}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      width={width}
      centered={centered}
      footer={footer}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
