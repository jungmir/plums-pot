import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { usersAtom, userErrorAtom } from '../store/atoms';
import UserList from './UserList';
import SearchBar from './SearchBar';
import AddUserModal from './AddUserModal';
import { useLocation } from 'react-router-dom';
import { Typography, Alert, Card, Space, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const { Title } = Typography;

function UserManagement() {
  const [users, setUsers] = useAtom(usersAtom);
  const [error, setError] = useAtom(userErrorAtom);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const location = useLocation();
  const [searchType, setSearchType] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

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
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [location.pathname]);

  const filteredUsers = Array.isArray(users) ? users.filter(user => {
    if (searchTerm === '') return true;
    if (searchType === 'id') {
      return user.id.toString().includes(searchTerm);
    } else {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }) : [];

  if (error) return <Alert message="에러" description={error} type="error" />;

  return (
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2}>사용자 관리</Title>
          <Button 
            type="primary" 
            icon={<UserAddOutlined />} 
            onClick={() => setIsAddUserModalOpen(true)}
          >
            사용자 추가
          </Button>
        </div>
        <SearchBar
          searchType={searchType}
          setSearchType={setSearchType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <UserList users={filteredUsers} />
        <AddUserModal 
          isOpen={isAddUserModalOpen} 
          onClose={() => setIsAddUserModalOpen(false)}
          onAddUser={fetchUsers}
        />
      </Space>
    </Card>
  );
}

export default UserManagement;