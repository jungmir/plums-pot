import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Select, Card, Flex, Typography, Button, Row, Col, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const UserListPage = () => {
  const navigate = useNavigate();
  const { Option } = Select;

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Email', dataIndex: 'email', key: 'email', sorter: (a, b) => a.email.localeCompare(b.email) },
    { title: 'IsActive', dataIndex: 'isActive', key: 'isActive', sorter: (a, b) => a.isActive - b.isActive, render: (text) => text ? 'Active' : 'Inactive' },
  ];

  const [searchOption, setSearchOption] = useState('Name');
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSelectChange = (value) => {
    setSearchOption(value);
    setSearchValue('');
  }

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSearch = () => {
    const filtered = filteredData.filter((item) => {
        if (searchOption === 'Name') {
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
        } else if (searchOption === 'Email') {
          return item.email.toLowerCase().includes(searchValue.toLowerCase());
        }
        return false;
    });
    setFilteredData(filtered);
  }

  const handleRowClick = (record) => {
    navigate(`/users/${record.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({
          method: "get",
          url: "/users/all"
        });
        setFilteredData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Spin />;
  
  return (
    <div style={{ flex: 1 }}>
    <Card>
        {/* 화면 상단 */}
        <Row justify="space-between">
            <Col>
                <Typography.Title 
                    level={5} 
                    style={{marginBottom: '30px'}}
                >
                    USER LIST
                </Typography.Title>
            </Col>
            <Col>
                <Button 
                    onClick={() => navigate('/users/add')}
                >
                    Add
                </Button>
            </Col>
        </Row>
        {/* 검색 기능 */}
        <Flex>
            <div 
                style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}
            >
                <Select 
                    defaultValue="Name" 
                    className="custom-select" 
                    onChange={handleSelectChange} 
                    style={{ width: 120 }}
                >
                    <Option value="Name">Name</Option>
                    <Option value="Email">Email</Option>
                </Select>
            <Input.Search 
                onChange={handleInputChange} 
                onSearch={handleSearch} 
                style={{ width: 200, marginLeft: '16px' }} 
                placeholder="Search" 
            />
            </div>
        </Flex>
        {/* 유저 목록 테이블 */}
        <Flex>
            <Table
                className='custom-table'
                columns={columns}
                dataSource={filteredData.map((item) => ({ ...item, key: item.id })).reverse()}
                pagination={{ position: ['bottomCenter'], pageSize: 8, }}
                style={{ width: '100%' }}
                onRow={(record) => ({
                    onClick: () => handleRowClick(record),
                    style: { cursor: 'pointer' },
                })}
            />
        </Flex>
    </Card>
    
    </div>
  );
};

export default UserListPage;
