import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserDetail() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`);
        if (!response.ok) {
          throw new Error('사용자 데이터를 가져오는데 실패했습니다');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        // 에러 상태를 설정하거나 사용자에게 알림을 표시할 수 있습니다.
      }
    };

    fetchUser();
  }, [id]);

  const handleSave = () => {
    // API를 통해 사용자 정보 업데이트
    fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).then(() => navigate('/users'));
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      fetch(`/api/users/${id}`, { method: 'DELETE' })
        .then(() => navigate('/users'));
    }
  };

  if (!user) return <div>로딩 중...</div>;

  return (
    <div className="user-detail">
      <h2>사용자 정보</h2>
      <div>
        <label>이름: </label>
        <input
          type="text"
          value={user.name}
          onChange={e => setUser({...user, name: e.target.value})}
        />
      </div>
      <div>
        <label>이메일: </label>
        <input
          type="email"
          value={user.email}
          onChange={e => setUser({...user, email: e.target.value})}
        />
      </div>
      <div>
        <label>활성 상태: </label>
        <input
          type="checkbox"
          checked={user.isActive}
          onChange={e => setUser({...user, isActive: e.target.checked})}
        />
        {user.isActive && <span style={{color: 'green'}}>활성</span>}
      </div>
      <div>
        <label>관리자 여부: </label>
        <input
          type="checkbox"
          checked={user.isAdmin}
          onChange={e => setUser({...user, isAdmin: e.target.checked})}
        />
        {user.isAdmin && <span style={{color: 'blue'}}>관리자</span>}
      </div>
      <button onClick={handleSave}>저장</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default UserDetail;