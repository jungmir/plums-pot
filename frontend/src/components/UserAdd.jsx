import { Form, Input, Button, Checkbox, message } from 'antd';
import { useAtom } from 'jotai';
import { usersAtom } from '../state/state';

const UserAdd = () => {
  const [users, setUsers] = useAtom(usersAtom);

  //ID 유효성 검사
  const idRules = [
    { required: true, message: 'Please enter the ID' },
    {
      pattern: /^[a-zA-Z0-9!@#$%^&*]{4,20}$/,
      message: 'ID must be 4-20 characters long and can contain letters, numbers, and special characters',
    },
  ];

  //비밀번호 유효성 검사
  const passwordRules = [
    { required: true, message: 'Please enter the new password' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      message: 'Password must be 8-20 characters long and include uppercase, lowercase, numbers, and special characters',
    },
  ];

  //이메일 유효성 검사
  const emailRules = [
    { required: true, message: 'Please enter the email' },
    { type: 'email', message: 'Please enter a valid email' },
  ];

  //이름 유효성 검사
  const nameRules = [
    { required: true, message: 'Please enter the name' },
  ];

  const onFinish = async (values) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) throw new Error(`Failed to add user: ${response.status}`);
      
      const newUser = await response.json();
      setUsers([...users, newUser]);
      message.success('User added successfully');
    } catch {
      message.error('Failed to add user');
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Form.Item name="name" label="Name" rules={nameRules}><Input /></Form.Item>
      <Form.Item name="id" label="ID" rules={idRules}><Input /></Form.Item>
      <Form.Item name="email" label="Email" rules={emailRules}><Input /></Form.Item>
      <Form.Item name="password" label="New Password" rules={passwordRules}><Input.Password /></Form.Item>
      <Form.Item name="isActive" label="Is Active" valuePropName="checked"><Checkbox /></Form.Item>
      <Form.Item name="isAdmin" label="Is Admin" valuePropName="checked"><Checkbox /></Form.Item>
      <Button type="primary" htmlType="submit">Add User</Button>
    </Form>
  );
};

export default UserAdd;