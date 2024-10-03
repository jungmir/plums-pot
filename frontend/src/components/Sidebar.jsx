import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AppstoreOutlined, ShopOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
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
  cursor: pointer;
`;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <UserOutlined />,
      label: '회원 조회',
    },
    {
      key: '/patch',
      icon: <AppstoreOutlined />,
      label: '패치 데이터',
    },
    {
      key: '/products',
      icon: <ShopOutlined />,
      label: '제품 등록',
    },
  ];

  const handleMenuClick = (item) => {
    navigate(item.key);
    window.location.reload(); // 강제 새로고침
  };

  return (
    <StyledSider width={200}>
      <Logo onClick={() => navigate('/')}>PLUMS</Logo>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ background: 'transparent' }}
      />
    </StyledSider>
  );
}

export default Sidebar;