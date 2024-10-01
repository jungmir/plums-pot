import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserList({ users }) {
  const navigate = useNavigate();

  const handleRowClick = (userId) => {
    navigate(`/${userId}`);
  };

  return (
    <table className="user-list">
      <thead>
        <tr>
          <th>ID</th>
          <th>이름</th>
          <th>이메일</th>
          <th>활성 상태</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id} onClick={() => handleRowClick(user.id)} style={{cursor: 'pointer'}}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.isActive ? '활성' : '비활성'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
