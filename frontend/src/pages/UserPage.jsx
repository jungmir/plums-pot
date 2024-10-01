import { Table, Input, Select, Card, Flex, Typography, Button, Row, Col } from 'antd';

const UserPage = () => {
  const { Option } = Select;

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'IsActive', dataIndex: 'isActive', key: 'isActive' },
  ];

  const data = [
    { id: 1, name: 'Giacomo Guilizzoni', email: 'giacomo@wire.com', isActive: 'True' },
    { id: 2, name: 'Marco Botton', email: 'marco@wire.com', isActive: 'False' },
    { id: 3, name: 'Mariah Maclachlan', email: 'mariah@wire.com', isActive: 'False' },
    { id: 4, name: 'Valerie Liberty', email: 'valerie@wire.com', isActive: 'True' },
  ];

  return (
    <div style={{ flex: 1}}>
    <Card>
        <Row justify="space-between">
            <Col>
                <Typography.Title level={5} style={{marginBottom: '30px'}}>
                    USER LIST
                </Typography.Title>
            </Col>
            <Col>
                <Button>Add</Button>
            </Col>
        </Row>
        <Flex>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                <Select defaultValue="Name" style={{ width: 120 }}>
                    <Option value="Name">Name</Option>
                    <Option value="Email">Email</Option>
                </Select>
            <Input.Search style={{ width: 200, marginLeft: '16px' }} placeholder="Search" />
            </div>
        </Flex>
        <Flex>
            <Table
                className='custom-table'
                columns={columns}
                dataSource={data}
                pagination={{ position: ['bottomCenter'] }}
                style={{ width: '100%' }}
            />
        </Flex>
    </Card>
    
    </div>
  );
};

export default UserPage;
