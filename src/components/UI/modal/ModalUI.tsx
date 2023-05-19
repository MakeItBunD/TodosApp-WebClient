import { Modal } from 'antd';
import React from 'react';

interface ModalUIProps {
  isModalOpen: boolean
  title: string
  text: string
  handleOk: () => void
  handleCancel: () => void
}

function ModalUI({
  isModalOpen, title, text, handleOk, handleCancel,
}: ModalUIProps) {
  return (
    <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>{text}</p>
    </Modal>
  );
}

export default ModalUI;
