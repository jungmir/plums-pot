import { useEffect, useState } from 'react';
import { Table, Input, Button, Row, Col, message, Modal, Typography, Select } from 'antd';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { usersAtom } from '../state/state';

const { confirm } = Modal;
const { Title, Text } = Typography;
const { Option } = Select;

const UserList = () => {
  const [users, setUsers] = useAtom(usersAtom);
  const [searchValue, setSearchValue] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [sortedInfo, setSortedInfo] = useState({ order: null, columnKey: null });

  //사용자 목록 가져옴
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [setUsers]);

  //테이블의 정렬 정보 변경 시 호출
  const handleChange = (pagination, filters, sorter) => setSortedInfo(sorter || {});
  const handleSearch = (value) => setSearchValue(value);
  const handleFieldChange = (value) => setSearchField(value);

  //검색 필터에 맞게 사용자 목록 필터링
  const filteredUsers = users.filter((user) => {
    if (searchField === 'name') {
      return user.name.toLowerCase().includes(searchValue.toLowerCase());
    } else if (searchField === 'email') {
      return user.email.toLowerCase().includes(searchValue.toLowerCase());
    }
    return true;
  });

  //사용자 삭제 처리
  const handleDelete = (id) => {
    confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone',
      onOk: async () => {
        try {
          const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
          if (!response.ok) throw new Error(`Failed to delete user with id: ${id}`);
          message.success('User deleted successfully');
          setUsers(users.filter(user => user.id !== id));
        } catch (error) {
          message.error(`Failed to delete user: ${error.message}`);
        }
      },
      onCancel() {
        message.info('Delete action canceled');
      },
    });
  };

  //테이블 칼럼 정의
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
    },
    {
      title: 'Is Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text, record) => (record.isActive ? 'True' : 'False'),
      sorter: (a, b) => a.isActive - b.isActive,
      sortOrder: sortedInfo.columnKey === 'isActive' && sortedInfo.order,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Link to={`/edit/${record.id}`}>
            <Button type="primary" style={{ marginRight: 10 }}>Edit</Button>
          </Link>
          <Button type="danger" onClick={() => handleDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Title level={2}>User</Title>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <Col>
          <Row gutter={16}>
            <Col>
              <Select defaultValue="name" onChange={handleFieldChange}>
                <Option value="name">Name</Option>
                <Option value="email">Email</Option>
              </Select>
            </Col>
            <Col>
              <Input.Search
                placeholder={`Search by ${searchField}`}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
              />
            </Col>
          </Row>
        </Col>
        <Col>
          <Link to="/add">
            <Button type="primary">Add User</Button>
          </Link>
        </Col>
      </Row>
      <Row style={{ marginBottom: 20 }}>
        <Col>
          <Text>Total users: {filteredUsers.length}</Text>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        onChange={handleChange}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default UserList;