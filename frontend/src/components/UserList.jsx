import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Tag } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const SortableHeader = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function UserList({ users }) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'ascend' ? 'descend' : 'ascend');
    } else {
      setSortField(field);
      setSortOrder('ascend');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortField === null) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) return sortOrder === 'ascend' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'ascend' ? 1 : -1;
    return 0;
  });

  const columns = [
    {
      title: (
        <SortableHeader onClick={() => handleSort('id')}>
          <span>ID</span>
          {sortField === 'id' && (sortOrder === 'ascend' ? <UpOutlined /> : <DownOutlined />)}
        </SortableHeader>
      ),
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      sortOrder: sortField === 'id' && sortOrder,
    },
    {
      title: (
        <SortableHeader onClick={() => handleSort('name')}>
          <span>이름</span>
          {sortField === 'name' && (sortOrder === 'ascend' ? <UpOutlined /> : <DownOutlined />)}
        </SortableHeader>
      ),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sortField === 'name' && sortOrder,
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
      dataSource={sortedUsers} 
      rowKey="id"
      onRow={(record) => ({
        onClick: () => navigate(`/${record.id}`),
      })}
    />
  );
}

export default UserList;
