import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { usersAtom, userErrorAtom } from '../store/atoms';
import { Input, Checkbox, Button, Spin, Alert } from 'antd';

function UserDetail() {
  // 컴포넌트 정의
  const [user, setUser] = useAtom(usersAtom);
  const [error, setError] = useAtom(userErrorAtom);
  const { id } = useParams();
  const navigate = useNavigate();

  // 사용자 데이터 가져오기
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
        setError(error.message);
      } finally {
      }
    };

    fetchUser();
  }, [id, setUser, setError]);

  // 사용자 정보 업데이트
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        throw new Error('사용자 정보 업데이트에 실패했습니다');
      }
      console.log('사용자 정보 업데이트 성공');
      navigate('/');
    } catch (error) {
      setError(error.message);
    } 
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('사용자 삭제에 실패했습니다');
        }
        console.log('사용자 삭제 성공');
        navigate('/');
      } catch (error) {
        setError(error.message);
      } finally {
      }
    }
  };

  if (error) return <Alert message="에러" description={error} type="error" />;
  if (!user) return <Alert message="사용자를 찾을 수 없습니다." type="warning" />;

  return (
    <div className="user-detail">
      <h2>사용자 정보</h2>
      <div>
        <label>이름: </label>
        <Input
          value={user.name}
          onChange={e => setUser({...user, name: e.target.value})}
        />
      </div>
      <div>
        <label>이메일: </label>
        <Input
          type="email"
          value={user.email}
          onChange={e => setUser({...user, email: e.target.value})}
        />
      </div>
      <div>
        <label>활성 상태: </label>
        <Checkbox
          checked={user.isActive}
          onChange={e => setUser({...user, isActive: e.target.checked})}
        />
      </div>
      <div>
        <label>관리자 상태: </label>
        <Checkbox
          checked={user.isAdmin}
          onChange={e => setUser({...user, isActive: e.target.checked})}
        />
      </div>
      <Button type="primary" onClick={handleSave}>저장</Button>
      <Button danger onClick={handleDelete}>삭제</Button>
    </div>
  );
}

export default UserDetail;