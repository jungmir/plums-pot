import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserList({ users }) {
  const navigate = useNavigate();

  const handleRowClick = (userId) => {
    navigate(`/${userId}`);
  };

  // users가 배열인지 확인
  if (!Array.isArray(users)) {
    console.error('Users is not an array:', users);
    return <div>사용자 목록을 불러오는 중 오류가 발생했습니다.</div>;
  }

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
