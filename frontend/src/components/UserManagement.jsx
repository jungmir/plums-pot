import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import { useUsers } from './useUsers';

function UserManagement() {
  const { users, error } = useUsers();
  const [isAdding, setIsAdding] = useState(false);

  if (error) {
    return <div>에러: {error}</div>;
  }

  const addUser = (newUser) => {
    // 여기에 사용자 추가 로직 구현
  };

  return (
    <div className="user-management">
      <h2>사용자 관리</h2>
      <button onClick={() => setIsAdding(true)}>사용자 추가</button>
      {isAdding && <UserForm onSubmit={addUser} onCancel={() => setIsAdding(false)} />}
      <UserList users={users} />
    </div>
  );
}

export default UserManagement;