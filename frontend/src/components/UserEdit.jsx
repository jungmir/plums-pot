import { useEffect, useState } from 'react';
import { Form, Input, Button, Switch, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { usersAtom, selectedUserAtom } from '../state/state';

const UserEdit = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [users, setUsers] = useAtom(usersAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //사용자 데이터를 가져와 필드에 채움
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const user = users.find(user => user.id === Number(id));
        if (!user) throw new Error('User not found');
        setSelectedUser(user);
        form.setFieldsValue(user);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, users, setSelectedUser, form]);

  //폼 제출 시 실행
  const onFinish = async (values) => {
    try {
      const updatedUser = { ...selectedUser, ...values };
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      if (!res.ok) throw new Error('Failed to update user');

      //성공적으로 업데이트 된 사용자 정보를 Atom에 반영
      setUsers(users.map(user => (user.id === Number(id) ? updatedUser : user)));
      message.success('User updated successfully');
      navigate('/');
    } catch {
      message.error('Failed to update user');
    }
  };

  //로딩 중일 때 스피너 표시
  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

  if (!selectedUser) return <p>User not found</p>;

  //필드 입력 및 유효성 검사
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: 'Please enter the name' },
          { min: 2, message: 'Name must be at least 2 characters long' },
          { max: 50, message: 'Name cannot exceed 50 characters' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter the email' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="isActive" label="Is Active" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Button type="primary" htmlType="submit">Save</Button>
    </Form>
  );
};

export default UserEdit;