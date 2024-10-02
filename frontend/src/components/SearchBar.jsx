import React from 'react';
import { Select, Input, Space } from 'antd';

const { Option } = Select;

function SearchBar({ searchType, setSearchType, searchTerm, setSearchTerm }) {
  return (
    <Space>
      <Select
        defaultValue={searchType}
        style={{ width: 120 }}
        onChange={value => setSearchType(value)}
      >
        <Option value="id">ID</Option>
        <Option value="name">이름</Option>
      </Select>
      <Input
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ width: 200 }}
      />
    </Space>
  );
}

export default SearchBar;