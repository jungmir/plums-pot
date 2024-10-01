import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { usersAtom, userErrorAtom } from '../store/atoms';
import UserList from './UserList';
import { useLocation } from 'react-router-dom';
import { Typography, Spin, Alert, Card } from 'antd';

const { Title } = Typography;

function UserManagement() {
  const [users, setUsers] = useAtom(usersAtom);
  const [error, setError] = useAtom(userErrorAtom);
  const location = useLocation();

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('사용자 목록을 가져오는데 실패했습니다');
      }
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    } finally {
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [location.pathname]);

  if (error) return <Alert message="에러" description={error} type="error" />;

  return (
    <Card>
      <Title level={2}>사용자 관리</Title>
      <UserList users={users} />
    </Card>
  );
}

export default UserManagement;