import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userErrorAtom } from '../store/atoms';
import { Input, Switch, Button, Spin, Alert, Row, Col, Form, message, Modal } from 'antd';
import styled from 'styled-components';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const StyledForm = styled(Form)`
  max-width: 600px;
  margin: 0 auto;
`;

const Label = styled.span`
  font-weight: bold;
`;

function UserDetail() {
  const [user, setUser] = useState(null);
  const [error, setError] = useAtom(userErrorAtom);
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error('사용자 데이터를 가져오는데 실패했습니다');
        }
        const data = await response.json();
        setUser(data);
        form.setFieldsValue(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError(error.message);
      }
    };

    fetchUser();
  }, [id, setError, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      if (!response.ok) {
        throw new Error('사용자 정보 업데이트에 실패했습니다');
      }
      message.success('사용자 정보가 성공적으로 업데이트되었습니다');
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
      message.error(error.message);
    }
  };

  const showDeleteConfirm = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('사용자 삭제에 실패했습니다');
      }
      message.success('사용자가 성공적으로 삭제되었습니다');
      setIsModalVisible(false);
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error(error.message);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (error) return <Alert message="에러" description={error} type="error" />;
  if (!user) return <Spin size="large" />;

  return (
    <>
      <StyledForm form={form} layout="vertical" initialValues={user}>
        <h2>사용자 정보</h2>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              name="name" 
              label={<Label>이름</Label>}
              rules={[{ required: true, message: '이름을 입력해주세요' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              name="isActive" 
              label={<Label>활성 상태</Label>}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item 
              name="email" 
              label={<Label>이메일</Label>}
              rules={[
                { required: true, message: '이메일을 입력해주세요' },
                { type: 'email', message: '올바른 이메일 형식이 아닙니다' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              name="isAdmin" 
              label={<Label>관리자 상태</Label>}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button type="primary" onClick={handleSave} style={{marginRight: 8}}>저장</Button>
            <Button danger onClick={showDeleteConfirm}>삭제</Button>
          </Col>
        </Row>
      </StyledForm>

      <Modal
        title={
          <span>
            <ExclamationCircleOutlined style={{ color: '#faad14', marginRight: 8 }} />
            사용자 삭제
          </span>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" danger onClick={handleOk}>
          예
        </Button>,
          <Button key="cancel" onClick={handleCancel}>
            아니오
          </Button>,
        ]}
      >
        <p>정말로 이 사용자를 삭제하시겠습니까?</p>
      </Modal>
    </>
  );
}

export default UserDetail;