import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag } from 'antd';

function UserList({ users }) {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '활성 상태',
      dataIndex: 'isActive',
      key: 'isActive',
      render: isActive => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? '활성' : '비활성'}
        </Tag>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={Array.isArray(users) ? users : []} 
      rowKey="id"
      onRow={(record) => ({
        onClick: () => navigate(`/${record.id}`),
      })}
    />
  );
}

export default UserList;
