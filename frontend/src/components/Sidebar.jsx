import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, HomeOutlined, AppstoreOutlined, ShopOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  background: ${props => props.theme.sidebarColor};
`;

const Logo = styled.div`
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
`;

function Sidebar() {
  const location = useLocation();

  return (
    <StyledSider width={200}>
      <Link to="/">
        <Logo>PLUMS</Logo>
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        selectedKeys={[location.pathname]}
        style={{ background: 'transparent' }}
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/users" icon={<UserOutlined />}>
          <Link to="/">회원 조회</Link>
        </Menu.Item>
        <Menu.Item key="/patch" icon={<AppstoreOutlined />}>
          패치 데이터
        </Menu.Item>
        <Menu.Item key="/products" icon={<ShopOutlined />}>
          제품 등록
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
}

export default Sidebar;