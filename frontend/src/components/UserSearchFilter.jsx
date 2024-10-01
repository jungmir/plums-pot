import { Input, Select } from 'antd';

const { Option } = Select;

const UserSearchFilter = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      {/* 필터 */}
      <Select defaultValue="Name" style={{ width: 120 }}>
        <Option value="name">Name</Option>
        <Option value="email">Email</Option>
      </Select>
      
      {/* 검색 */}
      <Input.Search placeholder="Search" style={{ width: 200 }} />
    </div>
  );
};

export default UserSearchFilter;
