import { useState, useEffect } from 'react';

// useUsers 커스텀 훅 생성 (사용자 데이터 관리 로직을 재사용 가능한 훅으로 생성)
export function useUsers() {

    // api에서 가져온 사용자 데이터를 저장후 관리
  // useState 훅을 사용하여 users 상태와 setUsers 함수를 생성합니다.
  // useState는 상태를 관리하는 훅
  const [users, setUsers] = useState([]);

  // api 요청중 발생한 오류를 저장해 사용자에게 반환
  const [error, setError] = useState(null);

  // useEffect는 컴포넌트의 생명주기와 관련된 부수 효과를 처리하는 데 사용
  useEffect(() => {
    fetch('/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => {
        setError(error.message);
      });
  }, []);

  // 각각의 상태를 객체로 반환
  return { users, error };
}