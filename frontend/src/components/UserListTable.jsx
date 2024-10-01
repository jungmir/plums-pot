import { Table } from 'antd';

const UserListTable = () => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'IsActive', dataIndex: 'isActive', key: 'isActive' },
  ];

  const data = [
    { id: 1, name: 'Giacomo Guilizzoni', email: 'giacome@wire.com', isActive: 'True' },
    { id: 2, name: 'Marco Botton', email: 'marco@wire.com', isActive: 'False' },
    { id: 3, name: 'Mariah Maclachlan', email: 'mariah@wire.com', isActive: 'False' },
    { id: 4, name: 'Valerie Liberty', email: 'valerie@wire.com', isActive: 'True' },
  ];

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} />
  );
};

export default UserListTable;
