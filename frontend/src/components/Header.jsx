import React from 'react';
import { Layout, Typography, Avatar } from 'antd';
import styled from 'styled-components';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const StyledHeader = styled(AntHeader)`
  background: ${props => props.theme.headerColor};
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.white};
`;

function Header() {
  return (
    <StyledHeader>
      <Title level={3} style={{ color: 'white', margin: 0 }}>회원 조회</Title>
      <AdminInfo>
        Hello, admin <Avatar style={{ marginLeft: 8 }}>A</Avatar>
      </AdminInfo>
    </StyledHeader>
  );
}

export default Header;
