import React, { useState } from 'react';
import { Modal, Form, Input, Switch, message } from 'antd';

function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('사용자 추가에 실패했습니다');
      }

      message.success('사용자가 성공적으로 추가되었습니다');
      onAddUser();
      onClose();
      form.resetFields();
    } catch (error) {
      console.error('Error adding user:', error);
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="사용자 추가"
      open={isOpen}
      onCancel={onClose}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="이름"
          rules={[{ required: true, message: '이름을 입력해주세요' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            { required: true, message: '이메일을 입력해주세요' },
            { type: 'email', message: '올바른 이메일 형식이 아닙니다' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="isActive"
          label="활성 상태"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="isAdmin"
          label="관리자 여부"
          valuePropName="checked"
          initialValue={false}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddUserModal;